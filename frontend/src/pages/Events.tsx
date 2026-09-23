import React, { useEffect, useState } from 'react';
import { Calendar, Briefcase, Plus, MapPin, ExternalLink, Users, Clock, X } from 'lucide-react';

export default function Events() {
  const [role, setRole] = useState<string>('student');
  const [activeTab, setActiveTab] = useState<'events' | 'opportunities'>('opportunities');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [itemType, setItemType] = useState<'event' | 'opportunity' | null>(null);
  
  const [isPosting, setIsPosting] = useState(false);
  const [postType, setPostType] = useState<'opportunity' | 'event'>('opportunity');
  const [formData, setFormData] = useState({
    title: '', company: '', location: '', type: 'Full-time', date: '', time: '', link: ''
  });

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const [opportunities, setOpportunities] = useState([
    { id: 1, title: 'Software Engineer - New Grad 2025', company: 'Google', location: 'Bengaluru, India', type: 'Full-time', postedBy: 'Neha Sharma (Alum \'19)' },
    { id: 2, title: 'Product Management Intern', company: 'Zerodha', location: 'Remote', type: 'Internship', postedBy: 'Pooja Agarwal (Alum \'17)' },
    { id: 3, title: 'Data Scientist', company: 'Microsoft', location: 'Hyderabad, India', type: 'Full-time', postedBy: 'Rahul Verma (Alum \'15)' },
    { id: 4, title: 'Frontend Developer', company: 'Atlassian', location: 'Remote', type: 'Contract', postedBy: 'Kavya Singh (Alum \'21)' },
    { id: 5, title: 'UX Research Intern', company: 'Swiggy', location: 'Bengaluru, India', type: 'Internship', postedBy: 'Aryan Patel (Alum \'20)' },
  ]);

  const [events, setEvents] = useState([
    { id: 1, title: 'System Design Interview Masterclass', date: 'Oct 15, 2026', time: '6:00 PM IST', type: 'Webinar', attendees: 120, postedBy: 'Vikramaditya Roy' },
    { id: 2, title: 'Annual Alumni Meetup - Bay Area Chapter', date: 'Nov 2, 2026', time: '10:00 AM PST', type: 'In-Person', attendees: 45, postedBy: 'Alumni Association' },
    { id: 3, title: 'Resume Review Workshop', date: 'Oct 20, 2026', time: '5:00 PM IST', type: 'Virtual Workshop', attendees: 85, postedBy: 'Career Services' },
    { id: 4, title: 'Founders & Investors Networking Mixer', date: 'Dec 5, 2026', time: '7:00 PM IST', type: 'In-Person', attendees: 200, postedBy: 'BIT E-Cell' },
    { id: 5, title: 'Cracking Product Management', date: 'Nov 12, 2026', time: '8:00 PM IST', type: 'Fireside Chat', attendees: 150, postedBy: 'Pooja Agarwal' },
  ]);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postType === 'opportunity') {
      setOpportunities([...opportunities, {
        id: Date.now(),
        title: formData.title,
        company: formData.company,
        location: formData.location,
        type: formData.type,
        postedBy: 'You',
        link: formData.link
      }]);
    } else {
      setEvents([...events, {
        id: Date.now(),
        title: formData.title,
        date: formData.date,
        time: formData.time,
        type: formData.type,
        attendees: 0,
        postedBy: 'You',
        link: formData.link
      }]);
    }
    setIsPosting(false);
    setFormData({ title: '', company: '', location: '', type: 'Full-time', date: '', time: '', link: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-8 py-8 w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-text-primary">Events & Opportunities</h1>
          <p className="text-sm text-text-secondary mt-1">Discover exclusive job referrals and community events hosted by alumni.</p>
        </div>
        
        {/* Only Alumni can post new events/opportunities */}
        {role === 'alumni' && (
          <button 
            onClick={() => setIsPosting(true)}
            className="h-10 px-4 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-4 h-4" /> Post New
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
        <div className="border-b border-border flex items-center px-4">
          <button 
            onClick={() => setActiveTab('opportunities')}
            className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'opportunities' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            <Briefcase className="w-4 h-4" /> Career Opportunities
          </button>
          <button 
            onClick={() => setActiveTab('events')}
            className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'events' ? 'border-primary text-primary' : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
          >
            <Calendar className="w-4 h-4" /> Upcoming Events
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTab === 'opportunities' ? (
              opportunities.map(opp => (
                <div 
                  key={opp.id} 
                  onClick={() => { setSelectedItem(opp); setItemType('opportunity'); }}
                  className="bg-slate-50 border border-border rounded-xl p-5 hover:border-primary/30 transition-colors flex flex-col h-full cursor-pointer"
                >
                  <div className="mb-4">
                    <h3 className="font-display font-semibold text-text-primary text-lg leading-tight">{opp.title}</h3>
                    <p className="text-primary font-medium text-sm mt-1">{opp.company}</p>
                  </div>
                  <div className="space-y-2 mt-auto mb-6">
                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                      <MapPin className="w-3.5 h-3.5" /> {opp.location}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                      <Briefcase className="w-3.5 h-3.5" /> {opp.type}
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border mt-auto flex items-center justify-between">
                    <div className="text-[11px] text-text-secondary">
                      Posted by <span className="font-medium text-text-primary">{opp.postedBy}</span>
                    </div>
                    {role === 'admin' ? (
                      <button 
                        onClick={(e) => e.stopPropagation()}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    ) : (
                      <button 
                        onClick={(e) => e.stopPropagation()}
                        className="text-primary hover:text-primary-hover text-sm font-medium flex items-center gap-1"
                      >
                        Apply <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              events.map(event => (
                <div 
                  key={event.id} 
                  onClick={() => { setSelectedItem(event); setItemType('event'); }}
                  className="bg-slate-50 border border-border rounded-xl p-5 hover:border-primary/30 transition-colors flex flex-col h-full cursor-pointer"
                >
                  <div className="mb-4">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-primary mb-2 uppercase tracking-wide">
                      {event.type}
                    </span>
                    <h3 className="font-display font-semibold text-text-primary text-lg leading-tight">{event.title}</h3>
                  </div>
                  <div className="space-y-2 mt-auto mb-6">
                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                      <Calendar className="w-3.5 h-3.5" /> {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                      <Clock className="w-3.5 h-3.5" /> {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                      <Users className="w-3.5 h-3.5" /> {event.attendees} attending
                    </div>
                  </div>
                  <div className="pt-4 border-t border-border mt-auto flex items-center justify-between">
                    <div className="text-[11px] text-text-secondary">
                      Host: <span className="font-medium text-text-primary">{event.postedBy}</span>
                    </div>
                    {role === 'admin' ? (
                      <button 
                        onClick={(e) => e.stopPropagation()}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    ) : (
                      <button 
                        onClick={(e) => e.stopPropagation()}
                        className="text-primary hover:text-primary-hover text-sm font-medium"
                      >
                        Register
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedItem(null)}>
          <div 
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 pb-4 border-b border-border flex items-start justify-between">
              <div>
                {itemType === 'event' && (
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-primary mb-2 uppercase tracking-wide">
                    {selectedItem.type}
                  </span>
                )}
                <h2 className="font-display font-bold text-xl text-text-primary leading-tight">
                  {selectedItem.title}
                </h2>
                {itemType === 'opportunity' && (
                  <p className="text-primary font-medium mt-1">{selectedItem.company}</p>
                )}
              </div>
              <button 
                onClick={() => setSelectedItem(null)}
                className="p-2 -mr-2 -mt-2 text-text-secondary hover:text-text-primary hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-border space-y-3">
                {itemType === 'opportunity' ? (
                  <>
                    <div className="flex items-center gap-3 text-sm text-text-secondary">
                      <MapPin className="w-4 h-4 text-primary" /> {selectedItem.location}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-text-secondary">
                      <Briefcase className="w-4 h-4 text-primary" /> {selectedItem.type}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3 text-sm text-text-secondary">
                      <Calendar className="w-4 h-4 text-primary" /> {selectedItem.date}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-text-secondary">
                      <Clock className="w-4 h-4 text-primary" /> {selectedItem.time}
                    </div>
                    <div className="flex items-center gap-3 text-sm text-text-secondary">
                      <Users className="w-4 h-4 text-primary" /> {selectedItem.attendees} attending
                    </div>
                  </>
                )}
              </div>

              <div>
                <h3 className="text-sm font-semibold text-text-primary mb-2">Description</h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Join us for this exciting {itemType === 'event' ? 'event' : 'opportunity'}. 
                  This is a great chance to connect, learn, and grow your career. More detailed description would go here in a real application.
                </p>
              </div>
            </div>

            <div className="p-6 pt-4 border-t border-border bg-slate-50 flex items-center justify-between mt-auto">
              <div className="text-xs text-text-secondary">
                {itemType === 'opportunity' ? 'Posted by' : 'Host'}: <span className="font-medium text-text-primary">{selectedItem.postedBy}</span>
              </div>
              {role === 'admin' ? (
                <button className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors shadow-sm">
                  Remove {itemType === 'event' ? 'Event' : 'Opportunity'}
                </button>
              ) : (
                <button className="px-5 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-1.5">
                  {itemType === 'opportunity' ? (
                    <>Apply Now <ExternalLink className="w-4 h-4" /></>
                  ) : (
                    'Register Now'
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Post New Modal */}
      {isPosting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsPosting(false)}>
          <div 
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 pb-4 border-b border-border flex items-start justify-between">
              <div>
                <h2 className="font-display font-bold text-xl text-text-primary leading-tight">
                  Create a New Post
                </h2>
                <p className="text-sm text-text-secondary mt-1">Share an opportunity or organize an event for the community.</p>
              </div>
              <button 
                onClick={() => setIsPosting(false)}
                className="p-2 -mr-2 -mt-2 text-text-secondary hover:text-text-primary hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handlePostSubmit}>
              <div className="p-6 space-y-4">
                <div className="flex gap-4">
                  <label className="flex-1 cursor-pointer">
                    <input type="radio" name="postType" value="opportunity" checked={postType === 'opportunity'} onChange={() => setPostType('opportunity')} className="peer sr-only" />
                    <div className="rounded-xl border border-border p-3 text-center hover:bg-slate-50 peer-checked:border-primary peer-checked:bg-blue-50 peer-checked:text-primary transition-colors">
                      <Briefcase className="w-5 h-5 mx-auto mb-1" />
                      <span className="text-sm font-medium">Opportunity</span>
                    </div>
                  </label>
                  <label className="flex-1 cursor-pointer">
                    <input type="radio" name="postType" value="event" checked={postType === 'event'} onChange={() => setPostType('event')} className="peer sr-only" />
                    <div className="rounded-xl border border-border p-3 text-center hover:bg-slate-50 peer-checked:border-primary peer-checked:bg-blue-50 peer-checked:text-primary transition-colors">
                      <Calendar className="w-5 h-5 mx-auto mb-1" />
                      <span className="text-sm font-medium">Event</span>
                    </div>
                  </label>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-text-primary mb-1">Title</label>
                    <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full h-10 px-3 bg-white border border-border rounded-lg text-sm focus:outline-none focus:border-primary" placeholder={postType === 'opportunity' ? "e.g. Software Engineer Role" : "e.g. Technical Interview Prep"} />
                  </div>
                  
                  {postType === 'opportunity' ? (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-text-primary mb-1">Company</label>
                          <input required type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full h-10 px-3 bg-white border border-border rounded-lg text-sm focus:outline-none focus:border-primary" placeholder="e.g. Google" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-text-primary mb-1">Type</label>
                          <select required value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full h-10 px-3 bg-white border border-border rounded-lg text-sm focus:outline-none focus:border-primary">
                            <option>Full-time</option>
                            <option>Internship</option>
                            <option>Part-time</option>
                            <option>Contract</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-text-primary mb-1">Location</label>
                        <input required type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full h-10 px-3 bg-white border border-border rounded-lg text-sm focus:outline-none focus:border-primary" placeholder="e.g. Bengaluru, India or Remote" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-text-primary mb-1">Date</label>
                          <input required type="text" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full h-10 px-3 bg-white border border-border rounded-lg text-sm focus:outline-none focus:border-primary" placeholder="e.g. Nov 15, 2026" />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-text-primary mb-1">Time</label>
                          <input required type="text" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="w-full h-10 px-3 bg-white border border-border rounded-lg text-sm focus:outline-none focus:border-primary" placeholder="e.g. 6:00 PM IST" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-text-primary mb-1">Type / Location</label>
                        <input required type="text" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full h-10 px-3 bg-white border border-border rounded-lg text-sm focus:outline-none focus:border-primary" placeholder="e.g. Webinar, In-Person (Mumbai)" />
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-text-primary mb-1">Link to Apply / Register</label>
                    <input type="url" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} className="w-full h-10 px-3 bg-white border border-border rounded-lg text-sm focus:outline-none focus:border-primary" placeholder="https://..." />
                  </div>
                </div>
              </div>

              <div className="p-6 pt-4 border-t border-border bg-slate-50 flex items-center justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setIsPosting(false)}
                  className="px-4 py-2 text-text-secondary hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-primary hover:bg-primary-hover text-white rounded-lg text-sm font-medium transition-colors shadow-sm"
                >
                  Post {postType === 'opportunity' ? 'Opportunity' : 'Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
