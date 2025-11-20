import React, { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

export default function BudgetPanel({ budget, setBudget, className = "" }) {
  const [input, setInput] = useState(budget || 0)
  const [saving, setSaving] = useState(false)
  const { currentUser } = useAuth()

  useEffect(() => {
    setInput(budget || 0)
  }, [budget])

   async function handleSave(e) {
    e.preventDefault()
    if (!currentUser) return alert("User not logged in")

    setSaving(true)

    try {
      const userId = currentUser.uid

      // SAVE BUDGET TO A DOCUMENT NAMED AFTER USER ID
      await setDoc(
        doc(db, "budgets", userId),
        {
          userId,
          amount: Number(input)
        },
        { merge: true }
      )

      // UPDATE UI IMMEDIATELY
      setBudget(Number(input))

    } catch (error) {
      console.error("Error saving budget:", error)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className={`insight-card ${className}`.trim()}>
      <div className="insight-card__body">
        <div className="insight-label">Monthly Budget</div>
        <h3 className="insight-amount">₦{Number(budget || 0).toFixed(2)}</h3>

        <form className="budget-form" onSubmit={handleSave}>
          <input
            type="number"
            min="0"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Set budget (₦)"
          />

          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}
