import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, UtensilsCrossed, CalendarCheck, MessageSquare, LogOut, ChefHat, TrendingUp, Users, Clock, ExternalLink, Sparkles, ShieldCheck, ChevronRight, Activity, Zap, PieChart, BarChart3, Target, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { adminAPI } from '../../api';
import usePageTitle from '../../hooks/usePageTitle';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  usePageTitle('Admin Intelligence');
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
        toast.error('Failed to sync intelligence data.');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  const statCards = [
    { icon: UtensilsCrossed, label: 'Culinary Assets', value: stats.menuItems, trend: '+3 new', color: 'var(--color-primary)', bg: 'rgba(139, 0, 0, 0.1)' },
    { icon: CalendarCheck, label: 'Bookings', value: stats.reservations, trend: '92% fill rate', color: '#B45309', bg: 'rgba(180, 83, 9, 0.1)' },
    { icon: MessageSquare, label: 'Inquiries', value: stats.inquiries, trend: '4 pending', color: '#4338CA', bg: 'rgba(67, 56, 202, 0.1)' },
    { icon: Users, label: 'Daily Guest Flow', value: stats.guestsToday, trend: 'Peak at 7PM', color: '#047857', bg: 'rgba(4, 120, 87, 0.1)' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-base)' }}>
      {/* ── Dashboard Sidebar / Header ────────────────────────────── */}
      <div style={{ display: 'flex' }}>
        
        {/* Navigation Rail */}
        <aside className="glass" style={{ width: '80px', height: '100vh', position: 'fixed', left: 0, top: 0, borderRight: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', alignItems: 'center', py: '2rem', gap: '2.5rem', zIndex: 100 }}>
           <div style={{ width: '48px', height: '48px', background: 'var(--color-primary)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1.5rem' }}>
              <ChefHat size={24} color="white" />
           </div>
           
           <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <Link to="/admin" className="footer-icon-link" style={{ fontSize: '0.7rem', color: 'var(--color-primary)' }} title="Dashboard"><LayoutDashboard size={20} /></Link>
              <Link to="/admin/menu" className="footer-icon-link" title="Menu"><UtensilsCrossed size={20} /></Link>
              <Link to="/admin/reservations" className="footer-icon-link" title="Reservations"><CalendarCheck size={20} /></Link>
              <Link to="/admin/inquiries" className="footer-icon-link" title="Messages"><MessageSquare size={20} /></Link>
              <Link to="/admin/orders" className="footer-icon-link" title="Orders"><ShoppingBag size={20} /></Link>
           </div>

           <button onClick={handleLogout} className="footer-icon-link" style={{ marginTop: 'auto', marginBottom: '2rem' }} title="Logout">
              <LogOut size={20} />
           </button>
        </aside>

        {/* Main Content Area */}
        <main style={{ flex: 1, padding: '3rem 5rem 5rem 130px' }}>
          
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
             <div>
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                   <Activity size={16} color="var(--color-primary)" />
                   <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)' }}>Operations Intelligence</span>
                </motion.div>
                <h1 className="font-display" style={{ fontSize: '2.5rem' }}>Core <span className="text-gradient">Performance</span></h1>
             </div>

             <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ textAlign: 'right' }}>
                   <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{user?.name || 'Systems Admin'}</div>
                   <div style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 700 }}>Privileged Access</div>
                </div>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'linear-gradient(45deg, var(--color-primary), #000)', border: '2px solid var(--color-border)' }} />
             </div>
          </header>

          {/* Quick Metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            {statCards.map((card, i) => (
              <motion.div 
                key={card.label} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: i * 0.1 }}
                className="card glass" 
                style={{ padding: '2.5rem', border: '1px solid var(--color-border)', position: 'relative', overflow: 'hidden' }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <card.icon size={20} color={card.color} />
                </div>
                <div>
                   <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>{loading ? '...' : card.value}</div>
                   <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 700, marginTop: '0.25rem' }}>{card.label}</div>
                </div>
                <div style={{ marginTop: '1.25rem', fontSize: '0.75rem', color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                   <TrendingUp size={12} /> {card.trend}
                </div>
                <Sparkles size={80} style={{ position: 'absolute', bottom: '-20px', right: '-200px', opacity: 0.05, color: card.color }} />
              </motion.div>
            ))}
          </div>

          {/* ── Visualizations Section ────────────────────────────────── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem', marginBottom: '4rem' }}>
             
             {/* Chart Replacement (Modern Visual) */}
             <div className="card glass" style={{ padding: '2.5rem', border: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                   <h3 className="font-display" style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <BarChart3 size={18} color="var(--color-primary)" /> Weekly Booking Velocity
                   </h3>
                   <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Avg. +12.4% vs last week</span>
                </div>
                
                {/* Visual Bar Graph */}
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '200px', gap: '1rem', paddingTop: '2rem' }}>
                   {[65, 45, 85, 30, 95, 55, 75].map((height, i) => (
                      <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                         <motion.div 
                            initial={{ height: 0 }} 
                            animate={{ height: `${height}%` }} 
                            transition={{ duration: 1, delay: i * 0.1 }}
                            style={{ 
                              width: '100%', 
                              background: i === 4 ? 'var(--color-primary)' : 'var(--color-border)', 
                              borderRadius: '4px 4px 0 0',
                              position: 'relative',
                              minHeight: '4px'
                            }}
                         >
                            {i === 4 && <div style={{ position: 'absolute', top: '-25px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.7rem', fontWeight: 800 }}>+{height}</div>}
                         </motion.div>
                         <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontWeight: 700 }}>{['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'][i]}</span>
                      </div>
                   ))}
                </div>
             </div>

             {/* Distribution Visual */}
             <div className="card glass" style={{ padding: '2.5rem', border: '1px solid var(--color-border)' }}>
                <h3 className="font-display" style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                   <PieChart size={18} color="var(--color-primary)" /> Table Distribution
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                   {[
                      { label: 'Indoors', value: 75, color: 'var(--color-primary)' },
                      { label: 'Outdoor Patio', value: 45, color: '#B45309' },
                      { label: 'Chef Table', value: 12, color: '#4338CA' }
                   ].map((item, i) => (
                      <div key={i}>
                         <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                            <span>{item.label}</span>
                            <span style={{ color: item.color }}>{item.value} tables</span>
                         </div>
                         <div style={{ height: '6px', background: 'var(--color-border)', borderRadius: '10px', overflow: 'hidden' }}>
                            <motion.div 
                               initial={{ width: 0 }} 
                               animate={{ width: `${(item.value / 100) * 100}%` }} 
                               transition={{ duration: 1, delay: i * 0.2 }}
                               style={{ height: '100%', background: item.color }} 
                            />
                         </div>
                      </div>
                   ))}
                </div>

                <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)', display: 'flex', gap: '1rem' }}>
                   <div style={{ flex: 1, textAlign: 'center' }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>132</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>TOTAL CAPACITY</div>
                   </div>
                   <div style={{ width: '1px', background: 'var(--color-border)' }} />
                   <div style={{ flex: 1, textAlign: 'center' }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>88%</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>EFFICIENCY</div>
                   </div>
                </div>
             </div>
          </div>

          {/* Quick Modules */}
          <div style={{ marginBottom: '4rem' }}>
             <h3 className="font-display" style={{ marginBottom: '2rem', fontSize: '1.5rem' }}>Management Hub</h3>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {[
                  { to: '/admin/menu', icon: UtensilsCrossed, title: 'Menu Inventory', desc: 'Manage your high-end culinary collection.', badge: stats.menuItems },
                  { to: '/admin/reservations', icon: CalendarCheck, title: 'Reservation Ledger', desc: 'Secure and oversee daily guest arrivals.', badge: stats.reservations },
                  { to: '/admin/orders', icon: ShoppingBag, title: 'Fulfillment', desc: 'Manage incoming culinary requests and orders.', badge: 'Live' },
                  { to: '/admin/inquiries', icon: MessageSquare, title: 'Communications', desc: 'Manage concierge requests and feedback.', badge: stats.inquiries },
                ].map((link, i) => (
                  <Link key={i} to={link.to} style={{ textDecoration: 'none' }}>
                     <motion.div 
                        whileHover={{ y: -5, x: 5 }} 
                        className="card glass" 
                        style={{ padding: '2rem', display: 'flex', gap: '1.5rem', alignItems: 'center', border: '1px solid var(--color-border)' }}
                      >
                        <div style={{ padding: '1rem', background: 'var(--color-bg-base)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                           <link.icon size={20} color="var(--color-primary)" />
                        </div>
                        <div style={{ flex: 1 }}>
                           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{link.title}</div>
                              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--color-primary)', color: 'white', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>{link.badge}</div>
                           </div>
                           <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>{link.desc}</div>
                        </div>
                        <ChevronRight size={18} color="var(--color-text-muted)" />
                     </motion.div>
                  </Link>
                ))}
             </div>
          </div>

          {/* System Footer Info */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: 0.6, fontSize: '0.85rem' }}>
             <div style={{ display: 'flex', gap: '1.5rem' }}>
                <span>Server Status: <strong style={{ color: '#059669' }}>Online</strong></span>
                <span>Version: <strong>v2.1.4 (Enterprise)</strong></span>
             </div>
             <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <ShieldCheck size={14} /> 256-bit Encrypted Session
             </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
