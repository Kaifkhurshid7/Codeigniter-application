import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TeacherPage from './pages/TeacherPage';
import TablesPage from './pages/TablesPage';
import OverviewPage from './pages/OverviewPage';
import { authService, teacherService, dataService } from './services/api';

export default function App() {
  const [activeView, setActiveView] = useState('auth');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ users: [], teachers: [] });

  // Check for existing token on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('internship_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setActiveView('overview');
      refreshData();
    }
  }, []);

  const refreshData = async () => {
    setLoading(true);
    try {
      const [usersRes, teachersRes] = await Promise.all([
        dataService.getUsers(),
        dataService.getTeachers()
      ]);
      setData({
        users: usersRes.data.data,
        teachers: teachersRes.data.data
      });
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (payload) => {
    setLoading(true);
    try {
      const res = await authService.login(payload);
      const { token, user: userData } = res.data;
      
      localStorage.setItem('internship_token', token);
      localStorage.setItem('internship_user', JSON.stringify(userData));
      
      setUser(userData);
      setActiveView('overview');
      refreshData();
      return true;
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (payload) => {
    setLoading(true);
    try {
      await authService.register(payload);
      alert('Registration successful! Please login.');
      setActiveView('auth');
      return true;
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTeacher = async (payload) => {
    setLoading(true);
    try {
      await teacherService.create(payload);
      alert('Teacher created successfully!');
      setActiveView('tables');
      refreshData();
      return true;
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create teacher.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const renderView = () => {
    switch (activeView) {
      case 'auth':
        return <LoginPage onSubmit={handleLogin} loading={loading} />;
      case 'register':
        return <RegisterPage onSubmit={handleRegister} loading={loading} />;
      case 'teacher':
        return <TeacherPage onSubmit={handleCreateTeacher} loading={loading} />;
      case 'tables':
        return <TablesPage users={data.users} teachers={data.teachers} />;
      case 'overview':
      default:
        return <OverviewPage data={data} />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="main-content">
        <Topbar user={user} onRefresh={refreshData} loading={loading} />
        <div className="view-container">
          {renderView()}
        </div>
      </main>
    </div>
  );
}
