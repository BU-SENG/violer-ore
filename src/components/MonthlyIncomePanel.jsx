// React + Firebase imports
import React, { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

// Component to display and manage user's monthly income
export default function MonthlyIncomePanel({
  income: monthlyIncome,   // incoming prop for current income
  setMonthlyIncome,        // function to update parent state
  userId,                  // current user's ID
  className = "",          // optional additional CSS class
}) {
  // Local input state for the income field
  const [value, setValue] = useState("");

  // Sync local input with parent income prop whenever it changes
  useEffect(() => {
    setValue(monthlyIncome || "");
  }, [monthlyIncome]);

  // Save the income to Firebase under monthlyIncome/{userId}
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
      // Reference to user's income document
      const ref = doc(db, "monthlyIncome", userId);

      // Save or merge the income data
      await setDoc(
        ref,
        {
          userId,                 // must be present in the document
          amount: Number(value),  // store as a number
          updatedAt: new Date(),  // timestamp of update
        },
        { merge: true }           // merge so we don't overwrite other fields
      );

      // Update the parent state immediately
      setMonthlyIncome(Number(value));

      // Notify user of success
      alert("Monthly income saved!");
    } catch (error) {
      // Log errors to console for debugging
      console.error("Error saving income:", error.code, error.message);
      alert("Failed to save income: " + error.code);
    }
  }

  return (
    // Main card container for income UI
    <div className={`insight-card ${className}`.trim()}>
      <div className="insight-card__body">
        {/* Label for income */}
        <div className="insight-label">Monthly Income</div>

        {/* Display current income */}
        <h3 className="insight-amount">
          ₦{Number(monthlyIncome || 0).toFixed(2)}
        </h3>

        {/* Input and Save button */}
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

        {/* Help text for user */}
        <p className="insight-help">
          Keep this updated to compare against your actual spend.
        </p>
      </div>
    </div>
  );
}

