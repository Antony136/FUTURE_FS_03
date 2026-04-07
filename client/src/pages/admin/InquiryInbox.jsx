import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, Calendar, Trash2, CheckCircle, Search, MessageSquare, Info } from 'lucide-react';
import toast from 'react-hot-toast';
import { contactAPI } from '../../api';
import usePageTitle from '../../hooks/usePageTitle';
import { Link } from 'react-router-dom';

const InquiryInbox = () => {
  usePageTitle('Inquiries');
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await contactAPI.getAll();
      setInquiries(res.data.data || res.data || []);
    } catch (err) {
      toast.error('Failed to load inquiries.');
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
      toast.success('Marked as read.');
      fetchInquiries();
    } catch (err) {
      toast.error('Failed to update.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this inquiry?')) return;
    try {
      await contactAPI.delete(id);
      toast.success('Inquiry removed.');
      fetchInquiries();
    } catch (err) {
      toast.error('Failed to delete.');
    }
  };

  const filtered = inquiries.filter(i => 
    i.name.toLowerCase().includes(search.toLowerCase()) ||
    i.subject.toLowerCase().includes(search.toLowerCase()) ||
    i.message.toLowerCase().includes(search.toLowerCase())
  ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-base)', padding: '2rem' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div>
            <Link to="/admin" style={{ color: 'var(--color-gold-500)', fontSize: '0.8rem', textDecoration: 'none', marginBottom: '0.5rem', display: 'block' }}>← Back to Dashboard</Link>
            <h1 style={{ fontSize: '1.75rem' }}>Inquiries Inbox</h1>
          </div>
          <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            {inquiries.filter(i => !i.isRead).length} unread
          </div>
        </div>

        {/* Search */}
        <div className="card" style={{ padding: '1rem', marginBottom: '2rem' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search messages..." 
              style={{ paddingLeft: '2.5rem' }} 
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {loading ? (
            <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading inquiries...</div>
          ) : filtered.length === 0 ? (
            <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>No messages in your inbox.</div>
          ) : filtered.map(i => (
            <motion.div
              layout
              key={i._id}
              className="card"
              style={{ 
                padding: '1.5rem', 
                borderLeft: i.isRead ? '1px solid var(--color-border)' : '4px solid var(--color-gold-500)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {!i.isRead && (
                <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--color-gold-500)', color: '#000', fontSize: '10px', fontWeight: 900, padding: '2px 8px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>NEW</div>
              )}

              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold-400)', border: '1px solid var(--color-border)' }}>
                    <User size={24} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-text-primary)' }}>{i.name}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Mail size={12} className="text-gradient" /> {i.email}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Calendar size={13} /> {new Date(i.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span style={{ opacity: 0.3 }}>|</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Info size={13} /> {i.subject || 'General Inquiry'}
                  </span>
                </div>
              </div>

              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <MessageSquare size={14} style={{ color: 'var(--color-gold-500)' }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-gold-500)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Message Content</span>
                </div>
                <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, margin: 0, fontStyle: 'italic' }}>"{i.message}"</p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                {!i.isRead && (
                  <button onClick={() => handleMarkAsRead(i._id)} className="btn btn-ghost btn-sm" style={{ gap: '0.5rem', borderColor: 'var(--color-success)33', color: 'var(--color-success)' }}>
                    <CheckCircle size={15} /> Mark as Read
                  </button>
                )}
                <button onClick={() => handleDelete(i._id)} className="btn btn-ghost btn-sm" style={{ color: 'var(--color-error)', gap: '0.5rem', borderColor: 'var(--color-error)33' }}>
                  <Trash2 size={15} /> Delete Inquiry
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default InquiryInbox;
