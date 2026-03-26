import { Activity, Database, Shield } from 'lucide-react';
import StatCard from '../components/StatCard';

export default function OverviewPage({ data }) {
  const stats = [
    {
      label: 'Registered Users',
      value: data?.users?.length || 0,
      detail: 'Live API-backed user records',
      icon: Database,
    },
    {
      label: 'Teacher Profiles',
      value: data?.teachers?.length || 0,
      detail: 'Strict one-to-one user mapping',
      icon: Activity,
    },
    {
      label: 'Protected Access',
      value: localStorage.getItem('internship_token') ? 'Active' : 'Pending',
      detail: 'JWT token required for data routes',
      icon: Shield,
    },
  ];

  return (
    <div className="overview-container">
      <section className="hero-panel glass-panel">
        <p className="eyebrow">Enterprise Intelligence</p>
        <h2>A sophisticated full-stack architecture for modern user & teacher management.</h2>
        <p>
          This dashboard demonstrates secure registration, JWT-based authentication, 
          transactional data persistence across linked tables, and protected API consumption.
        </p>
        <div className="illustration-area">
          <img 
            src="/dashboard.png" 
            alt="Dashboard Illustration" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} 
          />
        </div>
      </section>

      <section className="stats-grid">
        {stats.map((item) => (
          <StatCard 
            key={item.label} 
            label={item.label} 
            value={item.value} 
            detail={item.detail} 
          />
        ))}
      </section>
    </div>
  );
}

