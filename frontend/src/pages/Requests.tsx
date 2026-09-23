import React, { useState } from 'react';
import { Mail, CheckCircle, XCircle, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Requests() {
  const [activeTab, setActiveTab] = useState<'pending' | 'accepted' | 'declined'>('pending');

  const requests = [
    {
      id: '1',
      studentName: 'Aryan Sharma',
      degree: 'B.Tech CSE \'25',
      focus: 'System Design Prep',
      message: 'Hi Vikramaditya, I am preparing for my upcoming interviews and would love to get your insights on system design rounds for SDE 2 roles.',
      status: 'pending',
      date: 'Today, 10:30 AM'
    },
    {
      id: '2',
      studentName: 'Sneha Patel',
      degree: 'M.Tech AI \'24',
      focus: 'Career Guidance',
      message: 'I am confused between pursuing a PhD vs joining industry as a ML Engineer. Would appreciate a 15-min chat.',
      status: 'accepted',
      date: 'Yesterday'
    }
  ];

  const filteredRequests = requests.filter(r => r.status === activeTab);

  return (
    <div className="max-w-5xl mx-auto px-8 py-8 w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-text-primary">Requests Management</h1>
          <p className="text-sm text-text-secondary mt-1">Manage your incoming mentorship and connection requests.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="border-b border-border flex items-center px-4 overflow-x-auto">
          {[
            { id: 'pending', label: 'Pending Requests', count: 1 },
            { id: 'accepted', label: 'Accepted', count: 1 },
            { id: 'declined', label: 'Declined', count: 0 }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeTab === tab.id 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab.label}
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === tab.id ? 'bg-blue-100 text-primary' : 'bg-slate-100 text-text-secondary'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="p-6 bg-slate-50 border-b border-border flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 w-4 h-4 text-text-secondary pointer-events-none" />
            <input 
              type="text" 
              placeholder="Search by name, focus..." 
              className="w-full h-9 pl-9 pr-4 bg-white border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </div>
          <button className="h-9 px-3 border border-border bg-white rounded-lg text-sm text-text-secondary flex items-center gap-2 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>

        <div className="divide-y divide-border">
          {filteredRequests.length === 0 ? (
            <div className="p-12 flex flex-col items-center justify-center text-center">
              <Mail className="w-12 h-12 text-slate-300 mb-3" />
              <h3 className="font-display font-medium text-text-primary">No {activeTab} requests</h3>
              <p className="text-sm text-text-secondary mt-1">You're all caught up for now.</p>
            </div>
          ) : (
            filteredRequests.map(req => (
              <div key={req.id} className="p-6 flex flex-col sm:flex-row gap-6 hover:bg-slate-50 transition-colors">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                      <div>
                        <h4 className="font-semibold text-text-primary text-sm">{req.studentName}</h4>
                        <p className="text-xs text-text-secondary">{req.degree} • <span className="text-primary font-medium">{req.focus}</span></p>
                      </div>
                    </div>
                    <span className="text-xs text-text-secondary whitespace-nowrap">{req.date}</span>
                  </div>
                  <div className="bg-white border border-border p-3 rounded-lg">
                    <p className="text-sm text-text-secondary italic">"{req.message}"</p>
                  </div>
                </div>
                
                {activeTab === 'pending' && (
                  <div className="flex sm:flex-col gap-2 shrink-0">
                    <button className="flex-1 sm:flex-none h-9 px-6 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium flex items-center justify-center gap-1.5 transition-colors">
                      <CheckCircle className="w-4 h-4" /> Accept
                    </button>
                    <button className="flex-1 sm:flex-none h-9 px-6 border border-border bg-white hover:bg-slate-100 text-text-secondary hover:text-red-600 rounded-lg text-sm font-medium flex items-center justify-center gap-1.5 transition-colors">
                      <XCircle className="w-4 h-4" /> Decline
                    </button>
                  </div>
                )}
                
                {activeTab === 'accepted' && (
                  <div className="flex sm:flex-col gap-2 shrink-0 justify-center">
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                      <CheckCircle className="w-4 h-4" /> Accepted
                    </span>
                    <button className="h-9 px-4 border border-border bg-white hover:bg-slate-100 text-text-primary rounded-lg text-sm font-medium transition-colors">
                      Schedule Meet
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
