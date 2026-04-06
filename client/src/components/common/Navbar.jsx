import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChefHat, Phone } from 'lucide-react';

const navLinks = [
  { to: '/',            label: 'Home'         },
  { to: '/menu',        label: 'Menu'         },
  { to: '/about',       label: 'About'        },
  { to: '/gallery',     label: 'Gallery'      },
  { to: '/contact',     label: 'Contact'      },
];

const Navbar = () => {
  const [isOpen, setIsOpen]       = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const location                  = useLocation();

  // Close mobile menu on route change
  useEffect(() => { setIsOpen(false); }, [location]);

  // Detect scroll for glass effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      id="navbar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 300ms cubic-bezier(0.4,0,0.2,1)',
        ...(scrolled ? {
          background: 'rgba(15, 13, 10, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(196, 144, 32, 0.15)',
          boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
        } : {
          background: 'transparent',
          borderBottom: '1px solid transparent',
        }),
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>

        {/* ── Logo ─────────────────────────────────────────────── */}
        <Link
          to="/"
          id="navbar-logo"
          style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}
        >
          <div style={{
            width: '38px', height: '38px',
            background: 'linear-gradient(135deg, var(--color-gold-500), var(--color-gold-300))',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'var(--shadow-gold-sm)',
          }}>
            <ChefHat size={20} color="#0f0d0a" strokeWidth={2.2} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.15rem', lineHeight: 1, color: 'var(--color-text-primary)', letterSpacing: '-0.03em' }}>
              Savory Skies
            </div>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold-500)', lineHeight: 1, marginTop: '2px' }}>
              Fine Dining
            </div>
          </div>
        </Link>

        {/* ── Desktop Nav ──────────────────────────────────────── */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }} className="desktop-nav">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              id={`nav-${label.toLowerCase()}`}
              style={({ isActive }) => ({
                padding: '0.4rem 0.875rem',
                borderRadius: 'var(--radius-md)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'all 150ms ease',
                color: isActive ? 'var(--color-gold-300)' : 'var(--color-text-secondary)',
                background: isActive ? 'rgba(196,144,32,0.08)' : 'transparent',
              })}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <a
            href="tel:+1234567890"
            id="navbar-phone"
            style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--color-text-muted)', fontSize: '0.8rem', textDecoration: 'none', transition: 'color 150ms ease' }}
            className="hidden-mobile"
          >
            <Phone size={14} />
            <span>+1 (234) 567-890</span>
          </a>
          <Link to="/reservations" id="navbar-reserve-btn" className="btn btn-primary btn-sm hidden-mobile">
            Reserve Table
          </Link>

          {/* Mobile hamburger */}
          <button
            id="navbar-menu-toggle"
            onClick={() => setIsOpen(p => !p)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-primary)', padding: '0.25rem', display: 'none' }}
            aria-label="Toggle menu"
            className="mobile-only"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ──────────────────────────────────────────────────── */}
      {isOpen && (
        <div
          id="mobile-menu"
          style={{
            background: 'rgba(15, 13, 10, 0.97)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid var(--color-border)',
            padding: '1rem 1.5rem 1.5rem',
          }}
        >
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              id={`mobile-nav-${label.toLowerCase()}`}
              style={({ isActive }) => ({
                display: 'block',
                padding: '0.75rem 0',
                borderBottom: '1px solid var(--color-border)',
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                fontWeight: 500,
                textDecoration: 'none',
                color: isActive ? 'var(--color-gold-300)' : 'var(--color-text-secondary)',
              })}
            >
              {label}
            </NavLink>
          ))}
          <Link to="/reservations" id="mobile-reserve-btn" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            Reserve a Table
          </Link>
        </div>
      )}

      {/* Responsive styles injected via style tag */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hidden-mobile { display: none !important; }
          .mobile-only { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-only { display: none !important; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
