import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  doc,
  deleteDoc
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import BudgetPanel from "./BudgetPanel";
import Charts from "./Charts";
import ExportButtons from "./ExportButtons";
import MonthlyIncomePanel from "./MonthlyIncomePanel";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(0);
  const [editTransaction, setEditTransaction] = useState(null);
  const [monthlyIncome, setMonthlyIncome] = useState(0);

  /* ----------------------------------------------------------
      📌 CHART REFS FOR PDF EXPORT
  ---------------------------------------------------------- */
  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);

  /* ----------------------------------------------------------
      🔥 REAL-TIME TRANSACTIONS LISTENER
  ---------------------------------------------------------- */
  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "transactions"),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    );

     const unsubscribe = onSnapshot(q, (snapshot) => {
    const docs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTransactions(docs);
  });

  return unsubscribe;
}, [currentUser]);


  /* ----------------------------------------------------------
      🔥 REAL-TIME BUDGET LISTENER
  ---------------------------------------------------------- */
  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "budgets"),
      where("userId", "==", currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setBudget(snapshot.docs[0].data().amount || 0);
      } else {
        setBudget(0);
      }
    });

    return unsubscribe;
  }, [currentUser]);

  /* ----------------------------------------------------------
      🔥 REAL-TIME MONTHLY INCOME LISTENER
  ---------------------------------------------------------- */

  useEffect(() => {
    if (!currentUser) return;

    const ref = doc(db, "monthlyIncome", currentUser.uid);

    const unsubscribe = onSnapshot(ref, (snapshot) => {
      if (snapshot.exists()) {
        setMonthlyIncome(snapshot.data().amount || 0);
      } else {
        setMonthlyIncome(0);
      }
    });

    return unsubscribe;
  }, [currentUser]);



   async function handleDelete(id) {
    try {
      await deleteDoc(doc(db, "transactions", id));
    } catch (error) {
      console.error("🔥 Delete error:", error);
      alert("Failed to delete transaction.");
    }
  }
  const totals = useMemo(() => {
    let income = 0;
    let expense = 0;
    transactions.forEach((t) => {
      if (t.type === "income") income += Number(t.amount);
      else expense += Number(t.amount);
    });

    return {
      income,
      expense,
      balance: income - expense,
    };
  }, [transactions]);

  const overBudget = useMemo(() => {
    if (!budget) return false;
    return totals.expense > budget;
  }, [budget, totals.expense]);

  /* ----------------------------------------------------------
      UI
  ---------------------------------------------------------- */
  return (
    <div className="dashboard">

      {/* SUMMARY CARDS */}
      <section className="flex flex-col gap-4 mb-2">

 <div className="grid grid-cols-3 gap-10 mb-2">
   <div className="summary-box">
    <h3>Total Income</h3>
    <p>₦{totals.income.toFixed(2)}</p>
  </div>

  <div className="summary-box">
    <h3>Total Expenses</h3>
    <p>₦{totals.expense.toFixed(2)}</p>
  </div>

  <div className="summary-box">
    <h3>Balance</h3>
    <p>₦{totals.balance.toFixed(2)}</p>
  </div>
 </div>

  <div className="bm-bg grid grid-cols-2 gap-3 rounded-4xl">
    <BudgetPanel
      budget={budget}
      setBudget={setBudget}
      userId={currentUser?.uid}
    />
     <MonthlyIncomePanel
      income={monthlyIncome}
      setMonthlyIncome={setMonthlyIncome}
      userId={currentUser?.uid}
    />
  </div>

  <div className="summary-box wide">
   
  </div>

</section>

 {/* MAIN LAYOUT */}
      <section className="layout">

        {/* LEFT SIDE — FORM + TABLE */}
        <div className="left">
          <TransactionForm
            editTransaction={editTransaction}
            clearEdit={() => setEditTransaction(null)}
          />

          <TransactionList
            transactions={transactions}
            onEdit={setEditTransaction}
            onDelete={handleDelete}
          />
        </div>

        {/* RIGHT SIDE — CHARTS + EXPORTS */}
         <div className="right">

          <div className="charts-section">

            <div className="chart-card" ref={barChartRef}>
              <h3>Income vs Expense</h3>
              <div className="chart-container">
                <Charts transactions={transactions} chartType="bar" />
              </div>
            </div>

            <div className="chart-card" ref={pieChartRef}>
              <h3>Expense Breakdown</h3>
              <div className="chart-container">
                <Charts transactions={transactions} chartType="pie" />
              </div>
            </div>

          </div>

          <ExportButtons
  transactions={transactions}
  totals={totals}
  monthlyIncome={monthlyIncome}
  budget={budget}
  pieChartRef={pieChartRef}
  barChartRef={barChartRef}
/>


        </div>
      </section>
    </div>
  );
}
