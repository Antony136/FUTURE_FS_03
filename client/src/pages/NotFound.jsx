import { Link } from 'react-router-dom';
import { Home, ChefHat, Search, MoveLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import usePageTitle from '../hooks/usePageTitle';

const NotFound = () => {
  usePageTitle('Page Not Found');
  return (
    <div className="section page-enter" style={{ minHeight: '90vh', background: 'var(--color-bg-base)', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ duration: 0.6 }}
           style={{
             width: '120px', height: '120px',
             background: 'var(--color-bg-surface)',
             borderRadius: '30px',
             border: '1px solid var(--color-border)',
             display: 'flex', alignItems: 'center', justifyContent: 'center',
             margin: '0 auto 3rem',
             boxShadow: 'var(--shadow-md)',
             position: 'relative'
           }}
        >
          <ChefHat size={48} color="var(--color-primary)" />
          <div style={{ position: 'absolute', bottom: '-10px', right: '-10px', background: 'var(--color-primary)', color: 'white', padding: '10px', borderRadius: '50%', boxShadow: 'var(--shadow-sm)' }}>
             <Search size={18} />
          </div>
        </motion.div>

        <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.2 }}
        >
          <h1 className="font-display" style={{ fontSize: 'clamp(5rem, 15vw, 10rem)', lineHeight: 1, marginBottom: '1.5rem' }}>
             4<span className="text-gradient">0</span>4
          </h1>
          
          <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--color-text-primary)' }}>
             Table Not Found
          </h2>
          
          <p style={{ maxWidth: '500px', margin: '0 auto 3.5rem', color: 'var(--color-text-muted)', fontSize: '1.1rem', lineHeight: 1.8 }}>
             It seems this page has been taken off our menu or moved to a different location. 
             Allow us to guide you back to our main lounge.
          </p>

          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
             <Link to="/" className="btn btn-primary btn-lg" style={{ borderRadius: '4px' }}>
                <Home size={18} style={{ marginRight: '0.75rem' }} /> Return to Home
             </Link>
             <Link to="/menu" className="btn btn-outline btn-lg" style={{ borderRadius: '4px', borderColor: 'var(--color-text-primary)', color: 'var(--color-text-primary)' }}>
                <MoveLeft size={18} style={{ marginRight: '0.75rem' }} /> Explore Menu
             </Link>
          </div>
        </motion.div>

        {/* Background elements */}
        <div style={{ position: 'absolute', top: '20%', left: '10%', opacity: 0.05, pointerEvents: 'none' }}>
           <ChefHat size={300} />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
