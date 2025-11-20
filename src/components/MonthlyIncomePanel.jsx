import React, { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function MonthlyIncomePanel({
  income: monthlyIncome,
  setMonthlyIncome,
  userId,
  className = "",
}) {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(monthlyIncome || "");
  }, [monthlyIncome]);

  async function saveIncome() {
    if (!value) {
      alert("Please enter an income amount.");
      return;
    }
    if (!userId) {
      alert("User not logged in.");
      return;
    }

    try {
      // One stable doc per user: monthlyIncome/{uid}
      const ref = doc(db, "monthlyIncome", userId);

      await setDoc(
        ref,
        {
          userId,                 // must be present in the doc
          amount: Number(value),
          updatedAt: new Date(),
        },
        { merge: true }
      );

      setMonthlyIncome(Number(value));
      alert("Monthly income saved!");
    } catch (error) {
      console.error("Error saving income:", error.code, error.message);
      alert("Failed to save income: " + error.code);
    }
  }

  return (
    <div className={`insight-card ${className}`.trim()}>
      <div className="insight-card__body">
        <div className="insight-label">Monthly Income</div>
        <h3 className="insight-amount">
          ₦{Number(monthlyIncome || 0).toFixed(2)}
        </h3>

        <div className="insight-actions">
          <input
            type="number"
            placeholder="Enter income (₦)"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <button type="button" onClick={saveIncome}>
            Save
          </button>
        </div>

        <p className="insight-help">
          Keep this updated to compare against your actual spend.
        </p>
      </div>
    </div>
  );
}
