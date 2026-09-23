import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, ChevronDown, ShieldCheck, User, Settings, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem('userRole') || 'student';
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: role === 'admin' ? 'Alumni Management' : 'Discover Alumni', path: '/discover' },
    ...(role === 'admin' ? [{ name: 'Student Management', path: '/students' }] : []),
    ...(role === 'alumni' ? [{ name: 'Requests', path: '/requests', badge: '3' }] : []),
    ...(role !== 'admin' ? [{ name: 'Connections', path: '/connections' }] : []),
    { name: 'Events & Opportunities', path: '/events' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border/40">
      <div className="max-w-7xl mx-auto px-8">
        <div className="h-16 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3 shrink-0">
            <Link to="/dashboard" aria-label="BITConnect Home" className="flex items-center gap-3 group focus:outline-none">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold tracking-tight leading-none">
                            <span className="text-blue-700">BIT</span>
                            <span className="text-slate-900">Connect</span>
                        </span>
                    </div>
                    <p className="text-[11px] font-semibold tracking-wide text-slate-400 mt-1 uppercase">Bannari Amman Institute of Technology</p>
                </div>
            </Link>
          </div>
          
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-text-secondary pointer-events-none" />
              <input 
                type="text" 
                placeholder="Search alumni, companies, roles..." 
                className="w-full h-9 pl-9 pr-14 bg-slate-50 border border-border rounded-lg text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:border-primary focus:bg-white transition-all"
              />
              <div className="absolute right-2 flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-100 border border-border/50 text-text-secondary text-[10px] pointer-events-none">
                <kbd>⌘K</kbd>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 shrink-0">
            <button className="relative p-2 text-text-secondary hover:text-text-primary hover:bg-slate-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full ring-2 ring-white"></span>
            </button>
            <div className="relative pl-2 border-l border-border/40" ref={dropdownRef}>
              <div 
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="relative shrink-0">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-semibold">
                      A
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-secondary rounded-full ring-2 ring-white"></span>
                </div>
                <ChevronDown className="w-4 h-4 text-text-secondary group-hover:text-text-primary" />
              </div>
              
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-border/50 rounded-xl shadow-lg py-1 z-50">
                  <button className="w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-slate-50 hover:text-text-primary flex items-center gap-2 transition-colors">
                    <User className="w-4 h-4" /> Profile
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-slate-50 hover:text-text-primary flex items-center gap-2 transition-colors">
                    <Settings className="w-4 h-4" /> Settings
                  </button>
                  <div className="h-px bg-border/50 my-1"></div>
                  <button 
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 hover:text-red-700 flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="border-t border-border/30 flex items-center justify-between overflow-x-auto py-1">
          <nav className="flex items-center gap-6 shrink-0">
            {navLinks.map((link) => {
              const isActive = location.pathname.startsWith(link.path);
              return (
                <Link 
                  key={link.name}
                  to={link.path}
                  className={`py-2 border-b-2 whitespace-nowrap text-sm flex items-center gap-1.5 transition-colors ${
                    isActive 
                      ? 'border-primary text-primary font-semibold' 
                      : 'border-transparent text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {link.name}
                  {link.badge && (
                    <span className="px-1.5 py-0.5 rounded-full bg-blue-100 text-primary text-[10px] leading-none">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="hidden sm:flex items-center gap-2 text-text-secondary text-xs pl-4 shrink-0">
            <ShieldCheck className="w-4 h-4 text-secondary" />
            <span>Institution Credential Active</span>
          </div>
        </div>
      </div>
    </header>
  );
}
