// src/contexts/AuthContext.jsx
import React, { useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  reload,
  sendEmailVerification,
} from "firebase/auth";

import { auth } from "../firebase";

const AuthContext = React.createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // --------------------------------------------
  // LOGIN WITH EMAIL VERIFICATION CHECK
  // --------------------------------------------
  async function login(email, password) {
    const cred = await signInWithEmailAndPassword(auth, email, password);

    await reload(auth.currentUser);

    if (!auth.currentUser.emailVerified) {
      await signOut(auth);
      const error = new Error("Email not verified");
      error.code = "auth/email-not-verified";
      throw error;
    }

    return cred;
  }

  // --------------------------------------------
  // REGISTER + SEND VERIFICATION EMAIL
  // --------------------------------------------
  async function register(email, password) {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    try {
      await sendEmailVerification(cred.user);
    } catch (e) {
      console.error("Email verification failed:", e);
    }
    return cred;
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function logout() {
    return signOut(auth);
  }

  // --------------------------------------------
  // AUTH STATE LISTENER
  // --------------------------------------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await user.reload();
        if (!user.emailVerified) {
          setCurrentUser({ ...user, unverified: true });
        } else {
          setCurrentUser(user);
        }
      } else {
        setCurrentUser(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    register,
    resetPassword,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
