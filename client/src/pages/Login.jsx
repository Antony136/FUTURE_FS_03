import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, ShieldCheck, ChevronRight, CheckCircle2, Sparkles, ChefHat } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import usePageTitle from '../hooks/usePageTitle';

const Login = () => {
  usePageTitle('Sign In — Simple Restaurant');
  const [isLogin, setIsLogin] = useState(true);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    let result;
    if (isLogin) {
      result = await login(formData.email, formData.password);
    } else {
      result = await register(formData.name, formData.email, formData.password);
    }

    if (result.success) {
      toast.success(isLogin ? 'Welcome back to excellence!' : 'Experience activated successfully!');
      navigate('/');
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--color-bg-base)', position: 'relative' }}>
      
      {/* Background Pattern */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, pointerEvents: 'none', backgroundImage: 'radial-gradient(var(--color-primary) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* ── Visual Side (Desktop) ──────────────────────────────────────── */}
      <div style={{ flex: 1.2, position: 'relative', overflow: 'hidden' }} className="hidden-mobile">
        <div style={{ position: 'absolute', inset: 0, background: 'url("https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=2000") center/cover no-repeat' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15, 15, 15, 0.95), rgba(15, 15, 15, 0.4))' }} />
        
        <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '6rem', color: '#FFFFFF', zIndex: 10 }}>
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                 <div style={{ width: '48px', height: '48px', background: 'var(--color-primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ChefHat size={24} color="white" />
                 </div>
                 <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Simple <span style={{ color: 'var(--color-primary)' }}>Restaurant</span></span>
              </div>

              <h1 className="font-display" style={{ fontSize: '4.5rem', color: '#FFFFFF', lineHeight: 1.1, marginBottom: '2rem' }}>
                Taste the <br /> <span className="text-gradient">Atmosphere.</span>
              </h1>
              
              <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', maxWidth: '540px', lineHeight: 1.7, marginBottom: '4rem' }}>
                The full culinary experience is reserved for our members. Sign in to view our curated seasonal menu and secure your table.
              </p>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', maxWidth: '600px' }}>
                 {[
                   { title: 'Exclusive Access', desc: 'View signature dishes.' },
                   { title: 'Priority Booking', desc: 'Secure peak timing slots.' },
                   { title: 'Custom Menus', desc: 'Personalized dining options.' },
                   { title: 'Members Lounge', desc: 'Unlock rare wine collections.' }
                 ].map((item, i) => (
                   <div key={i} style={{ borderLeft: '2px solid var(--color-primary)', paddingLeft: '1.5rem' }}>
                      <div style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.25rem' }}>{item.title}</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{item.desc}</div>
                   </div>
                 ))}
              </div>
           </motion.div>
        </div>
      </div>

      {/* ── Form Side ─────────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem', background: 'var(--color-bg-base)', zIndex: 5 }}>
        <div style={{ maxWidth: '440px', marginInline: 'auto', width: '100%' }}>
          
          <div style={{ marginBottom: '4rem' }}>
            <motion.div 
               key={isLogin ? 'login-head' : 'reg-head'}
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}
            >
              <div style={{ height: '2px', width: '24px', background: 'var(--color-primary)' }} />
              <span style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--color-primary)', textTransform: 'uppercase' }}>
                 {isLogin ? 'Welcome Back' : 'First Visit?'}
              </span>
            </motion.div>
            <h2 className="font-display" style={{ fontSize: '3rem', lineHeight: 1 }}>
              {isLogin ? 'Entrance' : 'Initiation'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div 
                   key="name-field"
                   initial={{ opacity: 0, height: 0 }}
                   animate={{ opacity: 1, height: 'auto' }}
                   exit={{ opacity: 0, height: 0 }}
                >
                  <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Identity</label>
                  <div style={{ position: 'relative' }}>
                    <User size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                    <input name="name" type="text" className="form-input" style={{ paddingLeft: '3.5rem' }} placeholder="Full Name" required={!isLogin} value={formData.name} onChange={handleChange} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Digital Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                <input name="email" type="email" className="form-input" style={{ paddingLeft: '3.5rem' }} placeholder="marcus@luxury.com" required value={formData.email} onChange={handleChange} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem' }}>Secret Key</label>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                <input name="password" type="password" className="form-input" style={{ paddingLeft: '3.5rem' }} placeholder="••••••••" required value={formData.password} onChange={handleChange} />
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn btn-primary btn-lg" style={{ marginTop: '1.5rem', width: '100%', padding: '1.25rem', fontSize: '1.1rem', borderRadius: 'var(--radius-sm)' }}>
              {loading ? 'Validating...' : (isLogin ? 'Enter Restaurant' : 'Activate Experience')}
              <ArrowRight size={18} style={{ marginLeft: '12px' }} />
            </button>
          </form>

          <div style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '1rem', color: 'var(--color-text-muted)' }}>
            {isLogin ? "Require an account? " : "Already established? "}
            <button 
               onClick={() => setIsLogin(!isLogin)}
               style={{ background: 'none', border: 'none', color: 'var(--color-text-primary)', fontWeight: 800, cursor: 'pointer', padding: 0, borderBottom: '2px solid var(--color-primary)' }}
            >
              {isLogin ? 'Register' : 'Access Entrance'}
            </button>
          </div>

          {/* ── Admin Link ────────────────────────────────────────────── */}
          <div style={{ marginTop: 'auto', paddingTop: '6rem', textAlign: 'center' }}>
             <Link to="/admin/login" className="footer-icon-link" style={{ fontSize: '0.85rem', fontWeight: 600, opacity: 0.6, display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={16} /> Restricted Admin Portal
             </Link>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Login;
