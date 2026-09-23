import React, { useEffect, useState } from 'react';
import StudentDashboard from '../components/dashboards/StudentDashboard';
import AlumniDashboard from '../components/dashboards/AlumniDashboard';
import AdminDashboard from '../components/dashboards/AdminDashboard';

export default function Dashboard() {
  const [role, setRole] = useState<string>('student');

  useEffect(() => {
    // Read the role stored during login
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  switch (role.toLowerCase()) {
    case 'alumni':
      return <AlumniDashboard />;
    case 'admin':
      return <AdminDashboard />;
    case 'student':
    default:
      return <StudentDashboard />;
  }
}
