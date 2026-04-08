import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Calendar, Clock, User, LogOut, ChevronRight, Package, CheckCircle2, XCircle, Timer, MapPin, Phone, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { orderAPI, reservationAPI } from '../api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import usePageTitle from '../hooks/usePageTitle';

const MyAccount = () => {
  usePageTitle('My Journey — Simple Restaurant');
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [ordersRes, reservationsRes] = await Promise.all([
          orderAPI.getMyOrders(),
          reservationAPI.getMyReservations()
        ]);
        setOrders(ordersRes.data.data);
        setReservations(reservationsRes.data.data);
      } catch (err) {
        toast.error('Failed to sync your history.', { id: 'account-sync-error' });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('Signed out successfully.', { icon: '👋', id: 'logout-success' });
  };

  const getOrderStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <CheckCircle2 size={16} color="#059669" />;
      case 'cancelled': return <XCircle size={16} color="#ef4444" />;
      case 'out-for-delivery': return <Package size={16} color="#8b5cf6" />;
      default: return <Timer size={16} color="#f59e0b" />;
    }
  };

  const getReservationStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#059669';
      case 'cancelled': return '#ef4444';
      case 'completed': return 'var(--color-primary)';
      default: return '#f59e0b';
    }
  };

  return (
    <div className="page-enter" style={{ minHeight: '100vh', background: 'var(--color-bg-base)', paddingTop: '10rem', paddingBottom: '5rem' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        
        {/* ── User Header ────────────────────────────────────────────── */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '5rem', gap: '2rem', flexWrap: 'wrap' }}>
          <div>
            <div className="section-label">Guest Profile</div>
            <h1 className="font-display">Welcome, <span className="text-gradient">{user?.name}</span></h1>
            <p style={{ marginTop: '0.5rem', color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
               Managing your culinary experiences and upcoming arrivals.
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
             <div className="card glass" style={{ padding: '1.25rem 2rem', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                   <User size={24} />
                </div>
                <div>
                   <div style={{ fontWeight: 800, fontSize: '1rem' }}>{user?.email}</div>
                   <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Member since {new Date(user?.createdAt || Date.now()).toLocaleDateString()}</div>
                </div>
             </div>
             <button onClick={handleLogout} className="btn btn-outline" style={{ borderRadius: 'var(--radius-md)', height: '70px', paddingInline: '1.5rem', borderColor: 'var(--color-border)' }}>
                <LogOut size={20} />
             </button>
          </div>
        </header>

        {/* ── Dashboard Tabs ─────────────────────────────────────────── */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem' }}>
           {[
             { id: 'orders', label: 'Order History', icon: ShoppingBag, count: orders.length },
             { id: 'reservations', label: 'Upcoming Tables', icon: Calendar, count: reservations.filter(r => new Date(r.date) >= new Date()).length }
           ].map(tab => (
             <button 
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               style={{ 
                 background: 'none', border: 'none', cursor: 'pointer', padding: '1rem 2rem', position: 'relative',
                 display: 'flex', alignItems: 'center', gap: '0.75rem', transition: '0.3s'
               }}
             >
                <tab.icon size={20} color={activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-text-muted)'} />
                <span style={{ fontWeight: 800, fontSize: '1rem', color: activeTab === tab.id ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}>{tab.label}</span>
                {tab.count > 0 && <span style={{ padding: '0.2rem 0.5rem', borderRadius: '6px', background: activeTab === tab.id ? 'var(--color-primary)' : 'var(--color-bg-elevated)', color: activeTab === tab.id ? 'white' : 'var(--color-text-muted)', fontSize: '0.7rem', fontWeight: 900 }}>{tab.count}</span>}
                {activeTab === tab.id && <motion.div layoutId="tab-underline" style={{ position: 'absolute', bottom: '-1rem', left: 0, right: 0, height: '3px', background: 'var(--color-primary)' }} />}
             </button>
           ))}
        </div>

        {/* ── Content Area ───────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
           {loading ? (
             <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ padding: '5rem', textAlign: 'center' }}>
                <div style={{ width: '40px', height: '40px', border: '3px solid var(--color-border)', borderTopColor: 'var(--color-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }} />
                <p style={{ marginTop: '1.5rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Syncing your records...</p>
             </motion.div>
           ) : activeTab === 'orders' ? (
             <motion.div 
               key="orders-grid"
               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
               style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
             >
                {orders.length === 0 ? (
                  <div style={{ padding: '8rem', textAlign: 'center', background: 'var(--color-bg-surface)', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--color-border)' }}>
                     <ShoppingBag size={48} color="var(--color-border)" style={{ marginBottom: '1.5rem' }} />
                     <h3 className="font-display" style={{ fontSize: '1.5rem' }}>No orders yet</h3>
                     <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>Experience our curated menu and your history will appear here.</p>
                     <button onClick={() => navigate('/menu')} className="btn btn-primary" style={{ marginTop: '2rem' }}>Explore Menu</button>
                  </div>
                ) : orders.map(order => (
                  <div key={order._id} className="card glass" style={{ border: '1px solid var(--color-border)', overflow: 'hidden' }}>
                     <div style={{ padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
                        <div style={{ flex: '1 1 250px' }}>
                           <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Registry #{order._id.slice(-6).toUpperCase()}</div>
                           <h4 style={{ fontWeight: 800, fontSize: '1.25rem', marginTop: '0.25rem' }}>{order.items.length} Culinary Assets</h4>
                           <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>{new Date(order.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</div>
                        </div>
                        
                        <div style={{ flex: '2 1 300px', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                           {order.items.map((item, idx) => (
                             <span key={idx} style={{ padding: '0.4rem 0.8rem', background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 700 }}>
                                {item.quantity}x {item.name}
                             </span>
                           ))}
                        </div>

                        <div style={{ flex: '1 1 150px', textAlign: 'right' }}>
                           <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-primary)' }}>${order.totalAmount.toFixed(2)}</div>
                           <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>
                              {getOrderStatusIcon(order.status)} {order.status}
                           </div>
                        </div>
                     </div>
                  </div>
                ))}
             </motion.div>
           ) : (
             <motion.div 
               key="reservations-grid"
               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
               style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}
             >
                {reservations.length === 0 ? (
                  <div style={{ gridColumn: '1 / -1', padding: '8rem', textAlign: 'center', background: 'var(--color-bg-surface)', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--color-border)' }}>
                     <Calendar size={48} color="var(--color-border)" style={{ marginBottom: '1.5rem' }} />
                     <h3 className="font-display" style={{ fontSize: '1.5rem' }}>The ledger is empty</h3>
                     <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>Join us for a bespoke dining experience.</p>
                     <button onClick={() => navigate('/reservations')} className="btn btn-primary" style={{ marginTop: '2rem' }}>Book a Table</button>
                  </div>
                ) : reservations.map(res => (
                  <div key={res._id} className="card glass" style={{ border: '1px solid var(--color-border)', padding: '2.5rem' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                        <div style={{ padding: '1rem', background: 'var(--color-bg-elevated)', borderRadius: '12px', textAlign: 'center', minWidth: '70px', border: '1px solid var(--color-border)' }}>
                           <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-primary)' }}>{new Date(res.date).toLocaleDateString(undefined, { month: 'short' }).toUpperCase()}</div>
                           <div style={{ fontSize: '1.75rem', fontWeight: 900, lineHeight: 1 }}>{new Date(res.date).getDate()}</div>
                        </div>
                        <div style={{ 
                          padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', 
                          background: `${getReservationStatusColor(res.status)}10`, color: getReservationStatusColor(res.status),
                          border: `1px solid ${getReservationStatusColor(res.status)}`
                        }}>
                           {res.status}
                        </div>
                     </div>

                     <h4 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem' }}>Arrival at {res.time}</h4>
                     
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
                           <User size={16} /> {res.guests} {res.guests === 1 ? 'Guest' : 'Guests'}
                        </div>
                        {res.occasion && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
                             <CheckCircle2 size={16} /> {res.occasion} Celebration
                          </div>
                        )}
                        <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-text-muted)', marginTop: '1rem' }}>CONFIRMATION CODE</div>
                        <div style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--color-primary)', letterSpacing: '0.1em' }}>{res.confirmationCode}</div>
                     </div>
                  </div>
                ))}
             </motion.div>
           )}
        </AnimatePresence>

      </div>
      <style>{`
         @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default MyAccount;
