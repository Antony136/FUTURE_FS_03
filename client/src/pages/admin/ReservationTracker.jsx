import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, Phone, Mail, Clock, CheckCircle2, XCircle, Trash2, Search, Filter, ArrowUpDown, ChevronRight, MessageSquare, User, Hash, Info, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { reservationAPI } from '../../api';
import usePageTitle from '../../hooks/usePageTitle';
import { Link } from 'react-router-dom';

const ReservationTracker = () => {
  usePageTitle('Concierge Ledger — Reservations');
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const res = await reservationAPI.getAll();
      setReservations(res.data.data || res.data || []);
    } catch (err) {
      toast.error('Failed to sync guest arrivals.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await reservationAPI.updateStatus(id, status);
      toast.success(`Reservation status marked as ${status}.`);
      fetchReservations();
    } catch (err) {
      toast.error('Failed to update arrival status.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Permanent deletion from the ledger. Continue?')) return;
    try {
      await reservationAPI.delete(id);
      toast.success('Ledger entry removed.');
      fetchReservations();
    } catch (err) {
      toast.error('Deletion failed.');
    }
  };

  const filtered = reservations.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.phone.includes(search);
    const matchesStatus = filterStatus === 'All' || r.status === filterStatus;
    return matchesSearch && matchesStatus;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

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
                <h1 className="font-display" style={{ fontSize: '2.5rem' }}>Guest <span className="text-gradient">Ledger</span></h1>
                <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>Overseeing {reservations.length} upcoming arrivals and dining arrangements.</p>
             </div>
             <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ padding: '1rem 1.5rem', background: 'var(--color-bg-elevated)', borderRadius: '12px', border: '1px solid var(--color-border)', textAlign: 'right' }}>
                   <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Confirmatory Rate</div>
                   <div style={{ fontSize: '1.25rem', fontWeight: 900 }}>{Math.round((reservations.filter(r => r.status === 'confirmed').length / (reservations.length || 1)) * 100)}%</div>
                </div>
             </div>
          </div>
        </header>

        {/* Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', gap: '2rem' }}>
           <div style={{ position: 'relative', flex: 1, maxWidth: '500px' }}>
              <Search size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input 
                type="text" 
                className="form-input" 
                placeholder="Search guest or contact..." 
                style={{ paddingLeft: '3.5rem', borderRadius: '12px' }} 
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
           </div>

           <div style={{ display: 'flex', background: 'var(--color-bg-elevated)', padding: '0.25rem', borderRadius: '10px', border: '1px solid var(--color-border)' }}>
              {['All', 'pending', 'confirmed', 'cancelled'].map(status => (
                <button 
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  style={{ 
                    padding: '0.5rem 1rem', 
                    borderRadius: '8px', 
                    fontSize: '0.8rem', 
                    fontWeight: 800, 
                    textTransform: 'uppercase',
                    background: filterStatus === status ? 'var(--color-primary)' : 'transparent',
                    color: filterStatus === status ? 'white' : 'var(--color-text-muted)',
                    border: 'none', cursor: 'pointer', transition: 'all 0.3s'
                  }}
                >
                  {status}
                </button>
              ))}
           </div>
        </div>

        {/* Ledger Entries */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
           {loading ? (
              Array(4).fill(0).map((_, i) => <div key={i} className="card" style={{ height: '120px', animation: 'pulse 2s infinite' }} />)
           ) : filtered.length === 0 ? (
              <div style={{ padding: '10rem', textAlign: 'center' }}>
                 <Calendar size={64} color="var(--color-border)" style={{ marginBottom: '2rem' }} />
                 <h2 className="font-display" style={{ fontSize: '1.5rem', color: 'var(--color-text-muted)' }}>The ledger is currently clear for these parameters.</h2>
              </div>
           ) : filtered.map((r, i) => (
              <motion.div
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                key={r._id}
                className="card glass hover-card"
                style={{ padding: '0', overflow: 'hidden', border: '1px solid var(--color-border)' }}
              >
                <div style={{ display: 'flex', alignItems: 'stretch' }}>
                   
                   {/* Date Profile Side */}
                   <div style={{ padding: '2rem', background: 'var(--color-bg-elevated)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: '140px', borderRight: '1px solid var(--color-border)' }}>
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--color-primary)', textTransform: 'uppercase' }}>{new Date(r.date).toLocaleDateString(undefined, { month: 'short' })}</div>
                      <div style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1 }}>{new Date(r.date).getDate()}</div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>{new Date(r.date).toLocaleDateString(undefined, { weekday: 'short' }).toUpperCase()}</div>
                   </div>

                   {/* Main Content */}
                   <div style={{ flex: 1, padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
                      
                      {/* Guest Information */}
                      <div style={{ flex: '1 1 300px' }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                               <User size={20} />
                            </div>
                            <div>
                               <div style={{ fontWeight: 800, fontSize: '1.25rem' }}>{r.name}</div>
                               <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem' }}>
                                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}><Phone size={14} /> {r.phone}</span>
                                  <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}><Mail size={14} /> {r.email}</span>
                               </div>
                            </div>
                         </div>
                      </div>

                      {/* Seat Configuration */}
                      <div style={{ flex: '0 0 150px', textAlign: 'center' }}>
                         <div style={{ fontSize: '1.25rem', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            <Users size={18} color="var(--color-primary)" /> {r.guests} <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>GUESTS</span>
                         </div>
                         <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginTop: '0.5rem' }}>
                            <Clock size={14} /> {r.time}
                         </div>
                      </div>

                      {/* Status Indicator */}
                      <div style={{ flex: '0 0 200px', display: 'flex', justifyContent: 'flex-end', gap: '1rem', alignItems: 'center' }}>
                         <div style={{ textAlign: 'right' }}>
                            <span style={{ 
                               display: 'inline-block', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em',
                               background: r.status === 'confirmed' ? 'rgba(5, 150, 105, 0.1)' : r.status === 'cancelled' ? 'rgba(239, 68, 68, 0.1)' : 'var(--color-border)',
                               color: r.status === 'confirmed' ? '#059669' : r.status === 'cancelled' ? '#ef4444' : 'var(--color-text-muted)',
                               border: `1px solid ${r.status === 'confirmed' ? '#059669' : r.status === 'cancelled' ? '#ef4444' : 'var(--color-border)'}`
                            }}>
                               {r.status || 'PENDING'}
                            </span>
                         </div>
                         <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--color-bg-base)', padding: '0.25rem', borderRadius: '10px', border: '1px solid var(--color-border)' }}>
                            <button onClick={() => handleUpdateStatus(r._id, 'confirmed')} className="footer-icon-link" style={{ color: '#059669' }} title="Confirm Appointment"><CheckCircle2 size={18} /></button>
                            <button onClick={() => handleUpdateStatus(r._id, 'cancelled')} className="footer-icon-link" style={{ color: '#ef4444' }} title="Mark as Cancelled"><XCircle size={18} /></button>
                            <button onClick={() => handleDelete(r._id)} className="footer-icon-link" title="Remove Entry"><Trash2 size={18} /></button>
                         </div>
                      </div>
                </div>
              </div>
              
              {r.message && (
                 <div style={{ padding: '1.25rem 2rem 1.5rem 140px', background: 'rgba(139, 0, 0, 0.02)', borderBottom: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                       <MessageSquare size={16} color="var(--color-primary)" style={{ marginTop: '2px' }} />
                       <div>
                          <span style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-primary)', textTransform: 'uppercase' }}>Guest Directive:</span>
                          <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', fontStyle: 'italic', marginTop: '0.25rem' }}>"{r.message}"</p>
                       </div>
                    </div>
                 </div>
              )}
            </motion.div>
           ))}
        </div>

      </div>
      
      <style>{`
         @keyframes pulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 0.3; }
         }
         .hover-card { transition: all 0.3s; }
         .hover-card:hover { border-color: var(--color-primary) !important; background: var(--color-bg-elevated) !important; }
      `}</style>
    </div>
  );
};

export default ReservationTracker;
