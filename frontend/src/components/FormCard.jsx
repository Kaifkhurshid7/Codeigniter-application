export default function FormCard({ title, description, children }) {
  return (
    <section className="glass-panel form-card">
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      {children}
    </section>
  );
}
