import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Phone, Mail, Clock, CheckCircle2, XCircle, Trash2, Search, Filter, ArrowUpDown } from 'lucide-react';
import toast from 'react-hot-toast';
import { reservationAPI } from '../../api';
import usePageTitle from '../../hooks/usePageTitle';
import { Link } from 'react-router-dom';

const ReservationTracker = () => {
  usePageTitle('Manage Reservations');
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchReservations = async () => {
    try {
      setLoading(true);
      const res = await reservationAPI.getAll();
      setReservations(res.data.data || res.data || []);
    } catch (err) {
      toast.error('Failed to load reservations.');
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
      toast.success(`Status updated to ${status}`);
      fetchReservations();
    } catch (err) {
      toast.error('Failed to update status.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this reservation?')) return;
    try {
      await reservationAPI.delete(id);
      toast.success('Reservation deleted.');
      fetchReservations();
    } catch (err) {
      toast.error('Failed to delete.');
    }
  };

  const filtered = reservations.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.phone.includes(search)
  ).sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-base)', padding: '2rem' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div>
            <Link to="/admin" style={{ color: 'var(--color-gold-500)', fontSize: '0.8rem', textDecoration: 'none', marginBottom: '0.5rem', display: 'block' }}>← Back to Dashboard</Link>
            <h1 style={{ fontSize: '1.75rem' }}>Reservation Tracker</h1>
          </div>
          <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            {reservations.length} total bookings
          </div>
        </div>

        {/* Search */}
        <div className="card" style={{ padding: '1rem', marginBottom: '2rem' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search by name or phone..." 
              style={{ paddingLeft: '2.5rem' }} 
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {loading ? (
            <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading reservations...</div>
          ) : filtered.length === 0 ? (
            <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>No reservations found.</div>
          ) : filtered.map(r => (
            <motion.div
              layout
              key={r._id}
              className="card reservation-card"
              style={{ padding: '1.5rem' }}
            >
              <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Guest Info */}
                <div style={{ flex: '1 1 250px' }}>
                  <div style={{ fontWeight: 700, fontSize: '1.15rem', marginBottom: '0.4rem', color: 'var(--color-text-primary)' }}>{r.name}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Phone size={14} className="text-gradient" /> {r.phone}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><Mail size={14} className="text-gradient" /> {r.email}</span>
                  </div>
                </div>

                {/* Booking Stats */}
                <div style={{ flex: '1 1 200px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '0.4rem' }}>
                    <Calendar size={16} style={{ color: 'var(--color-gold-400)' }} />
                    {new Date(r.date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                    <Clock size={15} /> {r.time}
                    <span style={{ opacity: 0.3 }}>|</span>
                    <Users size={15} /> {r.guests} guests
                  </div>
                </div>

                {/* Status & Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <div>
                    <span className={`badge`} style={{ 
                      background: r.status === 'confirmed' ? 'rgba(74,222,128,0.1)' : r.status === 'cancelled' ? 'rgba(248,113,113,0.1)' : 'var(--color-bg-elevated)',
                      color: r.status === 'confirmed' ? 'var(--color-success)' : r.status === 'cancelled' ? 'var(--color-error)' : 'var(--color-text-muted)',
                      fontSize: '0.7rem', padding: '0.4rem 0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', border: '1px solid currentColor', borderRadius: '6px'
                    }}>
                      {r.status || 'pending'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => handleUpdateStatus(r._id, 'confirmed')} className="btn btn-ghost btn-sm" style={{ padding: '0.6rem', color: 'var(--color-success)', border: 'none' }} title="Confirm">
                      <CheckCircle2 size={18} />
                    </button>
                    <button onClick={() => handleUpdateStatus(r._id, 'cancelled')} className="btn btn-ghost btn-sm" style={{ padding: '0.6rem', color: 'var(--color-warning)', border: 'none' }} title="Cancel">
                      <XCircle size={18} />
                    </button>
                    <button onClick={() => handleDelete(r._id)} className="btn btn-ghost btn-sm" style={{ padding: '0.6rem', color: 'var(--color-error)', border: 'none' }} title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>

              {r.message && (
                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.25rem', marginTop: '1.25rem' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-gold-500)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Message from Guest:</div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>"{r.message}"</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ReservationTracker;
