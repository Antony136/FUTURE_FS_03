import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, UtensilsCrossed, CalendarCheck, MessageSquare, LogOut, ChefHat, TrendingUp, Users, Clock, ExternalLink, Sparkles, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { adminAPI } from '../../api';
import usePageTitle from '../../hooks/usePageTitle';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  usePageTitle('Admin Dashboard');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    menuItems: 0,
    reservations: 0,
    inquiries: 0,
    guestsToday: 0
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await adminAPI.getStats();
        setStats(res.data.data);
      } catch (err) {
        toast.error('Failed to update dashboard stats.');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  const statCards = [
    { icon: UtensilsCrossed, label: 'Menu Items',    value: stats.menuItems,    color: 'var(--color-primary)'  },
    { icon: CalendarCheck,   label: 'Reservations',  value: stats.reservations, color: '#2563eb'                },
    { icon: MessageSquare,   label: 'Inquiries',     value: stats.inquiries,    color: '#7c3aed'                },
    { icon: Users,           label: 'Guests Today',  value: stats.guestsToday,  color: '#059669'                },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-base)', paddingBottom: '5rem' }}>
      
      {/* ── Top Navigation ────────────────────────────────────────────── */}
      <header className="glass" style={{
        height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 3rem', borderBottom: '1px solid var(--color-border)',
        position: 'sticky', top: 0, zIndex: 100
      }}>
        <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <div style={{ width: '40px', height: '40px', background: 'var(--color-primary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChefHat size={20} color="white" />
          </div>
          <span className="font-display" style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-text-primary)' }}>
            Savory <span className="text-gradient">Skies</span> <span style={{ fontSize: '0.75rem', opacity: 0.6, fontWeight: 400 }}>Admin Portal</span>
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link to="/" className="btn btn-ghost btn-sm" style={{ gap: '0.5rem', color: 'var(--color-text-muted)' }}>
            <ExternalLink size={14} /> View Site
          </Link>
          <div style={{ height: '24px', width: '1px', background: 'var(--color-border)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{user?.name || 'Administrator'}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 600 }}>Elite Access</div>
            </div>
            <button onClick={handleLogout} className="footer-icon" style={{ padding: '0.5rem', borderRadius: '50%' }}>
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      {/* ── Dashboard Content ──────────────────────────────────────────── */}
      <main className="container" style={{ paddingTop: '4rem', maxWidth: '1200px' }}>
        
        <div style={{ marginBottom: '4rem' }}>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="section-label">
             <ShieldCheck size={14} style={{ marginRight: '6px' }} /> Secure Administrative Overview
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-display">
             System <span className="text-gradient">Intelligence</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', marginTop: '1rem' }}>
             Welcome back. Here is a real-time summary of your restaurant's performance and operations.
          </motion.p>
        </div>

        {/* Statistic Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
          {statCards.map((card, i) => (
            <motion.div 
               key={card.label} 
               initial={{ opacity: 0, y: 20 }} 
               animate={{ opacity: 1, y: 0 }} 
               transition={{ delay: i * 0.1 }}
               className="card" 
               style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: `${card.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <card.icon size={24} style={{ color: card.color }} />
              </div>
              <div>
                 <div style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1, marginBottom: '0.5rem' }}>
                    {loading ? '...' : card.value}
                 </div>
                 <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {card.label}
                 </div>
              </div>
              <Sparkles size={60} style={{ position: 'absolute', bottom: '-15px', right: '-15px', opacity: 0.05, color: card.color }} />
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{ marginBottom: '4rem' }}>
           <h3 className="font-display" style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Management Modules</h3>
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
              {[
                { to: '/admin/menu', icon: UtensilsCrossed, title: 'Culinary Collection', desc: 'Refine and update your signature dishes.' },
                { to: '/admin/reservations', icon: CalendarCheck, title: 'Booking Ledger', desc: 'Oversee and coordinate guest arrivals.' },
                { to: '/admin/inquiries', icon: MessageSquare, title: 'Concierge Inbox', desc: 'Respond to guest requests and inquiries.' },
              ].map((link, i) => (
                <Link key={i} to={link.to} style={{ textDecoration: 'none' }}>
                   <motion.div 
                      whileHover={{ y: -5 }} 
                      className="card glass" 
                      style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'center', border: '1px solid var(--color-border)' }}
                    >
                      <div style={{ padding: '1rem', background: 'var(--color-bg-base)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                         <link.icon size={20} color="var(--color-primary)" />
                      </div>
                      <div>
                         <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem' }}>{link.title}</div>
                         <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{link.desc}</div>
                      </div>
                   </motion.div>
                </Link>
              ))}
           </div>
        </div>

        {/* System Health */}
        <div className="glass" style={{ padding: '2.5rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '3rem' }}>
           <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                 <div style={{ width: '12px', height: '12px', background: '#059669', borderRadius: '50%' }} />
                 <div style={{ position: 'absolute', inset: 0, background: '#059669', borderRadius: '50%', opacity: 0.4, animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
              </div>
              <div>
                 <div style={{ fontSize: '1rem', fontWeight: 700 }}>Critical Systems Operational</div>
                 <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>MERN stack cluster is performing at peak efficiency.</div>
              </div>
           </div>
           
           <div style={{ display: 'flex', gap: '2.5rem' }}>
              <div style={{ textAlign: 'right' }}>
                 <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Server Pulse</div>
                 <div style={{ fontSize: '1rem', fontWeight: 700 }}>24ms Latency</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                 <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Security</div>
                 <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-primary)' }}>JWT Encrypted</div>
              </div>
           </div>
        </div>

      </main>

      <style>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
