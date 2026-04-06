import usePageTitle from '../hooks/usePageTitle';

const Reservations = () => {
  usePageTitle('Reserve a Table');
  return (
    <div className="page-enter section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-label">Book Your Experience</div>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-display)' }}>Reserve a Table</h2>
          <div className="gold-divider center" />
        </div>
        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>
          📅 Interactive reservation form coming in Phase 4
        </p>
      </div>
    </div>
  );
};
export default Reservations;
