import React, { useEffect, useState } from 'react';
import { Search, ChevronDown, Filter, Building, Rocket, GraduationCap, MessagesSquare, CheckCircle, Briefcase, MapPin, CalendarPlus, BadgeCheck, ArrowRight, UserPlus, UserCheck, UserX, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Discover() {
  const [role, setRole] = useState<string>('student');

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const [requestedIds, setRequestedIds] = useState<string[]>([]);
  const handleRequest = (id: string) => {
    if (!requestedIds.includes(id)) {
      setRequestedIds([...requestedIds, id]);
    }
  };

  const [adminTab, setAdminTab] = useState<'active' | 'pending'>('pending');
  const [searchQuery, setSearchQuery] = useState('');

  const pendingRequests = [
    { id: 1, name: 'Siddharth Mehra', batch: '19', degree: 'B.Tech Chemical Eng', idNumber: '2019CH10342', match: '98%' },
    { id: 2, name: 'Anjali Desai', batch: '22', degree: 'M.Tech Data Science', idNumber: '2022DS40121', match: '94%' }
  ];
  const alumniList = [
    {
      id: '1',
      name: 'Aditya Sen',
      batch: '16',
      role: 'Senior Tech Lead',
      company: 'Flipkart',
      degree: 'B.Tech CSE',
      location: 'Bengaluru, India',
      bio: 'Leading Distributed Logistics Engine team. Mentored 40+ campus grads into L5+ engineering roles across big tech.',
      skills: ['System Design', 'SDE Referrals', 'Distributed Systems'],
      color: 'from-blue-600 to-blue-800'
    },
    {
      id: '2',
      name: 'Pooja Agarwal',
      batch: '17',
      role: 'Product Lead',
      company: 'Zerodha',
      degree: 'B.Tech Mech & Minor CS',
      location: 'Bengaluru, India',
      bio: 'Spearheading Trading Systems & Mobile UI. Passionate about helping engineers transition into high-impact FinTech PM roles.',
      skills: ['Product Management', 'FinTech', 'APM Prep'],
      color: 'from-emerald-600 to-emerald-800'
    },
    {
      id: '3',
      name: 'Rohan Mehta',
      batch: '18',
      role: 'Software Engineer II',
      company: 'Amazon',
      degree: 'B.Tech IT',
      location: 'Seattle, WA',
      bio: 'Working on AWS Serverless infrastructure. Happy to chat about cloud architecture, career growth, and cracking interviews.',
      skills: ['Cloud Computing', 'AWS', 'System Design'],
      color: 'from-amber-500 to-amber-700'
    },
    {
      id: '4',
      name: 'Priya Sharma',
      batch: '15',
      role: 'Data Scientist',
      company: 'Meta',
      degree: 'M.Tech Data Science',
      location: 'London, UK',
      bio: 'Building recommendation systems and AI models. Mentoring students interested in ML and AI transitions.',
      skills: ['Machine Learning', 'Python', 'Data Analytics'],
      color: 'from-purple-600 to-purple-800'
    },
    {
      id: '5',
      name: 'Vikram Singh',
      batch: '14',
      role: 'Engineering Manager',
      company: 'Google',
      degree: 'B.Tech CSE',
      location: 'Bengaluru, India',
      bio: 'Leading the Search UI team. I can help with resume reviews, mock interviews, and leadership coaching.',
      skills: ['Engineering Management', 'Frontend', 'React'],
      color: 'from-red-500 to-red-700'
    },
    {
      id: '6',
      name: 'Neha Gupta',
      batch: '19',
      role: 'UX Designer',
      company: 'Atlassian',
      degree: 'B.Tech ECE',
      location: 'Sydney, Australia',
      bio: 'Creating user-centric enterprise products. Passionate about design systems and bridging the gap between design and engineering.',
      skills: ['UI/UX Design', 'Figma', 'Prototyping'],
      color: 'from-pink-500 to-pink-700'
    }
  ];

  const filteredAlumni = alumniList.filter(alumni => {
    const q = searchQuery.toLowerCase();
    return (
      alumni.name.toLowerCase().includes(q) ||
      alumni.company.toLowerCase().includes(q) ||
      alumni.role.toLowerCase().includes(q)
    );
  });

  if (role === 'admin') {
    return (
      <div className="max-w-7xl mx-auto px-8 py-8 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-2xl font-bold text-text-primary">Alumni Management</h1>
            <p className="text-sm text-text-secondary mt-1">Review incoming alumni verification requests and manage the active directory.</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
          <div className="border-b border-border flex items-center px-4 overflow-x-auto">
            <button 
              onClick={() => setAdminTab('pending')}
              className={`px-4 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                adminTab === 'pending' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              Pending Verification Requests
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${adminTab === 'pending' ? 'bg-blue-100 text-primary' : 'bg-slate-100 text-text-secondary'}`}>
                {pendingRequests.length}
              </span>
            </button>
            <button 
              onClick={() => setAdminTab('active')}
              className={`px-4 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                adminTab === 'active' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              Active Alumni Directory
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${adminTab === 'active' ? 'bg-blue-100 text-primary' : 'bg-slate-100 text-text-secondary'}`}>
                {alumniList.length}
              </span>
            </button>
          </div>

          <div className="p-6 bg-slate-50 border-b border-border flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
              <input 
                type="text" 
                placeholder="Search alumni by name, role, or company..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-4 bg-white border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="divide-y divide-border">
            {adminTab === 'pending' ? (
              pendingRequests.map(req => (
                <div key={req.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-primary shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-text-primary text-base">{req.name}</h4>
                        <span className="text-xs text-text-secondary bg-white border border-border px-1.5 py-0.5 rounded">ID: {req.idNumber}</span>
                      </div>
                      <p className="text-sm text-text-secondary mt-1">Claiming profile for <span className="text-primary font-medium">{req.degree} '{req.batch}</span></p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-text-secondary">
                        <ShieldCheck className="w-4 h-4 text-secondary" />
                        <span>DigiLocker NAD Match: <strong>{req.match}</strong></span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="flex-1 sm:flex-none px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                      <UserCheck className="w-4 h-4" /> Accept
                    </button>
                    <button className="flex-1 sm:flex-none px-4 py-2 bg-white border border-border hover:bg-red-50 text-red-600 rounded text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                      <UserX className="w-4 h-4" /> Reject
                    </button>
                  </div>
                </div>
              ))
            ) : filteredAlumni.length > 0 ? (
              filteredAlumni.map(alumni => (
                <div key={alumni.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-300 shrink-0"></div>
                    <div>
                      <h4 className="font-semibold text-text-primary text-base">{alumni.name}</h4>
                      <p className="text-xs text-text-secondary mt-0.5">{alumni.degree} '{alumni.batch}</p>
                      <p className="text-xs text-text-secondary mt-0.5">{alumni.role} @ {alumni.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="h-9 px-4 bg-white border border-border hover:bg-slate-100 text-text-primary rounded-lg text-sm font-medium transition-colors">
                      View Profile
                    </button>
                    <button className="h-9 px-4 bg-white border border-red-200 hover:bg-red-50 text-red-600 rounded-lg text-sm font-medium transition-colors">
                      Revoke
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-text-secondary text-sm">
                No alumni found matching "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-8 w-full">
      {/* Header */}
      <section className="relative w-full rounded-xl bg-white p-8 shadow-sm border border-border">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-50 text-text-secondary text-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              <span>Verified Institutional Directory</span>
              <span className="text-border">/</span>
              <span className="font-semibold text-primary">Class of 1961 - 2024</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-text-primary tracking-tight">Discover University Alumni</h1>
            <p className="text-sm text-text-secondary">
              Connect with 4,200+ verified IIT Delhi graduates leading engineering, research, and venture capital across 45+ countries.
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <div className="bg-slate-50 px-4 py-2 rounded-lg text-left border border-border">
              <span className="text-xs text-text-secondary uppercase tracking-wider block">Global Reach</span>
              <span className="text-lg text-text-primary font-semibold">45+ Countries</span>
            </div>
            <div className="bg-slate-50 px-4 py-2 rounded-lg text-left border border-border">
              <span className="text-xs text-text-secondary uppercase tracking-wider block">Active Mentors</span>
              <span className="text-lg text-secondary font-semibold">1,120 Open</span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mt-8">
          <div className="relative flex items-center bg-slate-50 rounded-xl border border-border focus-within:bg-white focus-within:ring-1 focus-within:ring-primary transition-all">
            <Search className="absolute left-4 w-5 h-5 text-text-secondary pointer-events-none" />
            <input 
              type="text" 
              placeholder="Search by name, current company, domain..." 
              className="w-full h-12 pl-12 pr-28 bg-transparent text-sm text-text-primary placeholder-text-secondary focus:outline-none"
            />
            <button className="absolute right-3 px-4 py-1.5 bg-primary text-white text-sm rounded-md hover:bg-primary-hover font-medium">Search</button>
          </div>
        </div>

        {/* Filters */}
        <div className="mt-6 pt-6 border-t border-border flex flex-wrap items-center gap-3">
          {['Batch: 2015-2024', 'Industry: Tech', 'Company: All', 'Location: All', 'Focus: System Design'].map(f => (
            <button key={f} className="h-8 px-3 rounded-md bg-slate-50 border border-border text-sm text-text-primary flex items-center gap-1.5 hover:bg-slate-100 transition-colors">
              <span>{f}</span>
              <ChevronDown className="w-4 h-4 text-text-secondary" />
            </button>
          ))}
          <div className="flex-1"></div>
          <label className="inline-flex items-center gap-2 cursor-pointer bg-slate-50 border border-border px-3 py-1.5 rounded-md hover:bg-slate-100 transition-colors select-none">
            <input type="checkbox" className="w-4 h-4 rounded text-primary focus:ring-0 cursor-pointer accent-primary" />
            <span className="text-sm text-text-primary font-medium flex items-center gap-1">
              Open for 1:1 Mentorship Only
            </span>
          </label>
        </div>
      </section>

      {/* Analytics */}
      <section className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl flex items-center gap-3.5 shadow-sm border border-border">
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-primary shrink-0"><Building className="w-5 h-5" /></div>
          <div className="min-w-0">
            <div className="text-xs text-text-secondary">Top Employer</div>
            <div className="text-sm text-text-primary font-semibold truncate">Google & Microsoft</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl flex items-center gap-3.5 shadow-sm border border-border">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-secondary shrink-0"><Rocket className="w-5 h-5" /></div>
          <div className="min-w-0">
            <div className="text-xs text-text-secondary">Unicorn Founders</div>
            <div className="text-sm text-text-primary font-semibold truncate">42 Founders</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl flex items-center gap-3.5 shadow-sm border border-border">
          <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-text-primary shrink-0"><GraduationCap className="w-5 h-5" /></div>
          <div className="min-w-0">
            <div className="text-xs text-text-secondary">Hostel Cohorts</div>
            <div className="text-sm text-text-primary font-semibold truncate">Nilgiri & Kumaon</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl flex items-center gap-3.5 shadow-sm border border-border">
          <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-primary shrink-0"><MessagesSquare className="w-5 h-5" /></div>
          <div className="min-w-0">
            <div className="text-xs text-text-secondary">Response Rate</div>
            <div className="text-sm text-text-primary font-semibold">91.4% Avg.</div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {alumniList.map(alumni => (
          <article key={alumni.id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 border border-border flex flex-col">
            <div className={`h-16 w-full bg-gradient-to-r ${alumni.color} relative`}></div>
            <div className="p-6 pt-0 flex-1 flex flex-col">
              <div className="flex items-end justify-between -mt-8 mb-3">
                <div className="relative">
                  <div className="w-16 h-16 rounded-xl bg-gray-300 ring-4 ring-white shadow-sm shrink-0"></div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-secondary flex items-center justify-center text-white">
                    <CheckCircle className="w-3 h-3" />
                  </div>
                </div>
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-50 border border-border text-text-secondary text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                  <span>⚡ Responds in ~24 hrs</span>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg text-text-primary font-semibold group-hover:text-primary transition-colors">
                    <Link to={`/alumni/${alumni.id}`}>{alumni.name}</Link>
                  </h3>
                  <span className="text-[11px] text-text-secondary bg-slate-50 border border-border px-1.5 py-0.5 rounded">Alum '{alumni.batch}</span>
                </div>
                <p className="text-sm text-primary font-medium flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-text-secondary" /> {alumni.role} @ {alumni.company}
                </p>
                <p className="text-xs text-text-secondary flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-border" /> {alumni.degree}
                </p>
                <p className="text-xs text-text-secondary flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-border" /> {alumni.location}
                </p>
              </div>
              <div className="mt-4 py-2 px-3 rounded-lg bg-slate-50 border border-border text-xs text-text-secondary">
                <p className="line-clamp-2">{alumni.bio}</p>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {alumni.skills.map(s => (
                  <span key={s} className="px-2 py-0.5 rounded bg-slate-50 border border-border text-text-secondary text-[11px]">{s}</span>
                ))}
              </div>
              <div className="mt-auto pt-6 flex items-center gap-2">
                <Link to={`/alumni/${alumni.id}`} className="flex-1 h-9 px-3 rounded-lg bg-slate-50 border border-border hover:bg-slate-100 text-text-primary text-sm font-medium transition-colors flex items-center justify-center">
                  View Profile
                </Link>
                <button 
                  onClick={() => role !== 'admin' && handleRequest(alumni.id)}
                  disabled={requestedIds.includes(alumni.id)}
                  className={`flex-1 h-9 px-3 rounded-lg text-sm font-medium transition-colors inline-flex items-center justify-center gap-1.5 shadow-sm ${
                    requestedIds.includes(alumni.id) 
                      ? 'bg-slate-200 text-text-secondary cursor-not-allowed border border-transparent' 
                      : 'bg-primary hover:bg-primary-hover text-white'
                  }`}
                >
                  {role === 'alumni' ? (
                    <>
                      <UserPlus className="w-4 h-4" /> {requestedIds.includes(alumni.id) ? 'Pending' : 'Connect'}
                    </>
                  ) : (
                    <>
                      <CalendarPlus className="w-4 h-4" /> {requestedIds.includes(alumni.id) ? 'Requested' : 'Request'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
