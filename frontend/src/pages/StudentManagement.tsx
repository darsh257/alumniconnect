import React, { useState, useRef, useEffect } from 'react';
import { Search, ShieldCheck, Mail, BookOpen, GraduationCap, UserX, MoreVertical, CheckCircle, Edit, Key, Trash2 } from 'lucide-react';

export default function StudentManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [yearFilter, setYearFilter] = useState('All Years');
  const [openActionMenuId, setOpenActionMenuId] = useState<number | null>(null);
  
  const actionMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target as Node)) {
        setOpenActionMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const mockStudents = [
    { id: 1, name: 'Aryan Sharma', email: 'aryan.cs25@bitconnect.edu', department: 'Computer Science', year: '2025', status: 'Active' },
    { id: 2, name: 'Priya Patel', email: 'priya.me26@bitconnect.edu', department: 'Mechanical', year: '2026', status: 'Active' },
    { id: 3, name: 'Rahul Verma', email: 'rahul.ec25@bitconnect.edu', department: 'Electronics', year: '2025', status: 'Suspended' },
    { id: 4, name: 'Kavya Singh', email: 'kavya.cs24@bitconnect.edu', department: 'Computer Science', year: '2024', status: 'Active' },
    { id: 5, name: 'Arjun Das', email: 'arjun.ce27@bitconnect.edu', department: 'Civil', year: '2027', status: 'Active' },
    { id: 6, name: 'Neha Gupta', email: 'neha.it25@bitconnect.edu', department: 'Information Technology', year: '2025', status: 'Pending Review' },
  ];

  const departments = ['All Departments', 'Computer Science', 'Mechanical', 'Electronics', 'Civil', 'Information Technology'];
  const years = ['All Years', '2024', '2025', '2026', '2027'];

  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = deptFilter === 'All Departments' || student.department === deptFilter;
    const matchesYear = yearFilter === 'All Years' || student.year === yearFilter;
    return matchesSearch && matchesDept && matchesYear;
  });

  return (
    <div className="max-w-7xl mx-auto px-8 py-8 w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-text-primary">Student Management</h1>
          <p className="text-sm text-text-secondary mt-1">Manage student accounts, review registrations, and enforce platform guidelines.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-6 bg-slate-50 border-b border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
            <input 
              type="text" 
              placeholder="Search students by name or email..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-9 pl-9 pr-4 bg-white border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <select 
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="h-9 px-3 bg-white border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:border-primary"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <select 
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
              className="h-9 px-3 bg-white border border-border rounded-lg text-sm text-text-primary focus:outline-none focus:border-primary"
            >
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-white border-b border-border text-text-secondary">
              <tr>
                <th className="px-6 py-4 font-medium">Student Name</th>
                <th className="px-6 py-4 font-medium">Department</th>
                <th className="px-6 py-4 font-medium">Graduation Year</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-white">
              {filteredStudents.length > 0 ? (
                filteredStudents.map(student => (
                  <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-text-secondary font-medium">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-text-primary">{student.name}</div>
                          <div className="text-xs text-text-secondary flex items-center gap-1 mt-0.5">
                            <Mail className="w-3 h-3" /> {student.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-text-secondary">
                        <BookOpen className="w-4 h-4" /> {student.department}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-text-secondary">
                        <GraduationCap className="w-4 h-4" /> Class of '{student.year.slice(-2)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                        student.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 
                        student.status === 'Suspended' ? 'bg-red-100 text-red-700' : 
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {student.status === 'Active' && <CheckCircle className="w-3 h-3" />}
                        {student.status === 'Suspended' && <UserX className="w-3 h-3" />}
                        {student.status === 'Pending Review' && <ShieldCheck className="w-3 h-3" />}
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="text-sm font-medium text-primary hover:text-primary-hover">
                          View
                        </button>
                        <div className="relative" ref={openActionMenuId === student.id ? actionMenuRef : null}>
                          <button 
                            onClick={() => setOpenActionMenuId(openActionMenuId === student.id ? null : student.id)}
                            className="p-1.5 text-text-secondary hover:text-text-primary hover:bg-slate-200 rounded-md transition-colors"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                          
                          {openActionMenuId === student.id && (
                            <div className="absolute right-0 mt-1 w-48 bg-white border border-border/50 rounded-xl shadow-lg py-1 z-50 text-left">
                              <button className="w-full px-4 py-2 text-sm text-text-secondary hover:bg-slate-50 hover:text-text-primary flex items-center gap-2 transition-colors">
                                <Edit className="w-4 h-4" /> Edit Details
                              </button>
                              <button className="w-full px-4 py-2 text-sm text-text-secondary hover:bg-slate-50 hover:text-text-primary flex items-center gap-2 transition-colors">
                                <Key className="w-4 h-4" /> Reset Password
                              </button>
                              <div className="h-px bg-border/50 my-1"></div>
                              <button className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center gap-2 transition-colors">
                                {student.status === 'Suspended' ? <ShieldCheck className="w-4 h-4" /> : <UserX className="w-4 h-4" />}
                                {student.status === 'Suspended' ? 'Unsuspend' : 'Suspend'}
                              </button>
                              <button className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center gap-2 transition-colors">
                                <Trash2 className="w-4 h-4" /> Delete Account
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-text-secondary">
                    No students found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
      </div>
    </div>
  );
}
