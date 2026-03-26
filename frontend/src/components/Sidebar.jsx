import { Database, GraduationCap, LockKeyhole, PlusSquare, Users } from 'lucide-react';

const navItems = [
  { key: 'overview', label: 'Overview', icon: Database },
  { key: 'register', label: 'Register', icon: Users },
  { key: 'teacher', label: 'Create Teacher', icon: PlusSquare },
  { key: 'auth', label: 'Login', icon: LockKeyhole },
  { key: 'tables', label: 'Data Tables', icon: GraduationCap },
];

export default function Sidebar({ activeView, setActiveView }) {
  return (
    <aside className="sidebar glass-panel">
      <div>
        <p className="eyebrow">Enterprise Solutions</p>
        <h1>Resource Portal</h1>
        <p className="sidebar-copy">
          Academic Resource Management System (ARMS). Secure user provisioning and 1:1 teacher profile synchronization.
        </p>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            className={activeView === key ? 'nav-button active' : 'nav-button'}
            onClick={() => setActiveView(key)}
          >
            <Icon size={18} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
