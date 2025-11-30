// src/components/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-container hero-animated">

      {/* NAVBAR */}
      <header className="home-header">
        <div className="brand">
          <img src="/assets/cashpilot-logo.png" alt="CashPilot" />
          <span>CashPilot</span>
        </div>

        <nav>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/login" className="nav-link login-btn">Login</Link>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-text">
          <h1 className="title-glow">
            Take Control of Your <span>Money</span>
          </h1>

          <p className="fade-in">
            CashPilot lets you track income, manage spending, set budgets, and visualize your entire financial life — with live insights tailored for clarity.
          </p>

          <div className="hero-buttons fade-in">
            <Link to="/dashboard" className="primary">Go To Dashboard</Link>
          </div>
        </div>

        <div className="hero-image">
          <img src="/assets/cashpilot-logo.png" alt="CashPilot Logo" />
        </div>
      </section>

      {/* FEATURE GRID */}
      <section className="features reveal">
        <div className="feature-card glass pop">
          <h3>📊 Smart Tracking</h3>
          <p>Track all income and expense instantly with real-time Firebase updates.</p>
        </div>

        <div className="feature-card glass pop">
          <h3>💰 Budget Control</h3>
          <p>Set and manage budgets. Never overspend again with intelligent alerts.</p>
        </div>

        <div className="feature-card glass pop">
          <h3>📈 Visual Analysis</h3>
          <p>Advanced charts show where your money goes — beautifully and clearly.</p>
        </div>

        <div className="feature-card glass pop">
          <h3>🔒 Secure Data</h3>
          <p>Protected by Firebase Auth and encrypted storage. Your data is safe.</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="home-footer">
        © 2025 CharisCorp. All rights reserved.
      </footer>
    </div>
  );
}
