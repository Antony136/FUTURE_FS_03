import usePageTitle from '../hooks/usePageTitle';

const Menu = () => {
  usePageTitle('Our Menu');
  return (
    <div className="page-enter section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-label">What We Serve</div>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-display)' }}>Our Menu</h2>
          <div className="gold-divider center" />
          <p style={{ maxWidth: '520px', margin: '0 auto' }}>
            Explore our handcrafted dishes, from hearty starters to divine desserts.
          </p>
        </div>
        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>
          🍽️ Full menu with filters &amp; search coming in Phase 4
        </p>
      </div>
    </div>
  );
};
export default Menu;
