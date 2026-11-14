import "./StatCard.css";
function StatCard({ title, value, icon, description }) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <h4>{title}</h4>
        <div className="stat-icon">{icon}</div>
      </div>

      <h2>{value}</h2>

      <p>{description}</p>
    </div>
  );
}

export default StatCard;
