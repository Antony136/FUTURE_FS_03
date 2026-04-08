import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, ChevronDown, Sparkles, Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import { contactAPI } from '../api';
import usePageTitle from '../hooks/usePageTitle';

const Contact = () => {
  usePageTitle('Contact');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await contactAPI.submit(formData);
      setIsSubmitted(true);
      toast.success('Your message has been sent. We will respond shortly.', {
        icon: '✅',
        id: 'contact-success'
      });
    } catch (err) {
      toast.error('Could not send message. Please try again later.', { id: 'contact-error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: Phone, label: 'Call Us', value: '+1 (234) 567-890', sub: 'Reservations & Inquiries' },
    { icon: Mail, label: 'Email Us', value: 'concierge@savoryskies.com', sub: 'Media & Partnerships' },
    { icon: MapPin, label: 'Visit Us', value: '123 Skyview Ave, Manhattan, NY', sub: 'Heart of the City' },
    { icon: Clock, label: 'Opening Hours', value: 'Tue - Sun: 12 PM - 11 PM', sub: 'Monday: Closed' },
  ];

  return (
    <div className="page-enter" style={{ background: 'var(--color-bg-base)', paddingTop: '10rem' }}>
      
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--color-bg-surface)', textAlign: 'center', position: 'relative' }}>
        <div className="container">
          <div className="section-label" style={{ justifyContent: 'center' }}>Concierge Services</div>
          <h1 className="font-display">Get in <span className="text-gradient">Touch</span></h1>
          <div className="gold-divider center" />
          <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.2rem' }}>
            Whether you have a special request, a question about our menu, or want to share feedback, we’re here to help.
          </p>
        </div>
      </section>

      {/* ── Contact Section ─────────────────────────────────────────────── */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1600&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.05 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '6rem' }}>
            
            {/* Info Column */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
                {contactInfo.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                    <div style={{ color: 'var(--color-primary)', background: 'var(--color-bg-surface)', padding: '1rem', borderRadius: '16px' }}>
                      <item.icon size={22} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>{item.label}</div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.1rem' }}>{item.value}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{item.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative Card */}
              <div className="card" style={{ marginTop: '4.5rem', padding: '3.5rem 2.5rem', background: 'var(--color-primary)', color: 'white', position: 'relative', overflow: 'hidden' }}>
                <Sparkles size={64} style={{ position: 'absolute', top: '-1rem', right: '-1rem', opacity: 0.1 }} />
                <h3 style={{ color: 'white', marginBottom: '1.5rem', fontSize: '1.5rem' }}>Special Events & Private Dining</h3>
                <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2.5rem', fontSize: '1rem' }}>
                  Planning an unforgettable evening? Our dedicated event concierges are at your service for weddings, corporate gatherings, and private celebrations.
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ border: '1px solid rgba(255,255,255,0.3)', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600 }}>100-200 Guests</div>
                  <div style={{ border: '1px solid rgba(255,255,255,0.3)', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600 }}>Customized Menu</div>
                </div>
              </div>
            </motion.div>

            {/* Form Column */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="glass" style={{ padding: '3.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)' }}>
                {isSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '4rem 0' }}>
                    <CheckCircle size={64} color="var(--color-primary)" style={{ marginBottom: '2rem', marginInline: 'auto' }} />
                    <h3 className="font-display">Message Received</h3>
                    <p style={{ fontSize: '1.1rem', marginTop: '1rem' }}>Thank you for reaching out. A member of our concierge team will respond within 24 hours.</p>
                    <button 
                      className="btn btn-outline" 
                      style={{ marginTop: '2.5rem', borderColor: 'var(--color-primary)' }}
                      onClick={() => setIsSubmitted(false)}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="font-display" style={{ marginBottom: '2.5rem', fontSize: '2rem' }}>Send Us a <span className="text-gradient">Message</span></h3>
                    <form 
                      onSubmit={handleSubmit} 
                      style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                        gap: '2rem' 
                      }}
                    >
                      <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input 
                          type="text" 
                          placeholder="e.g. Alexander Pierce" 
                          className="form-input"
                          required
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Email Address</label>
                        <input 
                          type="email" 
                          placeholder="alexander@luxury.com" 
                          className="form-input"
                          required
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                        <label className="form-label">Purpose of Inquiry</label>
                        <select 
                          className="form-select"
                          value={formData.subject}
                          onChange={e => setFormData({ ...formData, subject: e.target.value })}
                        >
                          <option>General Inquiry</option>
                          <option>Private Dining Request</option>
                          <option>Special Event / Wedding</option>
                          <option>Media Inquiry</option>
                        </select>
                      </div>
                      <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                        <label className="form-label">Your Message</label>
                        <textarea 
                          placeholder="Tell us everything about your request..." 
                          className="form-textarea"
                          required
                          value={formData.message}
                          onChange={e => setFormData({ ...formData, message: e.target.value })}
                        />
                      </div>
                      <button 
                        type="submit" 
                        disabled={isSubmitting} 
                        className="btn btn-primary btn-lg"
                        style={{ width: '100%', borderRadius: '4px', gridColumn: '1 / -1', gap: '1rem' }}
                      >
                        {isSubmitting ? 'Sending...' : 'Deliver Message'}
                        <Send size={18} />
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Map / Visual Placeholder ───────────────────────────────────── */}
      <section style={{ height: '500px', width: '100%', position: 'relative' }}>
         <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("https://images.unsplash.com/photo-1555396273-367ea468efea?w=1600&auto=format&fit=crop")', backgroundSize: 'cover', opacity: 0.3 }} />
         <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--color-bg-base), transparent, var(--color-bg-base))' }} />
         <div className="flex-center" style={{ position: 'absolute', inset: 0 }}>
            <div className="glass" style={{ padding: '2rem 3rem', borderRadius: 'var(--radius-lg)' }}>
               <h4 style={{ margin: 0, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Simple Restaurant Manhattan</h4>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Contact;
