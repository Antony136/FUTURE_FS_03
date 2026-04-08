import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, User, Calendar, Trash2, CheckCircle, Search, MessageSquare, Info, ArrowLeft, Inbox, Clock, ShieldCheck, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { contactAPI } from '../../api';
import usePageTitle from '../../hooks/usePageTitle';
import { Link } from 'react-router-dom';

const InquiryInbox = () => {
  usePageTitle('Concierge Communications');
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterMode, setFilterMode] = useState('All');

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await contactAPI.getAll();
      setInquiries(res.data.data || res.data || []);
    } catch (err) {
      toast.error('Failed to sync communications.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await contactAPI.markAsRead(id);
      toast.success('Communication marked as reviewed.');
      fetchInquiries();
    } catch (err) {
      toast.error('Failed to update status.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Permanent deletion from the archive. Proceed?')) return;
    try {
      await contactAPI.delete(id);
      toast.success('Inquiry archived permanently.');
      fetchInquiries();
    } catch (err) {
      toast.error('Archive operation failed.');
    }
  };

  const filtered = inquiries.filter(i => {
    const matchesSearch = i.name.toLowerCase().includes(search.toLowerCase()) || i.message.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterMode === 'All' ? true : filterMode === 'Unread' ? !i.isRead : i.isRead;
    return matchesSearch && matchesFilter;
  }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-base)', display: 'flex' }}>
      
      {/* Sidebar Space */}
      <div style={{ width: '80px', flexShrink: 0 }} />

      <div style={{ flex: 1, padding: '3rem 5rem 5rem' }}>
        
        {/* Header Section */}
        <header style={{ marginBottom: '4rem' }}>
          <Link to="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem' }}>
             <ArrowLeft size={14} /> Back to Hub
          </Link>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
             <div>
                <h1 className="font-display" style={{ fontSize: '2.5rem' }}>Communication <span className="text-gradient">Inbox</span></h1>
                <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>Managing concierge inquiries, feedback, and private event requests.</p>
             </div>
             <div style={{ padding: '1rem 1.5rem', background: 'var(--color-bg-elevated)', borderRadius: '12px', border: '1px solid var(--color-border)', display: 'flex', gap: '2rem' }}>
                <div style={{ textAlign: 'center' }}>
                   <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Unread</div>
                   <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--color-primary)' }}>{inquiries.filter(i => !i.isRead).length}</div>
                </div>
                <div style={{ width: '1px', background: 'var(--color-border)' }} />
                <div style={{ textAlign: 'center' }}>
                   <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Total</div>
                   <div style={{ fontSize: '1.25rem', fontWeight: 900 }}>{inquiries.length}</div>
                </div>
             </div>
          </div>
        </header>

        {/* Filters */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', gap: '2rem' }}>
           <div style={{ position: 'relative', flex: 1, maxWidth: '500px' }}>
              <Search size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input 
                type="text" 
                className="form-input" 
                placeholder="Search communications..." 
                style={{ paddingLeft: '3.5rem', borderRadius: '12px' }} 
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
           </div>

           <div style={{ display: 'flex', background: 'var(--color-bg-elevated)', padding: '0.25rem', borderRadius: '10px', border: '1px solid var(--color-border)' }}>
              {['All', 'Unread', 'Reviewed'].map(mode => (
                <button 
                  key={mode}
                  onClick={() => setFilterMode(mode)}
                  style={{ 
                    padding: '0.5rem 1.5rem', 
                    borderRadius: '8px', 
                    fontSize: '0.8rem', 
                    fontWeight: 800, 
                    textTransform: 'uppercase',
                    background: filterMode === mode ? 'var(--color-primary)' : 'transparent',
                    color: filterMode === mode ? 'white' : 'var(--color-text-muted)',
                    border: 'none', cursor: 'pointer', transition: 'all 0.3s'
                  }}
                >
                  {mode}
                </button>
              ))}
           </div>
        </div>

        {/* Message Thread */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
           {loading ? (
              Array(3).fill(0).map((_, i) => <div key={i} className="card" style={{ height: '200px', opacity: 0.5, animation: 'pulse 2s infinite' }} />)
           ) : filtered.length === 0 ? (
              <div style={{ padding: '10rem', textAlign: 'center' }}>
                 <Inbox size={64} color="var(--color-border)" style={{ marginBottom: '2rem' }} />
                 <h2 className="font-display" style={{ fontSize: '1.5rem', color: 'var(--color-text-muted)' }}>The communication channel is currently silent.</h2>
              </div>
           ) : filtered.map((i, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={i._id}
                className="card glass"
                style={{ 
                  padding: '0', 
                  overflow: 'hidden', 
                  border: '1px solid var(--color-border)', 
                  borderLeft: i.isRead ? '1px solid var(--color-border)' : '6px solid var(--color-primary)' 
                }}
              >
                 <div style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                       <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>
                             <User size={24} />
                          </div>
                          <div>
                             <div style={{ fontWeight: 800, fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {i.name} {!i.isRead && <span style={{ width: '8px', height: '8px', background: 'var(--color-primary)', borderRadius: '50%' }} />}
                             </div>
                             <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>{i.email}</div>
                          </div>
                       </div>
                       
                       <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>
                             {new Date(i.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                          </div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)', marginTop: '0.25rem' }}>{i.subject || 'General Inquiry'}</div>
                       </div>
                    </div>

                    <div style={{ background: 'var(--color-bg-elevated)', padding: '1.5rem 2rem', borderRadius: '14px', border: '1px solid var(--color-border)', marginBottom: '1.5rem' }}>
                       <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                          <MessageSquare size={16} color="var(--color-primary)" style={{ marginTop: '4px' }} />
                          <p style={{ fontSize: '1.1rem', color: 'var(--color-text-primary)', lineHeight: 1.6, fontStyle: 'italic' }}>
                             "{i.message}"
                          </p>
                       </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 700 }}>
                          <Clock size={12} /> Received {Math.round((new Date() - new Date(i.createdAt)) / (1000 * 60 * 60 * 24))} days ago
                       </div>
                       <div style={{ display: 'flex', gap: '1rem' }}>
                          {!i.isRead && (
                             <button onClick={() => handleMarkAsRead(i._id)} className="btn btn-ghost btn-sm" style={{ gap: '0.5rem', color: '#059669', border: '1px solid rgba(5, 150, 105, 0.2)' }}>
                                <CheckCircle size={14} /> Resolve Inquiry
                             </button>
                          )}
                          <button onClick={() => handleDelete(i._id)} className="btn btn-ghost btn-sm" style={{ gap: '0.5rem', color: 'var(--color-error)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                             <Trash2 size={14} /> Archive Forever
                          </button>
                       </div>
                    </div>
                 </div>
              </motion.div>
           ))}
        </div>

      </div>

      <style>{`
         @keyframes pulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 0.3; }
         }
      `}</style>
    </div>
  );
};

export default InquiryInbox;
