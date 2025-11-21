// Import React and Firebase dependencies
import React, { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

// BudgetPanel component displays and manages user's monthly budget
export default function BudgetPanel({ budget, setBudget, className = "" }) {
  // Local state to hold the current input value
  const [input, setInput] = useState(budget || 0);
  
  // State to indicate whether budget is being saved
  const [saving, setSaving] = useState(false);
  
  // Get the currently logged-in user from Auth context
  const { currentUser } = useAuth();

  // Sync local input with parent budget whenever it changes
  useEffect(() => {
    setInput(budget || 0);
  }, [budget]);

  // Function to save the budget to Firebase
  async function handleSave(e) {
    e.preventDefault();

    // Ensure user is logged in before saving
    if (!currentUser) return alert("User not logged in");

    setSaving(true);

    try {
      const userId = currentUser.uid;

      // Save the budget under the user's document in Firestore
      await setDoc(
        doc(db, "budgets", userId),
        {
          userId,
          amount: Number(input)
        },
        { merge: true } // merge ensures we don't overwrite other fields
      );

      // Update the parent state immediately
      setBudget(Number(input));

    } catch (error) {
      // Log errors to console for debugging
      console.error("Error saving budget:", error);
    } finally {
      setSaving(false); // Reset saving state
    }
  }

  return (
    // Main card container for budget UI
    <div className={`insight-card ${className}`.trim()}>
      <div className="insight-card__body">
        {/* Label for budget */}
        <div className="insight-label">Monthly Budget</div>
        
        {/* Display current budget */}
        <h3 className="insight-amount">₦{Number(budget || 0).toFixed(2)}</h3>

        {/* Form to input and save new budget */}
        <form className="budget-form" onSubmit={handleSave}>
          <input
            type="number"
            min="0"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Set budget (₦)"
          />

          {/* Save button; disabled while saving */}
          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}
