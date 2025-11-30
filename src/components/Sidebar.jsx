// src/components/SidebarLayout.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function SidebarLayout({ children }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch (e) {
      console.error("Logout error", e);
    }
  }

  return (
    <div className="app-shell">
      
      {/* LEFT SIDEBAR */}
      <aside className="app-sidebar">
        
        {/* Brand / Logo */}
        <div className="sidebar-brand">
          <img
            src="/assets/cashpilot-logo.png"
            alt="CashPilot"
            className="sidebar-logo"
            style={{ width: "34px", height: "34px", objectFit: "contain" }}
          />
          <span>CashPilot</span>
        </div>

        {/* MAIN NAVIGATION */}
        <nav className="sidebar-nav">

          {/* HOMEPAGE BUTTON */}
          <NavLink
            to="/"
            className={({ isActive }) =>
              "sidebar-link" + (isActive ? " active" : "")
            }
          >
            <span>🏡</span>
            <span>Home</span>
          </NavLink>

          {/* DASHBOARD OVERVIEW */}
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              "sidebar-link" + (isActive ? " active" : "")
            }
          >
            <span>📊</span>
            <span>Overview</span>
          </NavLink>

          {/* NEW SCREENS */}
          <NavLink
            to="/dashboard/form"
            className={({ isActive }) =>
              "sidebar-link" + (isActive ? " active" : "")
            }
          >
            <span>➕</span>
            <span>Add Transaction</span>
          </NavLink>

          <NavLink
            to="/dashboard/list"
            className={({ isActive }) =>
              "sidebar-link" + (isActive ? " active" : "")
            }
          >
            <span>📄</span>
            <span>Transactions</span>
          </NavLink>

          <NavLink
            to="/dashboard/charts"
            className={({ isActive }) =>
              "sidebar-link" + (isActive ? " active" : "")
            }
          >
            <span>📈</span>
            <span>Analytics</span>
          </NavLink>
        </nav>

        {/* BOTTOM SECTION */}
        <div className="sidebar-footer">

          {/* ACCOUNT INFO */}
          {currentUser && (
            <div className="sidebar-user">
              <div className="avatar">
                {currentUser.email?.charAt(0)?.toUpperCase()}
              </div>

              <div className="user-meta">
                <span className="user-label">Signed in as</span>
                <span className="user-email">{currentUser.email}</span>
              </div>
            </div>
          )}

          {/* LOGOUT BUTTON */}
          <button className="sidebar-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>

      </aside>

      {/* MAIN CONTENT */}
      <main className="app-main">
        <div className="page page-morph">{children}</div>
      </main>
    </div>
  );
}
