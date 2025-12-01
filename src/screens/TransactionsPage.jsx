// src/screens/TransactionsPage.jsx
import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

import TransactionList from "../components/TransactionList";
import TransactionForm from "../components/TransactionForm";

export default function TransactionsPage() {
  const { currentUser } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTransaction] = useState(null);

  /* Load transactions */
  useEffect(() => {
    if (!currentUser) return;

    const q = query(
      collection(db, "transactions"),
      where("userId", "==", currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTransactions(docs);
    });

    return unsub;
  }, [currentUser]);

  /* DELETE FUNCTION (REAL ONE) */
  async function handleDelete(id) {
    try {
      await deleteDoc(doc(db, "transactions", id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete transaction.");
    }
  }

  return (
    <div className="screen-container">
      <header className="screen-header">
        <h1>Transactions</h1>
        <p>
          Review your full transaction history. Edit or delete entries whenever needed.
        </p>
      </header>

      {/* If editing, show form above the list */}
      {editTransaction && (
        <div className="screen-body">
          <TransactionForm
            editTransaction={editTransaction}
            clearEdit={() => setEditTransaction(null)}
          />
        </div>
      )}

      <section className="screen-body">
        <TransactionList
          transactions={transactions}
          onEdit={(tx) => setEditTransaction(tx)}
          onDelete={handleDelete}
        />
      </section>
    </div>
  );
}
