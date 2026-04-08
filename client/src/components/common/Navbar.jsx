import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChefHat, Phone, Sun, Moon, User, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import Cart from './Cart';

const navLinks = [
  { to: '/',            label: 'Home'         },
  { to: '/menu',        label: 'Menu'         },
  { to: '/about',       label: 'About'        },
  { to: '/gallery',     label: 'Gallery'      },
  { to: '/contact',     label: 'Contact'      },
];

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { cartCount } = useCart();
  const [isOpen, setIsOpen]       = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [isDark, setIsDark]       = useState(true);
  const location                  = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('ss_theme');
    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    if (newDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('ss_theme', 'dark');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ss_theme', 'light');
    }
  };

  useEffect(() => { setIsOpen(false); }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
    <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    <header
      id="navbar"
      className={scrolled ? 'glass' : ''}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 400ms ease',
        background: scrolled ? 'var(--color-bg-base)' : 'transparent',
        borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
        boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
        height: scrolled ? '72px' : '88px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* ── Logo ─────────────────────────────────────────────── */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <div style={{
            width: '40px', height: '40px',
            background: 'var(--color-primary)',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(139, 0, 0, 0.3)',
          }}>
            <ChefHat size={20} color="#FFFFFF" strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: scrolled ? '1.15rem' : '1.35rem', color: 'var(--color-text-primary)', transition: 'font-size 0.3s ease' }}>
              Simple <span className="text-gradient">Restaurant</span>
            </div>
          </div>
        </Link>

        {/* ── Desktop Nav ──────────────────────────────────────── */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className="nav-link"
              style={{ textDecoration: 'none', fontSize: '0.95rem' }}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* ── Tools & CTA ──────────────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          
          <button 
            onClick={toggleTheme}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', padding: '0.4rem' }}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Cart Trigger */}
          <button 
            onClick={() => setIsCartOpen(true)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', padding: '0.4rem', position: 'relative' }}
            aria-label="View Selection"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{ 
                  position: 'absolute', 
                  top: '-2px', 
                  right: '-2px', 
                  background: 'var(--color-primary)', 
                  color: 'white', 
                  fontSize: '0.65rem', 
                  fontWeight: 800, 
                  width: '18px', 
                  height: '18px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                {cartCount}
              </motion.span>
            )}
          </button>

          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }} className="hidden-mobile">
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700 }}>{user?.name}</div>
                {(user?.role === 'admin' || user?.role === 'staff') && (
                  <Link to="/admin" style={{ fontSize: '0.7rem', color: 'var(--color-primary)', textDecoration: 'none', fontWeight: 700 }}>Admin Portal</Link>
                )}
              </div>
              <button 
                onClick={logout} 
                style={{ 
                  background: 'none', 
                  border: '1px solid var(--color-border)', 
                  borderRadius: '50%', 
                  width: '32px', 
                  height: '32px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  cursor: 'pointer',
                  color: 'var(--color-text-muted)'
                }}
                title="Logout"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="nav-link hidden-mobile" style={{ textDecoration: 'none', fontSize: '0.9rem', fontWeight: 700 }}>
              Sign In
            </Link>
          )}

          <Link to="/reservations" className="btn btn-primary btn-sm hidden-mobile" style={{ borderRadius: 'var(--radius-sm)' }}>
            Reserve Now
          </Link>

          <button
            onClick={() => setIsOpen(p => !p)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-primary)', display: 'none' }}
            className="mobile-only"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass"
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
            }}
          >
            <div style={{ padding: '1.5rem 2rem 2.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className="nav-link"
                  style={{ display: 'block', padding: '0.75rem 0', fontSize: '1.1rem' }}
                >
                  {label}
                </NavLink>
              ))}
              
              <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {isAuthenticated ? (
                  <button onClick={logout} className="btn btn-outline" style={{ width: '100%' }}>Logout</button>
                ) : (
                  <Link to="/login" className="btn btn-outline" style={{ width: '100%' }}>Sign In</Link>
                )}
                <Link to="/reservations" className="btn btn-primary" style={{ width: '100%' }}>
                  Book a Table
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hidden-mobile { display: none !important; }
          .mobile-only { display: block !important; }
        }
      `}</style>
    </header>
    </>
  );
};

export default Navbar;
