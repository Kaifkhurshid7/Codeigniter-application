export default function StatCard({ label, value, accent, detail }) {
  return (
    <article className="stat-card glass-panel">
      <div className="stat-accent" style={{ background: accent }} />
      <p className="stat-label">{label}</p>
      <h3 className="stat-value">{value}</h3>
      <span className="sidebar-copy">{detail}</span>
    </article>
  );
}
