// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Register";
import ResetPassword from "./components/auth/ResetPassword";

import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./components/Home";

export default function App() {
  return (
    <AuthProvider>
      <Routes>

        {/* ✅ Public Homepage */}
        <Route path="/" element={<Home />} />

        {/* ✅ Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ✅ Protected Route */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

      </Routes>
    </AuthProvider>
  );
}
