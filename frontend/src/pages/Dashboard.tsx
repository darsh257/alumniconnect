import React from 'react';
import StudentDashboard from '../components/dashboards/StudentDashboard';
import AlumniDashboard from '../components/dashboards/AlumniDashboard';
import AdminDashboard from '../components/dashboards/AdminDashboard';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();
  // Fallback to localStorage if user is not loaded yet during a quick render
  const role = user?.role?.toLowerCase() || localStorage.getItem('userRole')?.toLowerCase() || 'student';

  switch (role) {
    case 'alumni':
      return <AlumniDashboard />;
    case 'admin':
      return <AdminDashboard />;
    case 'student':
    default:
      return <StudentDashboard />;
  }
}
