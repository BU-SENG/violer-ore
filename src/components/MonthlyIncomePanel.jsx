import React, { useState } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export default function MonthlyIncomePanel({ income, userId }) {
  const [value, setValue] = useState("");
  const [saving, setSaving] = useState(false);

  async function saveIncome() {
    if (!value || !userId) return;

    try {
      setSaving(true);

      const docRef = doc(db, "monthlyIncome", userId);

      await setDoc(docRef, {
        userId: userId,
        amount: Number(value),
        updatedAt: serverTimestamp()
      });

      setValue("");
      setSaving(false);

    } catch (error) {
      console.error("❌ Monthly income save error:", error);
      alert("Failed to save monthly income. Check your permissions.");
      setSaving(false);
    }
  }

  return (
    <div className="card">
      <h3>Monthly Income</h3>

      <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
        <input
          type="number"
          placeholder="Enter income (₦)"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <button 
          onClick={saveIncome} 
          disabled={saving}
          style={{ background: "#21c67a", color: "#fff", padding: "8px 16px", borderRadius: "6px" }}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>

      <p style={{ marginTop: "12px", color: "#21c67a", fontWeight: "bold" }}>
        Current monthly income: ₦{income.toLocaleString()}
      </p>
    </div>
  );
}
