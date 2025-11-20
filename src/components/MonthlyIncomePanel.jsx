import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function MonthlyIncomePanel({
  monthlyIncome,
  setMonthlyIncome,
  userId,
}) {
  const [value, setValue] = useState("");

  // Always reflect the latest saved value
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
    <div className="card">
      <h3 className='text-2xl font-bold text-green-400'>Monthly Income</h3>

      <div className="flex gap-2">
        <input
        type="number"
        placeholder="Enter income (₦)"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-90"
      />

       <button type="button" onClick={saveIncome}>
        Save
      </button>

      </div>
      <p className='text-3xl font-bold text-green-400' style={{ marginTop: "8px" }}>
        Current monthly income:
        <strong>₦{Number(monthlyIncome || 0).toFixed(2)}</strong>
      </p>
    </div>
  );
}
