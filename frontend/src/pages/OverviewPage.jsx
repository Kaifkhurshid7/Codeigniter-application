import { Activity, Database, Shield } from 'lucide-react';
import StatCard from '../components/StatCard';

export default function OverviewPage({ users, teachers, tokenReady }) {
  const stats = [
    {
      label: 'Registered Users',
      value: users.length,
      detail: 'Live API-backed user records',
      accent: 'linear-gradient(135deg, #00c6ff, #00f2fe)',
      icon: Database,
    },
    {
      label: 'Teacher Profiles',
      value: teachers.length,
      detail: 'Strict one-to-one user mapping',
      accent: 'linear-gradient(135deg, #7f5af0, #4f46e5)',
      icon: Activity,
    },
    {
      label: 'Protected Access',
      value: tokenReady ? 'Active' : 'Pending',
      detail: 'JWT token required for data routes',
      accent: 'linear-gradient(135deg, #22c55e, #14b8a6)',
      icon: Shield,
    },
  ];

  return (
    <div className="content-grid overview-grid">
      <section className="hero-panel glass-panel">
        <p className="eyebrow">System Summary</p>
        <h2>Modern auth and user management with a recruiter-friendly presentation layer.</h2>
        <p>
          This dashboard demonstrates secure registration, JWT login, teacher profile creation, protected APIs,
          and real-time table rendering across a neon-grid control surface.
        </p>
      </section>

      <section className="stats-grid">
        {stats.map((item) => (
          <StatCard key={item.label} label={item.label} value={item.value} detail={item.detail} accent={item.accent} />
        ))}
      </section>
    </div>
  );
}
