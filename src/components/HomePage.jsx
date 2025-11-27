export default function HomePage() {
  return (
    <div className="home-page">
      <h1>Welcome to CashPilot</h1>
      <p>Your personal finance management tool.</p>
      <Link to="/register" className="get-started-button">
        Get Started
      </Link>
    </div>
  );
}