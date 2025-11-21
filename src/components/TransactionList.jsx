import React from 'react'

// Component to display a list of transactions
export default function TransactionList({ transactions, onEdit, onDelete }) {

  // Format Firestore or string dates to YYYY-MM-DD
  function formatDate(date) {
    if (!date) return ""
    if (date?.toDate) return date.toDate().toISOString().split("T")[0]
    return date
  }

  return (
    <div className="card">
      {/* Heading */}
      <h3>Transactions</h3>

      {/* Show message if there are no transactions */}
      {transactions.length === 0 && <p>No transactions yet.</p>}

      {/* Transactions table */}
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
            <th>Label</th>
            <th>Amount (₦)</th>
            <th>Note</th>
            <th /> {/* Actions column */}
          </tr>
        </thead>

        <tbody>
          {transactions.map(t => (
            <tr key={t.id}>

              {/* Display formatted date */}
              <td>{formatDate(t.date)}</td>

              {/* Display type with CSS class for styling */}
              <td className={t.type === 'income' ? 'income' : 'expense'}>
                {t.type}
              </td>

              {/* Transaction category */}
              <td>{t.category}</td>

              {/* Label / description of transaction */}
              <td>{t.label}</td>

              {/* Amount formatted to 2 decimals */}
              <td>{Number(t.amount).toFixed(2)}</td>

              {/* Optional note */}
              <td>{t.note}</td>

              {/* Action buttons for editing or deleting */}
              <td>
                <button onClick={() => onEdit(t)}>Edit</button>
                <button onClick={() => onDelete(t.id)}>Delete</button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
