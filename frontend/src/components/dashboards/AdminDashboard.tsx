import React from 'react';
import { Users, ShieldCheck, Activity, AlertTriangle, ArrowRight, UserCheck, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-8 w-full">
      {/* Top Welcome Header */}
      <div className="relative overflow-hidden rounded-xl bg-white p-8 mb-8 shadow-sm border border-border">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2.5">
              <h1 className="font-display text-2xl font-bold text-text-primary">Admin Overview</h1>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-red-700"></span>
                System Administrator
              </span>
            </div>
            <p className="text-sm text-text-secondary flex items-center gap-2">
              <span>Platform Health: <strong className="text-green-600 font-semibold">Optimal</strong></span>
              <span className="text-border">•</span>
              <span>12 Pending Verifications</span>
              <span className="text-border">•</span>
              <span className="text-secondary font-medium">99.9% Uptime</span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-2 lg:pt-0">
            <button className="h-9 px-3.5 bg-blue-100 hover:bg-primary text-primary hover:text-white rounded text-sm font-medium inline-flex items-center gap-1.5 transition-colors">
              <UserCheck className="w-4 h-4" /> Manage Users
            </button>
            <button className="h-9 px-3.5 bg-slate-50 hover:bg-slate-100 border border-border text-text-primary rounded text-sm font-medium inline-flex items-center gap-1.5 transition-colors">
              System Logs
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { title: 'Pending Verifications', value: '12', icon: ShieldCheck, sub: 'Needs review today', color: 'text-tertiary-text' },
          { title: 'Active Users', value: '14,204', icon: Users, sub: '+124 this week', color: 'text-primary' },
          { title: 'System Status', value: 'Healthy', icon: Activity, sub: 'All nodes active', color: 'text-secondary' },
          { title: 'Reported Issues', value: '0', icon: AlertTriangle, sub: 'No active alerts', color: 'text-green-600' }
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
            <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-lg font-semibold text-text-primary">Recent Verification Requests</h2>
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-primary text-[11px] font-semibold">Priority</span>
                </div>
              </div>
              <button className="text-sm text-primary hover:underline flex items-center gap-1 font-medium">
                View all <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex flex-col gap-4">
              {/* Verification Request Card Example */}
              <div className="bg-slate-50 hover:bg-slate-100 rounded-xl p-4 transition-all border border-border">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-primary shrink-0">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-semibold text-text-primary">Siddharth Mehra</h3>
                        <span className="text-xs text-text-secondary bg-white border border-border px-1.5 py-0.5 rounded">ID: 2019CH10342</span>
                      </div>
                      <p className="text-sm text-text-secondary mt-1">Claiming Alumni profile for <span className="text-primary font-medium">B.Tech Chemical Eng '19</span></p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-text-secondary">
                        <ShieldCheck className="w-4 h-4 text-secondary" />
                        <span>DigiLocker NAD Match: <strong>98%</strong></span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded text-sm font-medium transition-colors">
                      Approve
                    </button>
                    <button className="flex-1 sm:flex-none px-4 py-2 bg-white border border-border hover:bg-slate-50 text-text-secondary rounded text-sm font-medium transition-colors">
                      Review
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
            <h3 className="font-display text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
            <div className="flex flex-col gap-3">
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-border hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-blue-50 flex items-center justify-center text-primary">
                    <Search className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-text-primary">User Lookup</span>
                </div>
                <ArrowRight className="w-4 h-4 text-text-secondary" />
              </button>
              <button className="w-full flex items-center justify-between p-3 rounded-lg border border-border hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-emerald-50 flex items-center justify-center text-secondary">
                    <Filter className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium text-text-primary">Export Reports</span>
                </div>
                <ArrowRight className="w-4 h-4 text-text-secondary" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
