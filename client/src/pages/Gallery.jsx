import usePageTitle from '../hooks/usePageTitle';

const Gallery = () => {
  usePageTitle('Gallery');
  return (
    <div className="page-enter section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-label">Moments &amp; Flavours</div>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-display)' }}>Gallery</h2>
          <div className="gold-divider center" />
        </div>
        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>
          🖼️ Masonry gallery with lightbox coming in Phase 4
        </p>
      </div>
    </div>
  );
};
export default Gallery;
