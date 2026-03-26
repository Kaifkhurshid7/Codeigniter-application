import { ShieldCheck, Sparkles } from 'lucide-react';

export default function Topbar({ user, onRefresh, loading }) {
  return (
    <header className="topbar glass-panel">
      <div>
        <p className="eyebrow">Authentication Dashboard</p>
        <h2>Recruiter-ready full stack demo</h2>
      </div>

      <div className="topbar-actions">
        <div className="status-pill">
          <ShieldCheck size={16} />
          <span>{user ? `Signed in as ${user.first_name}` : 'Token not loaded'}</span>
        </div>
        <button type="button" className="primary-button small" onClick={onRefresh} disabled={loading}>
          <Sparkles size={16} />
          <span>{loading ? 'Refreshing...' : 'Refresh Data'}</span>
        </button>
      </div>
    </header>
  );
}
