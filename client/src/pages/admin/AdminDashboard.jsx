import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, UtensilsCrossed, CalendarCheck, MessageSquare, LogOut, ChefHat, TrendingUp, Users, Clock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import usePageTitle from '../../hooks/usePageTitle';

const statCards = [
  { icon: UtensilsCrossed, label: 'Menu Items',    value: '—', color: 'var(--color-gold-400)'  },
  { icon: CalendarCheck,   label: 'Reservations',  value: '—', color: '#60a5fa'                },
  { icon: MessageSquare,   label: 'Inquiries',     value: '—', color: '#a78bfa'                },
  { icon: Users,           label: 'Guests Today',  value: '—', color: 'var(--color-success)'   },
];

const quickLinks = [
  { to: '/admin/menu',         icon: UtensilsCrossed, label: 'Manage Menu',         desc: 'Add, edit or remove dishes' },
  { to: '/admin/reservations', icon: CalendarCheck,   label: 'Reservations',        desc: 'View and update bookings'   },
  { to: '/admin/inquiries',    icon: MessageSquare,   label: 'Inquiries Inbox',     desc: 'Read contact messages'      },
];

const AdminDashboard = () => {
  usePageTitle('Admin Dashboard');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-base)' }}>
      {/* ── Topbar ──────────────────────────────────────────────────────── */}
      <header style={{
        background: 'var(--color-bg-surface)',
        borderBottom: '1px solid var(--color-border)',
        padding: '0 2rem',
        height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
          <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, var(--color-gold-500), var(--color-gold-300))', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChefHat size={16} color="#0f0d0a" strokeWidth={2.2} />
          </div>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem', color: 'var(--color-text-primary)' }}>
            Savory Skies <span style={{ color: 'var(--color-gold-500)', fontWeight: 400, fontSize: '0.8rem' }}>Admin</span>
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textDecoration: 'none' }}>
            View Site ↗
          </a>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-gold-600), var(--color-gold-800))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-gold-200)' }}>
              {user?.name?.[0]?.toUpperCase() || 'A'}
            </div>
            <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{user?.name || 'Admin'}</span>
          </div>
          <button
            id="admin-logout-btn"
            onClick={handleLogout}
            style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', background: 'none', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '0.375rem 0.75rem', color: 'var(--color-text-muted)', fontSize: '0.8rem', cursor: 'pointer', transition: 'all 150ms ease' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-error)'; e.currentTarget.style.color = 'var(--color-error)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text-muted)'; }}
          >
            <LogOut size={13} /> Logout
          </button>
        </div>
      </header>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <main style={{ padding: '2.5rem 2rem', maxWidth: '1100px', margin: '0 auto' }}>

        {/* Welcome */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <LayoutDashboard size={18} style={{ color: 'var(--color-gold-400)' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--color-gold-400)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Dashboard</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>
            Good {new Date().getHours() < 12 ? 'Morning' : new Date().getHours() < 17 ? 'Afternoon' : 'Evening'}, {user?.name?.split(' ')[0] || 'Admin'} 👋
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            Here's what's happening at Savory Skies today.
          </p>
        </div>

        {/* Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
          {statCards.map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="card" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-md)', background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={20} style={{ color }} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, lineHeight: 1, color: 'var(--color-text-primary)' }}>{value}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: '1rem', letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.8rem' }}>
          Quick Actions
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {quickLinks.map(({ to, icon: Icon, label, desc }) => (
            <Link
              key={to}
              to={to}
              id={`admin-link-${label.toLowerCase().replace(/\s+/g, '-')}`}
              style={{ textDecoration: 'none' }}
            >
              <div className="card" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start', cursor: 'pointer' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', background: 'rgba(196,144,32,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={18} style={{ color: 'var(--color-gold-400)' }} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.2rem', fontFamily: 'var(--font-body)' }}>{label}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{desc}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Coming Soon Note */}
        <div style={{ marginTop: '2.5rem', padding: '1rem 1.25rem', background: 'rgba(196,144,32,0.05)', border: '1px dashed var(--color-border-gold)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingUp size={15} style={{ color: 'var(--color-gold-500)' }} />
            <span style={{ fontSize: '0.8rem', color: 'var(--color-gold-400)', fontWeight: 600 }}>
              Full analytics, live stats, and CRUD panels coming in Phase 5
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
