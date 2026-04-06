import { Link } from 'react-router-dom';
import { Home, ChefHat } from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle';

const NotFound = () => {
  usePageTitle('Page Not Found');
  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem',
    }}>
      <div>
        {/* Gold icon */}
        <div style={{
          width: '80px', height: '80px',
          borderRadius: '50%',
          background: 'rgba(196,144,32,0.1)',
          border: '1px solid var(--color-border-gold)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.5rem',
        }}>
          <ChefHat size={36} style={{ color: 'var(--color-gold-400)' }} />
        </div>

        {/* 404 */}
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(5rem, 15vw, 9rem)', fontWeight: 700, lineHeight: 1, background: 'linear-gradient(135deg, var(--color-gold-400), var(--color-gold-600))', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '0.5rem' }}>
          404
        </div>

        <h1 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', marginBottom: '1rem', color: 'var(--color-text-primary)' }}>
          Page Not Found
        </h1>
        <p style={{ maxWidth: '400px', margin: '0 auto 2rem', color: 'var(--color-text-muted)', lineHeight: 1.75 }}>
          Looks like this dish isn't on our menu. The page you're looking for has moved or doesn't exist.
        </p>

        <Link to="/" id="back-home-btn" className="btn btn-primary">
          <Home size={16} />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
