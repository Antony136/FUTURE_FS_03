import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';

/**
 * Shared layout for all public pages.
 * Uses React Router's <Outlet /> to render the matched child route.
 */
const Layout = () => {
  return (
    <>
      <Navbar />
      <main style={{ flex: 1, paddingTop: '72px' }}>
        <Outlet />
      </main>
      <Footer />
      <Toaster
        position="top-right"
        gutter={8}
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--color-bg-elevated)',
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border-gold)',
            borderRadius: 'var(--radius-md)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            boxShadow: 'var(--shadow-elevated)',
          },
          success: {
            iconTheme: {
              primary: 'var(--color-gold)',
              secondary: 'var(--color-bg-base)',
            },
          },
          error: {
            iconTheme: {
              primary: 'var(--color-error)',
              secondary: 'var(--color-bg-base)',
            },
          },
        }}
      />
    </>
  );
};

export default Layout;
