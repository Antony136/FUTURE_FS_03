import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, Minus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from '../../api/axios';

const Cart = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      const orderData = {
        items: cartItems.map(item => ({
          menuItem: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: cartTotal
      };

      const res = await axios.post('/orders', orderData);
      
      if (res.data.success) {
        toast.success('Reservation & Order Confirmed! See you soon.', {
          icon: '✅',
          id: 'checkout-success'
        });
        clearCart();
        onClose();
        navigate('/');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to process order.', { id: 'checkout-error' });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(5px)',
              zIndex: 1000,
            }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '450px',
              background: 'var(--color-bg-base)',
              zIndex: 1001,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
              borderLeft: '1px solid var(--color-border)',
            }}
          >
            {/* Header */}
            <div style={{ padding: '2rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                 <div style={{ padding: '0.75rem', background: 'var(--color-primary)', borderRadius: '12px' }}>
                    <ShoppingBag size={20} color="white" />
                 </div>
                 <h2 className="font-display" style={{ fontSize: '1.5rem' }}>Your <span className="text-gradient">Selection</span></h2>
              </div>
              <button onClick={onClose} className="footer-icon" style={{ padding: '0.5rem' }}>
                <X size={24} />
              </button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '2rem' }}>
              {cartItems.length === 0 ? (
                <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', opacity: 0.5 }}>
                  <ShoppingCart size={64} strokeWidth={1} />
                  <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>Your cart is currently empty.</p>
                  <button onClick={onClose} className="btn btn-outline" style={{ borderColor: 'var(--color-primary)' }}>Start Exploring</button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {cartItems.map((item) => (
                    <div key={item._id} style={{ display: 'flex', gap: '1.25rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
                      <div style={{ width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0, border: '1px solid var(--color-border)' }}>
                        <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                          <h4 style={{ fontWeight: 800, fontSize: '1rem' }}>{item.name}</h4>
                          <button onClick={() => removeFromCart(item._id)} style={{ background: 'none', border: 'none', color: 'var(--color-error)', cursor: 'pointer', opacity: 0.6 }}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--color-bg-elevated)', padding: '0.25rem 0.5rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                            <button onClick={() => updateQuantity(item._id, item.quantity - 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-primary)' }}><Minus size={14} /></button>
                            <span style={{ fontWeight: 800, minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item._id, item.quantity + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-primary)' }}><Plus size={14} /></button>
                          </div>
                          <span style={{ fontWeight: 900, fontSize: '1.1rem', color: 'var(--color-primary)' }}>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div style={{ padding: '2rem', borderTop: '1px solid var(--color-border)', background: 'var(--color-bg-elevated)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-text-muted)' }}>Order Total</span>
                  <span style={{ fontSize: '1.5rem', fontWeight: 900 }}>${cartTotal.toFixed(2)}</span>
                </div>
                <button onClick={handleCheckout} className="btn btn-primary btn-lg" style={{ width: '100%', padding: '1.25rem', gap: '1rem', fontSize: '1.1rem' }}>
                  Proceed to Checkout <ArrowRight size={20} />
                </button>
                <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                  Free modification until 30 mins before arrival.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Cart;
