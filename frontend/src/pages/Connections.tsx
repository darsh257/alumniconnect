import React, { useState, useEffect } from 'react';
import { Search, UserCheck, MessageSquare, MoreVertical, Briefcase, GraduationCap, X, Send } from 'lucide-react';

export default function Connections() {
  const [role, setRole] = useState<string>('student');
  const [activeTab, setActiveTab] = useState<'alumni' | 'students'>('alumni');
  const [selectedMessageConnection, setSelectedMessageConnection] = useState<any>(null);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const alumniConnections = [
    { id: 1, name: 'Divya Nair', role: 'Principal Researcher', company: 'Microsoft Research', type: 'Alumni', status: 'Connected 2 days ago' },
    { id: 2, name: 'Meera Venkatesh', role: 'Partner', company: 'Peak XV Partners', type: 'Alumni', status: 'Connected 1 month ago' },
    { id: 5, name: 'Karthik Raja', role: 'Engineering Manager', company: 'Stripe', type: 'Alumni', status: 'Connected 3 months ago' },
    { id: 6, name: 'Ananya Sharma', role: 'Senior Product Manager', company: 'Airbnb', type: 'Alumni', status: 'Connected 5 months ago' },
    { id: 7, name: 'Vikram Singh', role: 'Data Scientist', company: 'Google', type: 'Alumni', status: 'Connected 1 year ago' },
  ];

  const studentConnections = [
    { id: 3, name: 'Aryan Sharma', role: 'B.Tech CSE \'25', company: 'IIT Delhi', type: 'Student', status: 'Mentorship Active' },
    { id: 4, name: 'Sneha Patel', role: 'M.Tech AI \'24', company: 'IIT Delhi', type: 'Student', status: 'Mentorship Completed' },
    { id: 8, name: 'Rohan Gupta', role: 'B.Tech IT \'26', company: 'BIT', type: 'Student', status: 'Pending Request' },
    { id: 9, name: 'Priya Desai', role: 'B.Tech ECE \'25', company: 'BIT', type: 'Student', status: 'Mentorship Active' },
    { id: 10, name: 'Kavya Reddy', role: 'M.Tech Data Science \'24', company: 'BIT', type: 'Student', status: 'Connected 2 weeks ago' },
  ];

  const connections = role === 'alumni' 
    ? (activeTab === 'alumni' ? alumniConnections : studentConnections)
    : [...alumniConnections, ...studentConnections];

  return (
    <div className="max-w-5xl mx-auto px-8 py-8 w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-text-primary">Your Connections</h1>
          <p className="text-sm text-text-secondary mt-1">Manage your network and active mentorships.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        {/* Conditional Tabs for Alumni */}
        {role === 'alumni' && (
          <div className="border-b border-border flex items-center px-4 overflow-x-auto">
            <button 
              onClick={() => setActiveTab('alumni')}
              className={`px-4 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeTab === 'alumni' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              Alumni Connections
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === 'alumni' ? 'bg-blue-100 text-primary' : 'bg-slate-100 text-text-secondary'}`}>
                {alumniConnections.length}
              </span>
            </button>
            <button 
              onClick={() => setActiveTab('students')}
              className={`px-4 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                activeTab === 'students' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              Student Connections
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${activeTab === 'students' ? 'bg-blue-100 text-primary' : 'bg-slate-100 text-text-secondary'}`}>
                {studentConnections.length}
              </span>
            </button>
          </div>
        )}

        <div className="p-6 bg-slate-50 border-b border-border flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 w-4 h-4 text-text-secondary pointer-events-none" />
            <input 
              type="text" 
              placeholder="Search connections..." 
              className="w-full h-9 pl-9 pr-4 bg-white border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className="divide-y divide-border">
          {connections.length === 0 ? (
            <div className="p-12 flex flex-col items-center justify-center text-center">
              <UserCheck className="w-12 h-12 text-slate-300 mb-3" />
              <h3 className="font-display font-medium text-text-primary">No connections yet</h3>
              <p className="text-sm text-text-secondary mt-1">Start networking in the Discover tab.</p>
            </div>
          ) : (
            connections.map(conn => (
              <div key={conn.id} className="p-6 flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-300 shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-text-primary text-base">{conn.name}</h4>
                    <div className="flex items-center gap-1.5 text-xs text-text-secondary mt-0.5">
                      {conn.type === 'Alumni' ? <Briefcase className="w-3 h-3 text-border" /> : <GraduationCap className="w-3 h-3 text-border" />}
                      <span>{conn.role} • {conn.company}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="hidden sm:inline-block text-xs text-text-secondary">{conn.status}</span>
                  <button 
                    onClick={() => setSelectedMessageConnection(conn)}
                    className="h-9 px-4 bg-white border border-border hover:bg-slate-50 text-text-primary rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-text-secondary" /> <span className="hidden sm:inline">Message</span>
                  </button>
                  <button className="w-9 h-9 flex items-center justify-center rounded-lg text-text-secondary hover:bg-slate-100 transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Message Modal Overlay */}
      {selectedMessageConnection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedMessageConnection(null)}>
          <div 
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-text-secondary font-medium">
                  {selectedMessageConnection.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary text-sm">{selectedMessageConnection.name}</h3>
                  <p className="text-xs text-text-secondary">{selectedMessageConnection.role}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedMessageConnection(null)}
                className="p-2 text-text-secondary hover:text-text-primary hover:bg-slate-200 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Chat Body (Mock) */}
            <div className="h-64 bg-white p-4 overflow-y-auto flex flex-col gap-4">
              <div className="flex justify-center">
                <span className="text-[10px] uppercase font-semibold text-text-secondary tracking-wider bg-slate-100 px-2 py-1 rounded-full">
                  Today
                </span>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0"></div>
                <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-none text-sm text-text-primary max-w-[80%]">
                  Hi! I noticed we both went to BIT. I'd love to connect and learn more about your experience at {selectedMessageConnection.company}.
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-border flex items-center gap-2">
              <input 
                type="text" 
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder={`Message ${selectedMessageConnection.name.split(' ')[0]}...`}
                className="flex-1 h-10 px-4 bg-slate-50 border border-border rounded-full text-sm focus:outline-none focus:border-primary focus:bg-white transition-colors"
              />
              <button 
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                  messageText.trim() ? 'bg-primary text-white hover:bg-primary-hover shadow-sm' : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
