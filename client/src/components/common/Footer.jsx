import { Link } from 'react-router-dom';
import { ChefHat, MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter, ArrowUp } from 'lucide-react';

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
    style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}
  >
    <Icon size={18} />
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
      {/* Scroll to Top Circle */}
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

          {/* ── Brand ───────────────────────────────────────────────── */}
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
              <SocialBtn href="#" icon={Instagram} label="Instagram" />
              <SocialBtn href="#" icon={Facebook} label="Facebook" />
              <SocialBtn href="#" icon={Twitter} label="Twitter" />
            </div>
          </div>

          {/* ── Quick Links ─────────────────────────────────────────── */}
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

          {/* ── Timings ─────────────────────────────────────────────── */}
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

          {/* ── Location ─────────────────────────────────────────────── */}
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

        {/* ── Bottom Bar ─────────────────────────────────────────────── */}
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
