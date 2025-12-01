// src/screens/AddTransactionPage.jsx
import React from "react";
import TransactionForm from "../components/TransactionForm";

export default function AddTransactionPage({ editTransaction, clearEdit }) {
  return (
    <div className="add-page-wrapper">

      {/* HERO BANNER */}
      <div className="add-hero">
        <h1>Add Transaction</h1>
        <p>
          Capture income or expenses with labels, notes and categories —
          everything updates your dashboard instantly.
        </p>
      </div>

      {/* FULLSCREEN FORM SECTION */}
      <div className="add-form-section">
        <div className="add-form-card">
          <TransactionForm
            editTransaction={editTransaction}
            clearEdit={clearEdit}
          />
        </div>
      </div>

    </div>
  );
}
