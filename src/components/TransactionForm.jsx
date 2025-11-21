// React + Firebase imports
import React, { useEffect, useState } from 'react'
import { 
  collection, 
  addDoc, 
  doc, 
  updateDoc, 
  serverTimestamp 
} from 'firebase/firestore'
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'

// Default state for a new transaction
const defaultState = {
  label: "",
  type: 'expense',
  amount: '',
  category: '',
  date: '',
  note: '',
}

// Component to add or edit a transaction
export default function TransactionForm({ editTransaction, clearEdit }) {
  // Local form state
  const [form, setForm] = useState(defaultState)
  
  // Current logged-in user from Auth context
  const { currentUser } = useAuth()

  // Populate form if editing an existing transaction
  useEffect(() => {
    if (editTransaction) {
      const formattedDate =
        editTransaction.date?.toDate
          ? editTransaction.date.toDate().toISOString().split("T")[0]
          : editTransaction.date || ""

      setForm({
        label: editTransaction.label || "",
        type: editTransaction.type,
        amount: editTransaction.amount,
        category: editTransaction.category,
        date: formattedDate,
        note: editTransaction.note || '',
      })
    } else {
      // Reset form to default for new transaction
      setForm(defaultState)
    }
  }, [editTransaction])

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  // Handle form submission (add or update transaction)
  async function handleSubmit(e) {
    e.preventDefault()
    
    // Ensure user is logged in
    if (!currentUser) return alert("User not logged in")

    // Validate required fields
    if (!form.label || !form.amount || !form.category || !form.date) {
      return alert("Fill all required fields")
    }

    try {
      const dateValue = new Date(form.date)

      if (editTransaction) {
        // UPDATE existing transaction
        const ref = doc(db, "transactions", editTransaction.id)

        await updateDoc(ref, {
          label: form.label,
          type: form.type,
          amount: Number(form.amount),
          category: form.category,
          date: dateValue,
          note: form.note,
          userId: currentUser.uid,
          updatedAt: serverTimestamp(),
        })

        // Clear edit mode
        clearEdit()

      } else {
        // ADD new transaction
        await addDoc(collection(db, "transactions"), {
          label: form.label,
          type: form.type,
          amount: Number(form.amount),
          category: form.category,
          date: dateValue,
          note: form.note,
          userId: currentUser.uid,
          createdAt: serverTimestamp(),
        })
      }

      // Reset form after saving
      setForm(defaultState)

    } catch (error) {
      // Log errors for debugging
      console.error("🔥 Transaction error:", error)
      alert("Failed to save transaction.")
    }
  }

  return (
     <div className="card">
      {/* Heading changes based on Add vs Edit */}
      <h3>{editTransaction ? 'Edit Transaction' : 'Add Transaction'}</h3>

      {/* Transaction form */}
      <form className="transaction-form" onSubmit={handleSubmit}>

        {/* Label input */}
        <label>
          Label (Name)
          <input
            type="text"
            name="label"
            value={form.label}
            onChange={handleChange}
            required
          />
        </label>

        {/* Type select */}
        <label>
          Type
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </label>

        {/* Amount input */}
        <label>
          Amount (₦)
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            required
            min="0"
          />
        </label>

        {/* Category input */}
        <label>
          Category
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          />
        </label>

        {/* Date input */}
        <label>
          Date
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </label>

        {/* Note input */}
        <label>
          Note
          <input
            type="text"
            name="note"
            value={form.note}
            onChange={handleChange}
            placeholder="Optional"
          />
        </label>

        {/* Form actions */}
        <div className="form-actions">
          <button type="submit">
            {editTransaction ? 'Update' : 'Add'}
          </button>

          {/* Cancel button shown only in edit mode */}
          {editTransaction && (
            <button type="button" onClick={clearEdit}>
              Cancel
            </button>
          )}
        </div>

      </form>
    </div>
  )
}
