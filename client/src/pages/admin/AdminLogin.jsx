import { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChefHat, Eye, EyeOff, Lock, Mail, AlertCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import usePageTitle from '../../hooks/usePageTitle';

const AdminLogin = () => {
  usePageTitle('Admin Access — Simple Restaurant');
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm]       = useState({ email: '', password: '' });
  const [showPw, setShowPw]   = useState(false);
  const [error, setError]     = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) return <Navigate to="/admin" replace />;

  const handleChange = (e) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError('Credentials are required for secure access.');
      return;
    }
    setSubmitting(true);
    const result = await login(form.email, form.password);
    setSubmitting(false);
    if (result.success) navigate('/admin');
    else setError(result.message);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--color-bg-base)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      
      {/* Decorative Background Elements */}
      <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '40%', height: '40%', background: 'var(--color-primary)', opacity: 0.03, borderRadius: '50%', filter: 'blur(100px)' }} />
      <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '40%', height: '40%', background: 'var(--color-primary)', opacity: 0.03, borderRadius: '50%', filter: 'blur(100px)' }} />

      <div style={{ width: '100%', maxWidth: '440px', padding: '2rem', position: 'relative', zIndex: 1 }}>
        
        <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', textDecoration: 'none', marginBottom: '3rem', fontSize: '0.9rem', fontWeight: 600 }}>
           <ArrowLeft size={16} /> Back to User Login
        </Link>

        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              width: '60px', height: '60px',
              background: 'var(--color-primary)',
              borderRadius: '16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '1.5rem',
              boxShadow: '0 10px 25px rgba(139, 0, 0, 0.2)',
            }}
          >
            <ShieldCheck size={30} color="#FFFFFF" />
          </motion.div>
          <h1 className="font-display" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Management <span className="text-gradient">Portal</span></h1>
          <p style={{ color: 'var(--color-text-muted)', fontWeight: 500 }}>Secure administrative gateway for restaurant operations.</p>
        </div>

        {/* Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="card glass" 
          style={{ padding: '2.5rem', border: '1px solid var(--color-border)' }}
        >
          <form onSubmit={handleSubmit} noValidate>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

              {error && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{
                  display: 'flex', gap: '0.75rem', alignItems: 'center',
                  padding: '1rem', background: 'rgba(239, 68, 68, 0.1)',
                  borderRadius: 'var(--radius-md)', color: '#ef4444', fontSize: '0.9rem', fontWeight: 600
                }}>
                  <AlertCircle size={18} />
                  {error}
                </motion.div>
              )}

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Admin Identifier</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    className="form-input"
                    style={{ paddingLeft: '3rem' }}
                    placeholder="admin@simplerestaurant.com"
                    value={form.email}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" style={{ fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Security Key</label>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                  <input
                    type={showPw ? 'text' : 'password'}
                    name="password"
                    autoComplete="current-password"
                    className="form-input"
                    style={{ paddingLeft: '3rem', paddingRight: '3rem' }}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(p => !p)}
                    style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
                  >
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', padding: '1.25rem', borderRadius: 'var(--radius-sm)', marginTop: '0.5rem' }}
                disabled={submitting || loading}
              >
                {submitting ? 'Verifying Identity...' : 'Confirm Access'}
              </button>
            </div>
          </form>
        </motion.div>

        <div style={{ marginTop: '3rem', textAlign: 'center' }}>
           <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
              Device: <span style={{ color: 'var(--color-text-primary)' }}>{window.navigator.platform}</span> · Status: <span style={{ color: '#059669' }}>Encryption Active</span>
           </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
