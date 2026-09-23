import React from 'react';
import { Search, Users, Mail, Calendar, ExternalLink, Video, ArrowUpRight, BadgeCheck, Clock, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AlumniDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-8 w-full">
      {/* Top Welcome Header */}
      <div className="relative overflow-hidden rounded-xl bg-white p-8 mb-8 shadow-sm border border-border">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2.5">
              <h1 className="font-display text-2xl font-bold text-text-primary">Good morning, Vikramaditya</h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-primary text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                Alum '12 • Principal Engineer
              </span>
            </div>
            <p className="text-sm text-text-secondary flex items-center gap-2">
              <span>Mentorship Profile: <strong className="text-text-primary font-semibold">Open</strong></span>
              <span className="text-border">•</span>
              <span>42 students helped</span>
              <span className="text-border">•</span>
              <span className="text-secondary font-medium">99% response rate</span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-2 lg:pt-0">
            <Link to="/requests" className="h-9 px-3.5 bg-blue-100 hover:bg-primary text-primary hover:text-white rounded text-sm font-medium inline-flex items-center gap-1.5 transition-colors">
              <Mail className="w-4 h-4" /> View Requests
            </Link>
            <button className="h-9 px-3.5 bg-slate-50 hover:bg-slate-100 border border-border text-text-primary rounded text-sm font-medium inline-flex items-center gap-1.5 transition-colors">
              Update Profile
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { title: 'Mentorship Requests', value: '3 Pending', icon: Mail, sub: 'Needs your attention', color: 'text-tertiary-text' },
          { title: 'Upcoming Sessions', value: '1 Scheduled', icon: Calendar, sub: 'Next: Today, 6:30 PM', color: 'text-secondary' },
          { title: 'Profile Views', value: '128', icon: Users, sub: '+12 this week', color: 'text-primary' },
          { title: 'Network Reach', value: '500+', icon: ExternalLink, sub: 'Active connections', color: 'text-blue-600' }
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
                  <h2 className="font-display text-lg font-semibold text-text-primary">Recent Mentorship Requests</h2>
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-primary text-[11px] font-semibold">Action Required</span>
                </div>
              </div>
              <Link to="/requests" className="text-sm text-primary hover:underline flex items-center gap-1 font-medium">
                View all <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="flex flex-col gap-4">
              {/* Request Card Example */}
              <div className="bg-slate-50 hover:bg-slate-100 rounded-xl p-4 transition-all border border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-300 shrink-0"></div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-semibold text-text-primary">Aryan Sharma</h3>
                        <span className="text-sm text-text-secondary font-medium">B.Tech CSE '25</span>
                      </div>
                      <p className="text-sm text-text-primary font-medium mt-1">Focus: <span className="text-primary font-semibold">System Design Prep</span></p>
                      <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        <span className="px-2 py-0.5 rounded bg-slate-200 text-text-primary text-[11px]">SDE 2 Roles</span>
                        <span className="px-2 py-0.5 rounded bg-blue-100 text-primary font-semibold text-[11px]">Interview Prep</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded text-sm font-medium transition-colors">
                      Accept
                    </button>
                    <button className="flex-1 sm:flex-none px-4 py-2 bg-white border border-border hover:bg-slate-50 text-text-secondary rounded text-sm font-medium transition-colors">
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-border">
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase text-secondary">
                <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span> Starts in 4 hours
              </span>
              <Clock className="w-5 h-5 text-text-secondary" />
            </div>
            <h3 className="font-display font-semibold text-text-primary">1:1 Mentorship Session</h3>
            <div className="flex items-center gap-3 my-4 p-3 bg-slate-50 rounded-lg border border-border">
              <div className="w-10 h-10 rounded-full bg-gray-300 shrink-0"></div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-text-primary">Aryan Sharma</span>
                <span className="text-xs text-text-secondary">System Design & Resume Critique</span>
              </div>
            </div>
            <button className="w-full h-10 bg-blue-100 hover:bg-primary text-primary hover:text-white rounded text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
              <Video className="w-5 h-5" /> Start Meeting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
