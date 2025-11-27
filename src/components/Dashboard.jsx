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
import Navbar from "./Navbar";
import AnimatedCounter from "./AnimatedCounter";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(0);
  const [editTransaction, setEditTransaction] = useState(null);
  const [monthlyIncome, setMonthlyIncome] = useState(0);

  const pieChartRef = useRef(null);
  const barChartRef = useRef(null);

  /* 🔥 TRANSACTIONS */
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

  /* 💰 BUDGET */
useEffect(() => {
  if (!currentUser) return;

  const docRef = doc(db, "monthlyIncome", currentUser.uid);

  const unsubscribe = onSnapshot(docRef, (snapshot) => {
    if (snapshot.exists()) {
      setMonthlyIncome(snapshot.data().amount || 0);
    } else {
      setMonthlyIncome(0);
    }
  });

  return unsubscribe;
}, [currentUser]);

  /* 💵 MONTHLY INCOME */
  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "monthlyIncome"),
      where("userId", "==", currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setMonthlyIncome(snapshot.docs[0].data().amount || 0);
      } else {
        setMonthlyIncome(0);
      }
    });

    return unsubscribe;
  }, [currentUser]);

  /* 📊 TOTALS */
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

  /* 🗑 DELETE */
  async function handleDelete(id) {
    try {
      await deleteDoc(doc(db, "transactions", id));
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete transaction.");
    }
  }

  return (
    <div className="dashboard dark-dashboard">

      {/* ✅ Toolbar with Glass */}
      <Navbar />

      {/* ✅ Main Content */}
      <div className="dashboard-content">

        {/* ===== SUMMARY SECTION ===== */}
        <section className="summary">

          <div className="summary-box">
            <h3>Total Income</h3>
            <p><AnimatedCounter value={totals.income} /></p>
            <small>YOUR TOTAL EARNINGS</small>
          </div>

          <div className="summary-box">
            <h3>Total Expenses</h3>
            <p><AnimatedCounter value={totals.expense} /></p>
            <small>RECORDED SPENDING</small>
          </div>

          <div className="summary-box">
            <h3>Balance</h3>
            <p><AnimatedCounter value={totals.balance} /></p>
            <small>INCOME MINUS EXPENSES</small>
          </div>

          <div className="summary-box wide">
            <BudgetPanel
              budget={budget}
              setBudget={setBudget}
              userId={currentUser?.uid}
            />
          </div>

          <div className="summary-box wide">
            <MonthlyIncomePanel
              income={monthlyIncome}
              userId={currentUser?.uid}
            />
          </div>

        </section>

{/* ===== MAIN LAYOUT ===== */}
<section className="layout">

  {/* LEFT SIDE – Everything now full width */}
  <div className="left chart-full-wrapper">

    <TransactionForm
      editTransaction={editTransaction}
      clearEdit={() => setEditTransaction(null)}
    />

    <TransactionList
      transactions={transactions}
      onEdit={setEditTransaction}
      onDelete={handleDelete}
    />

    {/* ✅ BAR CHART FULL WIDTH */}
    <div className="chart-wide-card">
      <h3>Income vs Expense</h3>
      <div className="chart-full-container">
        <Charts transactions={transactions} chartType="bar" />
      </div>
    </div>

    {/* ✅ PIE CHART FULL WIDTH */}
    <div className="chart-wide-card">
      <h3>Expense Breakdown</h3>
      <div className="chart-full-container">
        <Charts transactions={transactions} chartType="pie" />
      </div>
    </div>

  </div>
              {/* EXPORT */}
            <div className="card export-section">
              <ExportButtons
                transactions={transactions}
                totals={totals}
                pieChartRef={pieChartRef}
                barChartRef={barChartRef}
              />
            </div>

</section>

      </div>
    </div>
  );
}
