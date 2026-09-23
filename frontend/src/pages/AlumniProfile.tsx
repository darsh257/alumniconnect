import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Briefcase, GraduationCap, MapPin, Globe, Clock, Calendar, MessageSquare, Video, ShieldCheck } from 'lucide-react';

export default function AlumniProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // Mock data based on the design
  const profile = {
    name: 'Vikramaditya Roy',
    batch: '12',
    role: 'Principal Engineer',
    company: 'Swiggy',
    degree: 'B.Tech CSE & M.Tech Dual Degree',
    location: 'Bengaluru, India',
    bio: 'Building hyper-local delivery infrastructure processing 2M+ orders/day. Previously Staff SWE at Uber & Amazon. Passionate about system design, microservices, and guiding juniors into principal engineering tracks.',
    skills: ['System Design', 'Microservices', 'Tech Leadership', 'Uber Referral', 'Mock Interviews'],
    availability: 'Open for 1:1 Mentorship',
    responseTime: 'Usually responds in 12-24 hours',
    color: 'from-primary to-primary-hover',
    achievements: [
      'Led Swiggy Instamart launch architecture',
      'President\'s Gold Medalist (IITD 2012)',
      '10+ Patents in Distributed Systems'
    ],
    experience: [
      { role: 'Principal Engineer', company: 'Swiggy', duration: '2021 - Present' },
      { role: 'Staff Software Engineer', company: 'Uber', duration: '2017 - 2021' },
      { role: 'SDE II', company: 'Amazon', duration: '2012 - 2017' }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto px-8 py-8 w-full">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Directory
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        {/* Cover Banner */}
        <div className={`h-32 w-full bg-gradient-to-r ${profile.color} relative`}>
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/30">
              Verified Alum
            </span>
          </div>
        </div>

        <div className="p-8 pt-0">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 -mt-12 mb-6">
            <div className="flex items-end gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-2xl bg-gray-300 ring-4 ring-white shadow-md"></div>
                <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-white ring-2 ring-white">
                  <CheckCircle className="w-4 h-4" />
                </div>
              </div>
              <div className="mb-1">
                <h1 className="font-display text-2xl font-bold text-text-primary">{profile.name}</h1>
                <p className="text-sm text-text-secondary mt-1">Class of 20{profile.batch} • {profile.degree}</p>
              </div>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none h-10 px-4 rounded-lg bg-slate-50 hover:bg-slate-100 border border-border text-text-primary font-medium flex items-center justify-center gap-2 transition-colors">
                <MessageSquare className="w-4 h-4" /> Message
              </button>
              <button onClick={() => setShowModal(true)} className="flex-1 md:flex-none h-10 px-6 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium flex items-center justify-center gap-2 shadow-sm transition-colors">
                <Calendar className="w-4 h-4" /> Request Mentorship
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              {/* About Section */}
              <section>
                <h2 className="font-display text-lg font-semibold text-text-primary mb-3">About</h2>
                <p className="text-sm text-text-secondary leading-relaxed bg-slate-50 p-4 rounded-lg border border-border">
                  {profile.bio}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {profile.skills.map(s => (
                    <span key={s} className="px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-primary text-xs font-medium">{s}</span>
                  ))}
                </div>
              </section>

              {/* Experience Section */}
              <section>
                <h2 className="font-display text-lg font-semibold text-text-primary mb-3">Experience History</h2>
                <div className="space-y-4">
                  {profile.experience.map((exp, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-lg border border-border hover:border-slate-300 transition-colors">
                      <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center shrink-0">
                        <Briefcase className="w-5 h-5 text-text-secondary" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-text-primary">{exp.role}</h4>
                        <div className="flex items-center gap-2 text-xs text-text-secondary mt-1">
                          <span className="font-medium text-primary">{exp.company}</span>
                          <span>•</span>
                          <span>{exp.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-6">
              {/* Mentorship Stats */}
              <div className="bg-slate-50 p-5 rounded-xl border border-border space-y-4">
                <h3 className="font-display text-base font-semibold text-text-primary">Mentorship Status</h3>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-secondary shrink-0">
                    <Video className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="block font-medium text-text-primary">{profile.availability}</span>
                    <span className="text-xs text-text-secondary">Available for 1:1 sessions</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-primary shrink-0">
                    <Clock className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="block font-medium text-text-primary">Highly Responsive</span>
                    <span className="text-xs text-text-secondary">{profile.responseTime}</span>
                  </div>
                </div>
              </div>

              {/* Key Highlights */}
              <div className="bg-slate-50 p-5 rounded-xl border border-border space-y-3">
                <h3 className="font-display text-base font-semibold text-text-primary">Key Highlights</h3>
                <ul className="space-y-2">
                  {profile.achievements.map((ach, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                      <ShieldCheck className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <button className="w-full h-10 rounded-lg border border-border text-text-secondary hover:text-text-primary flex items-center justify-center gap-2 text-sm font-medium transition-colors">
                <Globe className="w-4 h-4" /> View LinkedIn Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mock Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-text-primary/50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="font-display text-xl font-bold text-text-primary">Request Mentorship</h2>
              <p className="text-sm text-text-secondary mt-1">Send a request to Vikramaditya Roy</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-1">Focus Area</label>
                <select className="w-full h-10 px-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary">
                  <option>System Design Prep</option>
                  <option>Career Guidance</option>
                  <option>Mock Interview</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-1">Message</label>
                <textarea 
                  rows={4} 
                  className="w-full p-3 rounded-lg border border-border text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Briefly describe what you'd like to discuss..."
                ></textarea>
              </div>
            </div>
            <div className="p-6 border-t border-border bg-slate-50 flex items-center justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary">Cancel</button>
              <button onClick={() => { alert('Request Sent!'); setShowModal(false); }} className="px-6 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-medium rounded-lg">Send Request</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
