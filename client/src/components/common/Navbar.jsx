import { useState, useEffect } from 'react';

import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChefHat, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
          background: 'rgba(5, 5, 5, 0.9)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--color-border)',
          boxShadow: '0 4px 32px rgba(0,0,0,0.5)',
        } : {
          background: 'transparent',
          borderBottom: '1px solid transparent',
        }),
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>

        {/* ── Logo ─────────────────────────────────────────────── */}
        <Link
          to="/"
          id="navbar-logo"
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}
        >
          <div style={{
            width: '42px', height: '42px',
            background: 'linear-gradient(135deg, var(--color-gold-500), var(--color-gold-300))',
            borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'var(--shadow-gold-sm)',
          }}>
            <ChefHat size={22} color="#000" strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1.25rem', lineHeight: 1, color: 'var(--color-text-primary)', letterSpacing: '-0.03em' }}>
              Savory Skies
            </div>
            <div style={{ fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--color-gold-500)', fontWeight: 700, lineHeight: 1, marginTop: '4px' }}>
              Fine Dining
            </div>
          </div>
        </Link>

        {/* ── Desktop Nav ──────────────────────────────────────── */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} className="desktop-nav">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              id={`nav-${label.toLowerCase()}`}
              style={({ isActive }) => ({
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-md)',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.9rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 200ms ease',
                color: isActive ? 'var(--color-gold-400)' : 'var(--color-text-secondary)',
                letterSpacing: '0.02em',
              })}
              onMouseEnter={e => e.target.style.color = 'var(--color-gold-300)'}
              onMouseLeave={e => {
                const isActive = e.target.classList.contains('active');
                e.target.style.color = isActive ? 'var(--color-gold-400)' : 'var(--color-text-secondary)';
              }}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <a
            href="tel:+1234567890"
            id="navbar-phone"
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none', transition: 'color 150ms ease' }}
            className="hidden-mobile"
          >
            <Phone size={15} className="text-gradient" />
            <span>+1 (234) 567-890</span>
          </a>
          <Link to="/reservations" id="navbar-reserve-btn" className="btn btn-primary btn-sm hidden-mobile" style={{ padding: '0.6rem 1.5rem' }}>
            Book a Table
          </Link>

          {/* Mobile hamburger */}
          <button
            id="navbar-menu-toggle"
            onClick={() => setIsOpen(p => !p)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-primary)', padding: '0.5rem', display: 'none' }}
            aria-label="Toggle menu"
            className="mobile-only"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: 'var(--color-bg-surface)',
              borderBottom: '1px solid var(--color-border)',
              padding: '1.5rem 2rem 2.5rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  id={`mobile-nav-${label.toLowerCase()}`}
                  style={({ isActive }) => ({
                    display: 'block',
                    padding: '1rem 0',
                    borderBottom: '1px solid var(--color-border)',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    color: isActive ? 'var(--color-gold-400)' : 'var(--color-text-primary)',
                  })}
                >
                  {label}
                </NavLink>
              ))}
              <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Link to="/reservations" className="btn btn-primary" style={{ width: '100%' }}>
                  Make a Reservation
                </Link>
                <a href="tel:+1234567890" className="btn btn-ghost" style={{ width: '100%' }}>
                  Call Us
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
