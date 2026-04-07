import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, MessageSquare, Phone, User, Mail, Send, CheckCircle2 } from 'lucide-react';
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
      const submissionData = {
        ...formData,
        guests: Number(formData.guests)
      };
      await reservationAPI.create(submissionData);
      setSubmitted(true);
      toast.success('Your table has been reserved! Look forward to seeing you.');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to submit reservation. Please try again.';
      toast.error(msg);
      console.error('Reservation error:', err);
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
      <div className="page-enter section">
        <div className="container" style={{ textAlign: 'center', padding: '4rem 1.5rem' }}>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ marginBottom: '2rem', color: 'var(--color-gold-400)' }}
          >
            <CheckCircle2 size={80} style={{ marginInline: 'auto' }} />
          </motion.div>
          <h2 className="section-title">Reservation Confirmed!</h2>
          <p style={{ maxWidth: '500px', margin: '0 auto 2.5rem', color: 'var(--color-text-secondary)' }}>
            Thank you, {formData.name}. We have received your booking for {formData.guests} guests on {formData.date} at {formData.time}. A confirmation email will be sent shortly.
          </p>
          <button onClick={() => setSubmitted(false)} className="btn btn-primary">
            Make Another Reservation
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-enter section">
      <div className="container" style={{ maxWidth: '1000px' }}>
        
        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-label">Book Your Experience</div>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-display)' }}>Reserve a Table</h2>
          <div className="gold-divider center" />
          <p style={{ maxWidth: '560px', margin: '0 auto', color: 'var(--color-text-secondary)' }}>
            Join us for a culinary journey. Please fill out the form below to secure your table at Savory Skies.
          </p>
        </div>

        {/* ── Reservation Form ────────────────────────────────────────────────── */}
        <div className="glass" style={{ padding: '3rem', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-elevated)' }}>
          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            
            {/* Personal Info */}
            <div className="form-group">
              <label className="form-label" htmlFor="name">
                <User size={14} style={{ marginRight: '6px', color: 'var(--color-gold-500)' }} /> Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-input"
                placeholder="John Doe"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">
                <Mail size={14} style={{ marginRight: '6px', color: 'var(--color-gold-500)' }} /> Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-input"
                placeholder="john@example.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="phone">
                <Phone size={14} style={{ marginRight: '6px', color: 'var(--color-gold-500)' }} /> Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="form-input"
                placeholder="+1 (234) 567-890"
                required
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Booking Details */}
            <div className="form-group">
              <label className="form-label" htmlFor="guests">
                <Users size={14} style={{ marginRight: '6px', color: 'var(--color-gold-500)' }} /> Number of Guests
              </label>
              <select
                id="guests"
                name="guests"
                className="form-select"
                value={formData.guests}
                onChange={handleChange}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                  <option key={n} value={n}>{n} {n === 1 ? 'Person' : 'People'}</option>
                ))}
                <option value="10+">10+ (Please call us)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="date">
                <Calendar size={14} style={{ marginRight: '6px', color: 'var(--color-gold-500)' }} /> Date
              </label>
              <input
                id="date"
                name="date"
                type="date"
                className="form-input"
                required
                min={new Date().toISOString().split('T')[0]}
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="time">
                <Clock size={14} style={{ marginRight: '6px', color: 'var(--color-gold-500)' }} /> Preferred Time
              </label>
              <input
                id="time"
                name="time"
                type="time"
                className="form-input"
                required
                value={formData.time}
                onChange={handleChange}
              />
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label" htmlFor="message">
                <MessageSquare size={14} style={{ marginRight: '6px', color: 'var(--color-gold-500)' }} /> Special Requirements (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                className="form-textarea"
                placeholder="Birthdays, allergies, or window seat request..."
                value={formData.message}
                onChange={handleChange}
              />
            </div>

            <div style={{ gridColumn: '1 / -1', marginTop: '1rem' }}>
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', gap: '0.75rem' }}
              >
                {submitting ? 'Confirming...' : (
                  <>
                    <Send size={18} /> Complete My Reservation
                  </>
                )}
              </button>
              <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '1.25rem' }}>
                By clicking "Complete My Reservation", you agree to our Terms of Service.
              </p>
            </div>

          </form>
        </div>

        {/* ── Additional Info ─────────────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '4rem' }}>
          {[
            { title: 'Fine Dining Policy', text: 'We maintain a smart-casual dress code to ensure a premium experience for all guests.' },
            { title: 'Large Groups', text: 'For parties of 10 or more, please contact us directly at +1 (234) 567-890.' },
            { title: 'Late Arrival', text: 'Tables are held for 15 minutes after the reservation time. Please call if you are running late.' },
          ].map(info => (
            <div key={info.title} className="card" style={{ padding: '1.5rem', background: 'var(--color-bg-base)' }}>
              <h4 style={{ color: 'var(--color-gold-400)', marginBottom: '0.75rem', fontSize: '1rem' }}>{info.title}</h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{info.text}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Reservations;
