import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

export default function Login() {
  const [role, setRole] = useState<'student' | 'alumni' | 'admin'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setError('');
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ credential: credentialResponse.credential })
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token, data.user);
        navigate('/dashboard');
      } else {
        setError(data.error || 'Google login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Bypassing real authentication for testing
      setTimeout(() => {
        login('mock-token', { 
          id: '123', 
          name: 'Test User', 
          email: email || 'test@example.com', 
          role: role.toUpperCase() 
        });
        navigate('/dashboard');
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Network error. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased flex flex-col justify-between selection:bg-slate-200 selection:text-slate-900 relative subtle-grid" style={{ backgroundColor: 'rgb(251, 251, 252)' }}>
      <style>{`
        .subtle-grid {
            background-size: 24px 24px;
            background-image:
                linear-gradient(to right, rgba(226, 232, 240, 0.4) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(226, 232, 240, 0.4) 1px, transparent 1px);
        }
      `}</style>
      
      {/* BEGIN: SiteHeader */}
      <header className="relative z-10 w-full border-b border-slate-200/90 bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
            {/* Brand / Crest */}
            <div className="flex items-center gap-3.5">
                <a aria-label="BIT Alumni Gateway Home" className="flex items-center gap-3 group focus:outline-none" href="#">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-bold tracking-tight leading-none">
                                <span className="text-blue-700">BIT </span>
                                <span className="text-slate-900">Alumni</span>
                            </span>
                        </div>
                        <p className="text-[11px] font-semibold tracking-wide text-slate-400 mt-1 uppercase">Bannari Amman Institute of Technology</p>
                    </div>
                </a>
            </div>
            {/* Navigation Utility */}
            <nav aria-label="Global links" className="flex items-center gap-2 sm:gap-4 text-xs font-medium text-slate-600">
                <a className="hover:text-slate-900 transition-colors px-2 py-1 text-xs font-medium text-slate-600" href="#">Help Desk</a>
            </nav>
        </div>
      </header>
      {/* END: SiteHeader */}

      {/* BEGIN: MainContent */}
      <main className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 lg:py-16 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* LEFT COLUMN: Institutional Heritage & System Context */}
            <section aria-labelledby="hero-title" className="lg:col-span-6 flex flex-col justify-center space-y-7">
                {/* Main Headline */}
                <div className="space-y-4">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.18]" id="hero-title">
                        Connecting BITians: Legacy of <span className="text-slate-700">Engineering Excellence &amp; Global Impact</span>
                    </h1>
                    <p className="text-sm sm:text-base text-slate-600 max-w-xl font-normal leading-relaxed">
                        Official cryptographic gateway connecting Bannari Amman Institute of Technology (BIT) engineering alumni leaders, verified scholars, and global chapters across industries.
                    </p>
                </div>
            </section>
            
            {/* RIGHT COLUMN: Sign-In Card */}
            <section className="lg:col-span-6 w-full max-w-lg mx-auto lg:ml-auto">
                <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 sm:p-8" data-purpose="auth-card">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-5">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Sign in to BIT Alumni Portal</h2>
                            <p className="text-xs sm:text-sm text-slate-500 mt-1.5">Select your BIT affiliation to access the cryptographically verified institutional portal.</p>
                        </div>
                    </div>
                    
                    {/* Affiliation Tabs */}
                    <div className="mb-5" data-purpose="affiliation-tabs">
                        <div aria-label="Affiliation selection" className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200/70" role="tablist">
                            <button 
                                onClick={() => setRole('student')}
                                aria-selected={role === 'student'}
                                className={`affiliation-tab flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs transition-all ${role === 'student' ? 'font-semibold bg-white text-blue-900 shadow-xs border border-slate-200/90' : 'font-medium text-slate-700 hover:text-slate-900'}`}
                                type="button"
                            >
                                <svg className={`w-3.5 h-3.5 ${role === 'student' ? 'text-blue-700' : 'text-slate-500'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                                <span>Student</span>
                            </button>
                            <button 
                                onClick={() => setRole('alumni')}
                                aria-selected={role === 'alumni'}
                                className={`affiliation-tab flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs transition-all ${role === 'alumni' ? 'font-semibold bg-white text-blue-900 shadow-xs border border-slate-200/90' : 'font-medium text-slate-700 hover:text-slate-900'}`}
                                type="button"
                            >
                                <svg className={`w-3.5 h-3.5 ${role === 'alumni' ? 'text-blue-700' : 'text-slate-500'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                                    <polyline points="10 17 15 12 10 7"></polyline>
                                    <line x1="15" x2="3" y1="12" y2="12"></line>
                                </svg>
                                <span>Alumni</span>
                            </button>
                            <button 
                                onClick={() => setRole('admin')}
                                aria-selected={role === 'admin'}
                                className={`affiliation-tab flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs transition-all ${role === 'admin' ? 'font-semibold bg-white text-blue-900 shadow-xs border border-slate-200/90' : 'font-medium text-slate-700 hover:text-slate-900'}`}
                                type="button"
                            >
                                <svg className={`w-3.5 h-3.5 ${role === 'admin' ? 'text-blue-700' : 'text-slate-500'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                </svg>
                                <span>Admin</span>
                            </button>
                        </div>
                    </div>
                    
                    {/* Form */}
                    {error && (
                        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                            {error}
                        </div>
                    )}
                    <form className="space-y-4" onSubmit={handleLogin}>
                        {/* Email / ID */}
                        <div data-purpose="field-email">
                            <label className="block text-xs font-bold text-slate-900 tracking-tight mb-1.5" htmlFor="email">Roll Number or BIT Institutional ID</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <rect height="16" rx="2" width="20" x="2" y="4"></rect>
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                                    </svg>
                                </div>
                                <input
                                    className="block w-full pl-10 pr-4 py-2.5 bg-slate-50/50 hover:bg-white focus:bg-white border border-slate-200 focus:border-blue-600 rounded-lg text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 transition"
                                    id="email" 
                                    name="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={role === 'student' ? 'student.rollno@campus.edu' : role === 'alumni' ? 'alumni.name@heritage.org' : 'officer@gateway.edu.internal'}
                                    type="email"
                                />
                            </div>
                        </div>
                        {/* Password */}
                        <div data-purpose="field-password">
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-xs font-bold text-slate-900 tracking-tight" htmlFor="password">Password</label>
                                <a className="text-xs font-medium text-blue-700 hover:text-blue-800 hover:underline transition" href="#">Reset Password</a>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <circle cx="7.5" cy="15.5" r="4.5"></circle>
                                        <path d="m21 3-9.5 9.5"></path>
                                        <path d="m15.5 7.5 3 3"></path>
                                    </svg>
                                </div>
                                <input
                                    className="block w-full pl-10 pr-4 py-2.5 bg-slate-50/50 hover:bg-white focus:bg-white border border-slate-200 focus:border-blue-600 rounded-lg text-slate-900 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-600 transition font-mono tracking-widest"
                                    id="password" 
                                    name="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••••••" 
                                    type="password"
                                />
                            </div>
                        </div>
                        {/* Options Row */}
                        <div className="flex items-center justify-between pt-0.5">
                            <label className="flex items-center cursor-pointer select-none">
                                <input className="w-4 h-4 rounded border-slate-300 text-blue-700 focus:ring-blue-700 transition cursor-pointer" id="remember-me" type="checkbox" />
                                <span className="ml-2 text-xs font-normal text-slate-700">Remember me for 30 days</span>
                            </label>
                        </div>
                        {/* Submit Button */}
                        <div className="pt-2 space-y-4">
                            <button disabled={loading} className="w-full py-3 px-4 rounded-lg bg-[#1e3a8a] hover:bg-[#1d4ed8] text-white text-sm font-semibold tracking-wide shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50" type="submit">
                                <span>{loading ? 'Authenticating...' : 'Authenticate & Enter'}</span>
                                {!loading && (
                                    <svg className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <line x1="5" x2="19" y1="12" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                )}
                            </button>
                            
                            <div className="relative flex items-center py-1">
                                <div className="flex-grow border-t border-slate-200"></div>
                                <span className="flex-shrink-0 mx-4 text-xs text-slate-400 font-medium uppercase tracking-wider">Or continue with</span>
                                <div className="flex-grow border-t border-slate-200"></div>
                            </div>
                            
                            <div className="flex justify-center w-full [&>div]:w-full">
                                <GoogleLogin
                                    onSuccess={handleGoogleSuccess}
                                    onError={() => setError('Google Login Failed')}
                                    theme="outline"
                                    size="large"
                                    text="signin_with"
                                    shape="rectangular"
                                    width="100%"
                                />
                            </div>
                        </div>
                    </form>
                    
                    {/* Sign up helper */}
                    <div className="mt-5 text-center text-xs text-slate-600">
                        <span className="text-slate-600">Don't have an account?</span>
                        <Link className="font-medium text-blue-700 hover:underline ml-1" to="/register">Sign up</Link>
                    </div>
                </div>
            </section>
        </div>
      </main>
      {/* END: MainContent */}
      
      {/* BEGIN: SiteFooter */}
      <footer className="relative z-10 w-full border-t border-slate-200 bg-white/90 backdrop-blur-sm mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-2">
                <span>© 2025 Bannari Amman Institute of Technology. All rights reserved.</span>
            </div>
            <nav aria-label="Legal links" className="flex items-center flex-wrap justify-center gap-5 sm:gap-6 font-medium text-slate-600">
                <a className="hover:text-slate-900 transition" href="#">Privacy Policy</a>
                <a className="hover:text-slate-900 transition" href="#">Terms of Service</a>
                <a className="hover:text-slate-900 transition" href="#">Code of Conduct</a>
            </nav>
        </div>
      </footer>
      {/* END: SiteFooter */}
    </div>
  );
}
