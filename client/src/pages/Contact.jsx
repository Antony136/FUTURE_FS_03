import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Info } from 'lucide-react';
import toast from 'react-hot-toast';
import { contactAPI } from '../api';
import usePageTitle from '../hooks/usePageTitle';

const Contact = () => {
  usePageTitle('Contact Us');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await contactAPI.submit(formData);
      toast.success('Your message has been sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-enter section">
      <div className="container" style={{ maxWidth: '1100px' }}>
        
        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div className="section-label">Tell Us Everything</div>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-display)' }}>Get In <span className="text-gradient">Touch</span></h2>
          <div className="gold-divider center" />
          <p style={{ maxWidth: '560px', margin: '0 auto', color: 'var(--color-text-secondary)' }}>
            Have a question, feedback, or a special request? We'd love to hear from you.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem' }}>
          
          {/* ── Left: Contact Info ───────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h3 style={{ marginBottom: '2rem', fontFamily: 'var(--font-display)' }}>Visit Savory Skies</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {[
                { icon: MapPin, title: 'Our Location', text: '42 Culinary Lane, Downtown, New York, NY 10001' },
                { icon: Phone,  title: 'Call Us',      text: '+1 (234) 567-890' },
                { icon: Mail,   title: 'Email Us',     text: 'hello@savoryskies.com' },
                { icon: Clock,  title: 'Dining Hours', text: 'Mon-Sun: 12:00 PM – 11:00 PM' },
              ].map(info => {
                 const Icon = info.icon;
                 return (
                   <div key={info.title} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                     <div style={{
                       width: '44px', height: '44px', borderRadius: 'var(--radius-md)',
                       background: 'rgba(196, 144, 32, 0.1)', display: 'flex',
                       alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold-400)',
                       flexShrink: 0
                     }}>
                       <Icon size={20} />
                     </div>
                     <div>
                       <h4 style={{ fontSize: '1rem', color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>{info.title}</h4>
                       <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{info.text}</p>
                     </div>
                   </div>
                 );
              })}
            </div>

            {/* Simple Map Placeholder */}
            <div style={{ 
              marginTop: '3.5rem', height: '240px', background: 'var(--color-bg-card)', 
              borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--color-border)',
              position: 'relative'
            }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.1197637392!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>

          {/* ── Right: Form ─────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass" style={{ padding: '2.5rem', borderRadius: 'var(--radius-xl)' }}>
              <h3 style={{ marginBottom: '2rem', fontSize: '1.25rem' }}>Send us a Message</h3>
              
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input 
                    name="name" required value={formData.name} onChange={handleChange}
                    type="text" className="form-input" placeholder="e.g. Alexander Pierce" 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input 
                    name="email" required value={formData.email} onChange={handleChange}
                    type="email" className="form-input" placeholder="e.g. alex@example.com" 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input 
                    name="subject" required value={formData.subject} onChange={handleChange}
                    type="text" className="form-input" placeholder="How can we help?" 
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Your Message</label>
                  <textarea 
                    name="message" required value={formData.message} onChange={handleChange}
                    className="form-textarea" placeholder="Tell us more about your inquiry..." 
                  />
                </div>

                <button 
                  type="submit" disabled={submitting}
                  className="btn btn-primary" style={{ width: '100%', gap: '0.75rem', marginTop: '1rem' }}
                >
                  {submitting ? 'Sending...' : (
                    <>
                      <Send size={18} /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
