import React from "react";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import ResetPassword from "./components/auth/ResetPassword";
import Dashboard from "./components/Dashboard";
import { useLocation } from "react-router-dom";
import HomePage from "./components/HomePage";

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" replace />;
  return children;
}

function AppShell() {
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/reset-password";

  return (
    <div className="app-shell">

      {/* 🔥 Hide header on auth pages */}
      {!isAuthPage && (
        <header className="app-header">
          <div className="header-logo">
            <img src="/assets/cashpilot-logo.png" alt="CashPilot" />
            <span>{currentUser?.name || "CashPilot"}</span>
          </div>

          <nav>
            {currentUser ? (
              <>
                <span className="user-email">{currentUser.email}</span>
                <button onClick={logout}>Logout</button>
              </>
            ) : (
              <div className="gap-3 flex">
                <Link to="/login" className="authText font-bold text-white hover:text-green-600 delay-100 ease-in-out">Login</Link>
                <Link to="/register" className="authText font-bold text-white hover:text-green-600 delay-100 ease-in-out">Register</Link>
              </div>
            )}
          </nav>
        </header>
      )}

      <main className={`app-main ${isAuthPage ? "auth-fullscreen" : ""}`}>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          {/* <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </main>

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppShell />
    </AuthProvider>
  );
}
