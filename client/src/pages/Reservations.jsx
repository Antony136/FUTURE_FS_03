import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, MessageSquare, Phone, User, Mail, Send, CheckCircle2, Sparkles, Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import { reservationAPI } from '../api';
import usePageTitle from '../hooks/usePageTitle';

const Reservations = () => {
  usePageTitle('Reserve a Table');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '2',
    date: '',
    time: '19:00',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.guests === '10+') {
      toast.error('For large groups of 10+, please contact us via phone.', { duration: 5000 });
      return;
    }
    setSubmitting(true);
    try {
      const submissionData = { ...formData, guests: Number(formData.guests) };
      await reservationAPI.create(submissionData);
      setSubmitted(true);
      toast.success('Your table has been reserved!', {
        icon: '✅',
        id: 'reservation-success'
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit reservation.', { id: 'reservation-error' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (submitted) {
    return (
      <div className="page-enter section" style={{ paddingTop: '10rem' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
          <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ marginBottom: '3rem', color: 'var(--color-primary)' }}>
            <CheckCircle2 size={100} style={{ marginInline: 'auto' }} />
          </motion.div>
          <h2 className="font-display">Your Table is Waiting</h2>
          <p style={{ fontSize: '1.2rem', marginTop: '1.5rem', lineHeight: 1.8 }}>
            Thank you, <strong>{formData.name}</strong>. Your reservation for {formData.guests} guests on {formData.date} at {formData.time} is confirmed. A concierge will be in touch shortly.
          </p>
          <div style={{ marginTop: '4rem', display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <button onClick={() => setSubmitted(false)} className="btn btn-primary">Book Another</button>
            <a href="/" className="btn btn-outline">Return Home</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter section" style={{ background: 'var(--color-bg-base)', paddingTop: '10rem' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        
        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', marginBottom: '6rem', alignItems: 'center' }}>
          <div>
            <div className="section-label">The Art of Reservation</div>
            <h1 className="font-display">Book a <span className="text-gradient">Journey</span></h1>
            <p style={{ fontSize: '1.15rem', marginTop: '1.5rem', lineHeight: 1.8 }}>
              Join us for an evening of unparalleled culinary excellence. Every reservation at Simple Restaurant is treated as a bespoke event.
            </p>
            <div style={{ marginTop: '3.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Clock size={20} color="var(--color-primary)" />
                <span style={{ fontWeight: 600 }}>Tues - Sun: 12:00 PM - 11:30 PM</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Phone size={20} color="var(--color-primary)" />
                <span style={{ fontWeight: 600 }}>Concierge: +1 (234) 567-890</span>
              </div>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
             <div style={{ position: 'absolute', inset: '-1.5rem', border: '2px solid var(--color-border-gold)', borderRadius: 'var(--radius-xl)', zIndex: 0 }} />
             <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1000&auto=format&fit=crop" alt="Experience" style={{ width: '100%', borderRadius: 'var(--radius-xl)', position: 'relative', zIndex: 1 }} />
          </div>
        </div>

        {/* ── Reservation Form ────────────────────────────────────────────────── */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass" 
          style={{ padding: '4.5rem', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--color-border)' }}
        >
          <form 
            onSubmit={handleSubmit} 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', 
              gap: '2.5rem' 
            }}
          >
            
            <div className="form-group">
              <label className="form-label"><User size={14} style={{ marginRight: '8px' }} /> Full Name</label>
              <input name="name" type="text" className="form-input" placeholder="Alexander Pierce" required value={formData.name} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label className="form-label"><Mail size={14} style={{ marginRight: '8px' }} /> Email Address</label>
              <input name="email" type="email" className="form-input" placeholder="alex@luxury.com" required value={formData.email} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label className="form-label"><Phone size={14} style={{ marginRight: '8px' }} /> Phone Number</label>
              <input name="phone" type="tel" className="form-input" placeholder="+1 (234) 567-890" required value={formData.phone} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label className="form-label"><Users size={14} style={{ marginRight: '8px' }} /> Guests</label>
              <select name="guests" className="form-select" value={formData.guests} onChange={handleChange}>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                <option value="10+">10+ Guests</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label"><Calendar size={14} style={{ marginRight: '8px' }} /> Preferred Date</label>
              <input name="date" type="date" className="form-input" required min={new Date().toISOString().split('T')[0]} value={formData.date} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label className="form-label"><Clock size={14} style={{ marginRight: '8px' }} /> Preferred Time</label>
              <input name="time" type="time" className="form-input" required value={formData.time} onChange={handleChange} />
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label"><MessageSquare size={14} style={{ marginRight: '8px' }} /> Special Occasion & Dietary Notes</label>
              <textarea name="message" className="form-textarea" placeholder="Birthdays, allergies, or preferred seating..." value={formData.message} onChange={handleChange} />
            </div>

            <div style={{ gridColumn: '1 / -1', marginTop: '2rem', textAlign: 'center' }}>
              <button type="submit" disabled={submitting} className="btn btn-primary btn-lg" style={{ width: '100%', maxWidth: '100%', borderRadius: '4px' }}>
                {submitting ? 'Confirming Selection...' : 'Secure My Table'}
              </button>
              <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                Your data is managed by our secure concierge system.
              </p>
            </div>
          </form>
        </motion.div>

        {/* ── Policy Cards ────────────────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '6rem' }}>
          {[
            { icon: Sparkles, title: 'Ambiance & Dress Code', text: 'To maintain our premium atmosphere, we request a smart-casual attire for all evening seatings.' },
            { icon: Heart, title: 'Private celebrations', text: 'For groups larger than 10 or private venue hire, please contact our events team directly.' },
            { icon: Clock, title: 'Cancellation Policy', text: 'Please notify us at least 24 hours in advance for cancellations to avoid any associated charges.' },
          ].map((info, i) => (
            <div key={i} className="card" style={{ padding: '2.5rem', background: 'var(--color-bg-surface)' }}>
              <info.icon size={28} color="var(--color-gold)" style={{ marginBottom: '1.5rem' }} />
              <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>{info.title}</h4>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.6 }}>{info.text}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Reservations;
