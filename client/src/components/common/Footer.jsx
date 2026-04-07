import { Link } from 'react-router-dom';
import { ChefHat, MapPin, Phone, Mail, Clock, ArrowUp } from 'lucide-react';

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    { day: 'Tue – Fri', time: '12:00 PM – 10:00 PM' },
    { day: 'Sat – Sun', time: '11:00 AM – 11:30 PM' },
    { day: 'Monday',    time: 'Closed'  },
  ],
};

const SocialBtn = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="footer-icon"
    style={{ color: 'var(--color-text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
  >
    <Icon />
  </a>
);

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer
      style={{
        background: 'var(--color-bg-surface)',
        borderTop: '1px solid var(--color-border)',
        marginTop: 'auto',
        position: 'relative'
      }}
    >
      <button 
        onClick={scrollToTop}
        style={{
          position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)',
          width: '50px', height: '50px', borderRadius: '50%', background: 'var(--color-primary)',
          color: 'white', border: 'none', cursor: 'pointer', boxShadow: 'var(--shadow-md)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
      >
        <ArrowUp size={22} />
      </button>

      <div className="container" style={{ padding: '6rem 1.5rem 3rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '4rem',
          marginBottom: '5rem',
        }}>

          <div>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', marginBottom: '1.5rem' }}>
              <div style={{
                width: '40px', height: '40px',
                background: 'var(--color-primary)',
                borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <ChefHat size={20} color="#FFFFFF" strokeWidth={2.5} />
              </div>
              <span className="font-display" style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--color-text-primary)' }}>
                Savory Skies
              </span>
            </Link>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.8, marginBottom: '2rem', maxWidth: '300px' }}>
              Excellence in every bite. Experience the finest selection of globally-inspired dishes in the heart of Manhattan.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <SocialBtn href="#" icon={InstagramIcon} label="Instagram" />
              <SocialBtn href="#" icon={FacebookIcon} label="Facebook" />
              <SocialBtn href="#" icon={TwitterIcon} label="Twitter" />
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '1.5rem' }}>
              Explore
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {footerLinks.explore.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', textDecoration: 'none', transition: 'color 0.3s ease' }}
                    className="nav-link"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '1.5rem' }}>
              Timings
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {footerLinks.hours.map(({ day, time }) => (
                <li key={day} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                  <span style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>{day}</span>
                  <span style={{ color: 'var(--color-text-muted)' }}>{time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '1.5rem' }}>
              Concierge
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { icon: MapPin, text: '123 Skyview Ave, Manhattan, NY' },
                { icon: Phone, text: '+1 (234) 567-890' },
                { icon: Mail,  text: 'concierge@savoryskies.com' },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <Icon size={18} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                  <span style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid var(--color-border)',
          paddingTop: '2.5rem',
          display: 'flex', flexWrap: 'wrap',
          justifyContent: 'space-between', alignItems: 'center',
          gap: '1rem',
        }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', margin: 0 }}>
            © {new Date().getFullYear()} Savory Skies Manhattan. Meticulously Crafted.
          </p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link to="/admin/login" style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textDecoration: 'none' }}>Admin Entrance</Link>
            <a href="#" style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', textDecoration: 'none' }}>Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
