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

  const currencyFormatter = useMemo(
    () =>
      new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        minimumFractionDigits: 2,
      }),
    []
  );

  const formatCurrency = (value) => currencyFormatter.format(Number(value || 0));

  const budgetPercent = useMemo(() => {
    if (!budget) return 0;
    if (!totals.expense) return 0;
    return (totals.expense / budget) * 100;
  }, [budget, totals.expense]);

  const clampedBudgetPercent = Math.min(150, Math.max(0, budgetPercent));
  const budgetStatusText = budget
    ? `${Math.min(999, Math.round(budgetPercent))}% spent`
    : "No budget set";
  const budgetGuidance = overBudget
    ? "You’ve exceeded the plan—dial back on expenses."
    : budget
    ? "You’re on track. Keep expenses within this range."
    : "Set a budget to unlock personalised guidance.";

  /* ----------------------------------------------------------
      UI
  ---------------------------------------------------------- */
  return (
    <div className="dashboard">
      <section className="summary-section">
        <div className="summary-grid">
          <article className="summary-card income">
            <p className="label">Total income</p>
            <p className="value">{formatCurrency(totals.income)}</p>
            <span className="subtext">All recorded earnings</span>
          </article>

          <article className="summary-card expense">
            <p className="label">Total expenses</p>
            <p className="value">{formatCurrency(totals.expense)}</p>
            <span className="subtext">Outflows for the period</span>
          </article>

          <article className="summary-card balance">
            <p className="label">Balance</p>
            <p className="value">{formatCurrency(totals.balance)}</p>
            <span className="subtext">
              {totals.balance >= 0 ? "Healthy cash flow" : "You are in deficit"}
            </span>
          </article>
        </div>

        <div className="insight-grid">
          <BudgetPanel budget={budget} setBudget={setBudget} />

          <MonthlyIncomePanel
            income={monthlyIncome}
            setMonthlyIncome={setMonthlyIncome}
            userId={currentUser?.uid}
          />

          <div className="insight-card budget-health">
            <div className="insight-card__body">
              <div className="insight-label">Budget health</div>
              <h3 className="insight-amount">{budgetStatusText}</h3>
              <p className="insight-help">{budgetGuidance}</p>

              {budget ? (
                <>
                  <div className="budget-progress">
                    <span
                      className={`budget-progress__value ${
                        overBudget ? "over" : ""
                      }`}
                      style={{
                        width: `${Math.min(clampedBudgetPercent, 120)}%`,
                      }}
                    />
                  </div>
                  <div className="budget-progress__meta">
                    <span>{formatCurrency(totals.expense)} spent</span>
                    <span>{formatCurrency(budget)} planned</span>
                  </div>
                </>
              ) : (
                <div className="budget-progress__placeholder">
                  Add a monthly budget to track how fast you’re spending.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="panel-stack">
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

        <div className="panel-stack">
          <div className="card chart-card" ref={barChartRef}>
            <div className="chart-card__header">
              <div>
                <p className="label">Overview</p>
                <h3>Income vs Expense</h3>
              </div>
            </div>

            <div className="chart-container">
              <Charts transactions={transactions} chartType="bar" />
            </div>
          </div>

          <div className="card chart-card" ref={pieChartRef}>
            <div className="chart-card__header">
              <div>
                <p className="label">Categories</p>
                <h3>Expense breakdown</h3>
              </div>
            </div>

            <div className="chart-container">
              <Charts transactions={transactions} chartType="pie" />
            </div>
          </div>

          <ExportButtons
            transactions={transactions}
            totals={totals}
            monthlyIncome={monthlyIncome}
            budget={budget}
            pieChartRef={pieChartRef}
            barChartRef={barChartRef}
            className="utility-card"
          />
        </div>
      </section>
    </div>
  );
}
