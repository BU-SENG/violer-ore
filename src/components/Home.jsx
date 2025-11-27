import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "./Navbar";

export default function Home() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  function handleDashboardClick() {
    navigate(currentUser ? "/dashboard" : "/login");
  }

  return (
    <div className="home dark-home">

      {/* ✅ Shared Navbar */}
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section className="hero-section">

        <div className="hero-left">
          <h1>
            Take Control of Your <span>Money</span>
          </h1>

          <p>
            CashPilot helps you track income, manage spending, set budgets,
            and visualize your finances — in real time, with simplicity.
          </p>

          <div className="hero-actions">
            <button className="btn-primary" onClick={handleDashboardClick}>
              {currentUser ? "Go To Dashboard" : "Sign In To Continue"}
            </button>

            {!currentUser && (
              <button
                className="btn-outline"
                onClick={() => navigate("/register")}
              >
                Create Free Account
              </button>
            )}
          </div>
        </div>

        <div className="hero-right">
          <img src="/assets/cashpilot-small.png" alt="Dashboard preview" />
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="features-section">

        <div className="feature-box">
          <h3>📊 Smart Tracking</h3>
          <p>
 Log every income and expense in seconds.  
 Updates instantly using Firebase real-time sync.
          </p>
        </div>

        <div className="feature-box">
          <h3>💰 Budget Control</h3>
          <p>
 Set monthly budgets and track spending.  
 Prevent overspending with live balance updates.
          </p>
        </div>

        <div className="feature-box">
          <h3>📈 Visual Analysis</h3>
          <p>
 Interactive charts show your financial flow.  
 Understand where your money really goes.
          </p>
        </div>

        <div className="feature-box">
          <h3>🔐 Secure</h3>
          <p>
 Firebase authentication with email verification.  
 Your data is private and protected.
          </p>
        </div>

      </section>

      {/* ===== FOOTER ===== */}
      <footer className="home-footer">
        <p>© {new Date().getFullYear()} CharisCorp. All rights reserved.</p>
      </footer>
    </div>
  );
}
