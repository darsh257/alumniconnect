import React, { useState, useEffect } from 'react';
import { Search, Users, Mail, Calendar, ExternalLink, Video, ArrowUpRight, BadgeCheck, Clock, Share } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { fetchWithAuth } from '../../utils/api';

export default function StudentDashboard() {
  const [requestedIds, setRequestedIds] = useState<number[]>([]);
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    recommendedAlumni: [],
    upcomingSessions: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetchWithAuth('/dashboard/student');
        if (response.ok) {
          const data = await response.json();
          setDashboardData(data);
        }
      } catch (err) {
        console.error("Failed to fetch dashboard", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-8 py-8 w-full">
      {/* Top Welcome Header */}
      <div className="relative overflow-hidden rounded-xl bg-white p-8 mb-8 shadow-sm border border-border">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2.5">
              <h1 className="font-display text-2xl font-bold text-text-primary">Good morning, {user?.name?.split(' ')[0] || 'Student'}</h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-primary text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                Class of 2025 • B.Tech CSE
              </span>
            </div>
            <p className="text-sm text-text-secondary flex items-center gap-2">
              <span>Mentorship Track: <strong className="text-text-primary font-semibold">Active</strong></span>
              <span className="text-border">•</span>
              <span>2 sessions booked this month</span>
              <span className="text-border">•</span>
              <span className="text-secondary font-medium">94% profile completeness</span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-2 lg:pt-0">
            <Link to="/discover" className="h-9 px-3.5 bg-blue-100 hover:bg-primary text-primary hover:text-white rounded text-sm font-medium inline-flex items-center gap-1.5 transition-colors">
              <Search className="w-4 h-4" /> Find a Mentor
            </Link>
            <button className="h-9 px-3.5 bg-slate-50 hover:bg-slate-100 border border-border text-text-primary rounded text-sm font-medium inline-flex items-center gap-1.5 transition-colors">
              <Share className="w-4 h-4 text-primary" /> Browse Referrals
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { title: 'Active Connections', value: '14', icon: Users, sub: '+3 this week', color: 'text-primary' },
          { title: 'Events Attended', value: '4', icon: Calendar, sub: 'This semester', color: 'text-tertiary-text' },
          { title: 'Upcoming Session', value: 'Today, 6:30 PM', icon: Calendar, sub: 'Vikramaditya (Swiggy)', color: 'text-secondary' },
          { title: 'Campus Referrals', value: '5 Active', icon: ExternalLink, sub: '2 New Today', color: 'text-blue-600' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between text-text-secondary mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold">{stat.title}</span>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-display text-2xl font-bold text-text-primary">{stat.value}</span>
            </div>
            <div className="mt-3 pt-2 text-xs text-text-secondary border-t border-border/50">
              {stat.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Main Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
            <div className="flex items-center justify-between pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-lg font-semibold text-text-primary">Recommended Alumni for You</h2>
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-primary text-[11px] font-semibold">Smart Match</span>
                </div>
              </div>
              <Link to="/discover" className="text-sm text-primary hover:underline flex items-center gap-1 font-medium">
                View directory <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="flex flex-col gap-4">
              {loading ? (
                <div className="text-center py-8 text-slate-500">Loading recommendations...</div>
              ) : dashboardData.recommendedAlumni.length > 0 ? (
                dashboardData.recommendedAlumni.map((alumni: any) => (
                <div key={alumni.id} className="bg-slate-50 hover:bg-slate-100 rounded-xl p-4 transition-all border border-border">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gray-300 shrink-0"></div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <h3 className="font-display font-semibold text-text-primary">{alumni.name}</h3>
                          <BadgeCheck className="w-4 h-4 text-secondary" />
                          <span className="text-sm text-text-secondary font-medium">{alumni.batch}</span>
                        </div>
                        <p className="text-sm text-text-primary font-medium mt-1">{alumni.role} • <span className="text-primary font-semibold">{alumni.company}</span></p>
                        <div className="flex flex-wrap items-center gap-1.5 mt-2">
                          {alumni.tags && alumni.tags.map((tag: string) => (
                            <span key={tag} className={`px-2 py-0.5 rounded font-semibold text-[11px] ${tag.includes('Referral') ? 'bg-blue-100 text-primary' : 'bg-slate-200 text-text-primary'}`}>{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => !requestedIds.includes(alumni.id) && setRequestedIds([...requestedIds, alumni.id])}
                      disabled={requestedIds.includes(alumni.id)}
                      className={`w-full sm:w-auto px-4 py-2 rounded text-sm font-medium transition-colors ${
                        requestedIds.includes(alumni.id) 
                          ? 'bg-slate-200 text-text-secondary cursor-not-allowed border border-transparent' 
                          : 'bg-primary hover:bg-primary-hover text-white'
                      }`}
                    >
                      {requestedIds.includes(alumni.id) ? 'Requested' : 'Request'}
                    </button>
                  </div>
                </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-500">No recommendations available at the moment.</div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
            <h2 className="font-display text-lg font-semibold text-text-primary mb-4">Upcoming Sessions</h2>
            <div className="flex flex-col gap-4">
              {loading ? (
                <div className="text-center py-8 text-slate-500">Loading sessions...</div>
              ) : dashboardData.upcomingSessions.length > 0 ? (
                dashboardData.upcomingSessions.map((session: any) => (
                <div key={session.id} className="p-4 bg-slate-50 border border-border rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase ${session.active ? 'text-secondary' : 'text-text-secondary'}`}>
                      {session.active && <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>} 
                      {session.timeInfo}
                    </span>
                    <Clock className="w-4 h-4 text-text-secondary" />
                  </div>
                  <h3 className="font-display font-semibold text-text-primary text-sm">{session.title}</h3>
                  <div className="flex items-center gap-3 mt-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gray-300 shrink-0"></div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-text-primary">{session.host}</span>
                      <span className="text-[10px] text-text-secondary">{session.hostRole}</span>
                    </div>
                  </div>
                  <button className={`w-full h-9 rounded text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
                    session.active 
                      ? 'bg-blue-100 hover:bg-primary text-primary hover:text-white' 
                      : 'bg-white border border-border text-text-primary hover:bg-slate-100'
                  }`}>
                    {session.active ? <><Video className="w-4 h-4" /> Join Meeting Link</> : <><Calendar className="w-4 h-4" /> Add to Calendar</>}
                  </button>
                </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-500">No upcoming sessions.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
