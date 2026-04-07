import { Link } from 'react-router-dom';
import { ChefHat, MapPin, Phone, Mail, Clock } from 'lucide-react';

// Manual SVG brand icons (Lucide 1.7.0 does not include them)
const InstagramIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const FacebookIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const TwitterIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const footerLinks = {
  explore: [
    { to: '/',            label: 'Home'         },
    { to: '/menu',        label: 'Our Menu'     },
    { to: '/about',       label: 'Our Story'    },
    { to: '/gallery',     label: 'Gallery'      },
    { to: '/reservations',label: 'Reservations' },
    { to: '/contact',     label: 'Contact'      },
  ],
  hours: [
    { day: 'Mon – Thu', time: '12:00 PM – 10:00 PM' },
    { day: 'Fri – Sat', time: '12:00 PM – 11:30 PM' },
    { day: 'Sunday',    time: '11:00 AM – 9:00 PM'  },
  ],
};

const SocialBtn = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    style={{
      width: '38px', height: '38px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--color-bg-elevated)',
      border: '1px solid var(--color-border)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'var(--color-text-muted)',
      transition: 'all 200ms ease',
      textDecoration: 'none',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = 'var(--color-gold-500)';
      e.currentTarget.style.color = 'var(--color-gold-400)';
      e.currentTarget.style.background = 'rgba(196,144,32,0.08)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = 'var(--color-border)';
      e.currentTarget.style.color = 'var(--color-text-muted)';
      e.currentTarget.style.background = 'var(--color-bg-elevated)';
    }}
  >
    <Icon />
  </a>
);

const Footer = () => {
  return (
    <footer
      id="footer"
      style={{
        background: 'var(--color-bg-surface)',
        borderTop: '1px solid var(--color-border)',
        marginTop: 'auto',
      }}
    >
      <div className="container" style={{ padding: '4rem 1.5rem 2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '3rem',
          marginBottom: '3rem',
        }}>

          {/* ── Brand ───────────────────────────────────────────────── */}
          <div>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none', marginBottom: '1rem' }}>
              <div style={{
                width: '36px', height: '36px',
                background: 'linear-gradient(135deg, var(--color-gold-500), var(--color-gold-300))',
                borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <ChefHat size={18} color="#0f0d0a" strokeWidth={2.2} />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.1rem', color: 'var(--color-text-primary)' }}>
                Savory Skies
              </span>
            </Link>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'var(--color-text-muted)', marginBottom: '1.25rem', maxWidth: '240px' }}>
              An unforgettable culinary journey. Globally-inspired dishes, warm ambiance, and exceptional hospitality.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <SocialBtn href="https://instagram.com" icon={InstagramIcon} label="Instagram" />
              <SocialBtn href="https://facebook.com"  icon={FacebookIcon}  label="Facebook"  />
              <SocialBtn href="https://twitter.com"   icon={TwitterIcon}   label="Twitter"   />
            </div>
          </div>

          {/* ── Explore ─────────────────────────────────────────────── */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-gold-400)', marginBottom: '1rem' }}>
              Explore
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {footerLinks.explore.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', textDecoration: 'none', transition: 'color 150ms ease' }}
                    onMouseEnter={e => e.target.style.color = 'var(--color-gold-300)'}
                    onMouseLeave={e => e.target.style.color = 'var(--color-text-muted)'}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Hours ───────────────────────────────────────────────── */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-gold-400)', marginBottom: '1rem' }}>
              Hours
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {footerLinks.hours.map(({ day, time }) => (
                <li key={day} style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', fontSize: '0.875rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--color-text-secondary)' }}>
                    <Clock size={13} style={{ color: 'var(--color-gold-500)', flexShrink: 0 }} />
                    {day}
                  </span>
                  <span style={{ color: 'var(--color-text-muted)', textAlign: 'right' }}>{time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ─────────────────────────────────────────────── */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-gold-400)', marginBottom: '1rem' }}>
              Find Us
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {[
                { icon: MapPin, text: '42 Culinary Lane, Downtown, NY 10001' },
                { icon: Phone, text: '+1 (234) 567-890' },
                { icon: Mail,  text: 'hello@savoryskies.com' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start' }}>
                  <Icon size={15} style={{ color: 'var(--color-gold-500)', flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', lineHeight: 1.5 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ─────────────────────────────────────────────── */}
        <div style={{
          borderTop: '1px solid var(--color-border)',
          paddingTop: '1.5rem',
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'space-between', alignItems: 'center',
          gap: '0.75rem',
        }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', margin: 0 }}>
            © {new Date().getFullYear()} Savory Skies. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy Policy', 'Terms of Service'].map(item => (
              <a key={item} href="#" style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 150ms ease' }}
                onMouseEnter={e => e.target.style.color = 'var(--color-gold-400)'}
                onMouseLeave={e => e.target.style.color = 'var(--color-text-muted)'}
              >{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
