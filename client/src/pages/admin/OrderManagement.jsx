import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, Filter, ArrowLeft, Clock, User, DollarSign, ChevronRight, CheckCircle2, XCircle, Trash2, Package, Truck, Check, MoreVertical } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from '../../api/axios';
import usePageTitle from '../../hooks/usePageTitle';
import { Link } from 'react-router-dom';

const OrderManagement = () => {
  usePageTitle('Registry of Orders — Admin');
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/orders');
      setOrders(res.data.data);
    } catch (err) {
      toast.error('Failed to sync the order registry.', { id: 'orders-fetch-error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.patch(`/orders/${id}/status`, { status });
      toast.success(`Order status advanced to ${status}.`, { icon: '✅', id: `order-update-${id}` });
      fetchOrders();
    } catch (err) {
      toast.error('Failed to update order status.', { id: 'order-update-error' });
    }
  };

  const statusColors = {
    'pending': { bg: 'rgba(59, 130, 246, 0.1)', text: '#3b82f6', icon: <Clock size={14} /> },
    'confirmed': { bg: 'rgba(16, 185, 129, 0.1)', text: '#10b981', icon: <CheckCircle2 size={14} /> },
    'preparing': { bg: 'rgba(245, 158, 11, 0.1)', text: '#f59e0b', icon: <Package size={14} /> },
    'out-for-delivery': { bg: 'rgba(139, 92, 246, 0.1)', text: '#8b5cf6', icon: <Truck size={14} /> },
    'delivered': { bg: 'rgba(5, 150, 105, 0.1)', text: '#059669', icon: <Check size={14} /> },
    'cancelled': { bg: 'rgba(239, 68, 68, 0.1)', text: '#ef4444', icon: <XCircle size={14} /> }
  };

  const filtered = orders.filter(o => {
    const matchesSearch = o.user?.name.toLowerCase().includes(search.toLowerCase()) || o._id.includes(search);
    const matchesStatus = filterStatus === 'All' || o.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-base)', display: 'flex' }}>
      
      {/* Sidebar Rail Space */}
      <div style={{ width: '80px', flexShrink: 0 }} />

      <div style={{ flex: 1, padding: '3rem 5rem 5rem' }}>
        
        <header style={{ marginBottom: '4rem' }}>
          <Link to="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem' }}>
             <ArrowLeft size={14} /> Back to Hub
          </Link>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
             <div>
                <h1 className="font-display" style={{ fontSize: '2.5rem' }}>Fulfillment <span className="text-gradient">Registry</span></h1>
                <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>Managing incoming culinary requests and fulfillment lifecycles.</p>
             </div>
             <div style={{ padding: '1rem 1.5rem', background: 'var(--color-bg-elevated)', borderRadius: '12px', border: '1px solid var(--color-border)', textAlign: 'right' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-text-muted)', textTransform: 'uppercase' }}>Daily Velocity</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 900 }}>{loading ? '...' : orders.length} Orders</div>
             </div>
          </div>
        </header>

        {/* Toolbar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', gap: '2rem' }}>
           <div style={{ position: 'relative', flex: 1, maxWidth: '500px' }}>
              <Search size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input 
                type="text" 
                className="form-input" 
                placeholder="Search orders or guest ID..." 
                style={{ paddingLeft: '3.5rem', borderRadius: '12px' }} 
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
           </div>

           <div className="no-scrollbar" style={{ display: 'flex', background: 'var(--color-bg-elevated)', padding: '0.25rem', borderRadius: '10px', border: '1px solid var(--color-border)', overflowX: 'auto' }}>
              {['All', 'pending', 'confirmed', 'preparing', 'delivered', 'cancelled'].map(status => (
                <button 
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  style={{ 
                    padding: '0.5rem 1rem', 
                    borderRadius: '8px', 
                    fontSize: '0.75rem', 
                    fontWeight: 800, 
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    background: filterStatus === status ? 'var(--color-primary)' : 'transparent',
                    color: filterStatus === status ? 'white' : 'var(--color-text-muted)',
                    border: 'none', cursor: 'pointer', transition: '0.3s'
                  }}
                >
                  {status}
                </button>
              ))}
           </div>
        </div>

        {/* Order Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
           {loading ? (
             Array(3).fill(0).map((_, i) => <div key={i} className="card" style={{ height: '140px', opacity: 0.5, animation: 'pulse 2s infinite' }} />)
           ) : filtered.length === 0 ? (
             <div style={{ padding: '10rem', textAlign: 'center' }}>
                <ShoppingBag size={64} color="var(--color-border)" style={{ marginBottom: '2rem' }} />
                <h2 className="font-display" style={{ fontSize: '1.5rem', color: 'var(--color-text-muted)' }}>No orders match your current filter.</h2>
             </div>
           ) : filtered.map((order) => (
             <motion.div
               layout
               key={order._id}
               className="card glass hover-card"
               style={{ border: '1px solid var(--color-border)', padding: '0', overflow: 'hidden' }}
             >
                <div style={{ padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
                   
                   {/* Order Identity */}
                   <div style={{ flex: '1 1 250px' }}>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                         <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-bg-elevated)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--color-border)' }}>
                            <ShoppingBag size={20} color="var(--color-primary)" />
                         </div>
                         <div>
                            <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--color-text-muted)' }}>ORDER #{order._id.slice(-6).toUpperCase()}</div>
                            <div style={{ fontWeight: 800, fontSize: '1.15rem' }}>{order.user?.name || 'Guest'}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {new Date(order.createdAt).toLocaleDateString()}</div>
                         </div>
                      </div>
                   </div>

                   {/* Items Summary */}
                   <div style={{ flex: '2 1 300px' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                         {order.items.map((item, idx) => (
                           <div key={idx} style={{ background: 'var(--color-bg-elevated)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '0.85rem', fontWeight: 700 }}>
                              <span style={{ color: 'var(--color-primary)' }}>{item.quantity}x</span> {item.name}
                           </div>
                         ))}
                      </div>
                   </div>

                   {/* Pricing & Status */}
                   <div style={{ flex: '1 1 200px', textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem' }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--color-primary)' }}>${order.totalAmount?.toFixed(2)}</div>
                      <div style={{ 
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase',
                        background: statusColors[order.status]?.bg, color: statusColors[order.status]?.text, border: `1px solid ${statusColors[order.status]?.text}`
                      }}>
                         {statusColors[order.status]?.icon} {order.status}
                      </div>
                   </div>

                   {/* Quick Actions */}
                   <div style={{ flex: '0 0 auto', display: 'flex', gap: '0.75rem' }}>
                      <select 
                         className="form-select" 
                         value={order.status}
                         onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                         style={{ 
                           fontSize: '0.75rem', 
                           fontWeight: 800, 
                           height: '42px', 
                           paddingRight: '2.5rem', 
                           borderRadius: '10px',
                           cursor: 'pointer',
                           background: 'var(--color-bg-base)',
                           border: '1px solid var(--color-border)',
                           transition: 'all 0.3s ease'
                         }}
                      >
                         <option value="pending">Pending</option>
                         <option value="confirmed">Confirm</option>
                         <option value="preparing">Prepare</option>
                         <option value="out-for-delivery">Out for Delivery</option>
                         <option value="delivered">Deliver</option>
                         <option value="cancelled">Cancel</option>
                      </select>
                   </div>
                </div>
             </motion.div>
           ))}
        </div>

      </div>
      <style>{`
         @keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 0.3; } }
         .hover-card { transition: all 0.3s; }
         .hover-card:hover { border-color: var(--color-primary) !important; background: var(--color-bg-elevated) !important; }
      `}</style>
    </div>
  );
};

export default OrderManagement;
