import usePageTitle from '../hooks/usePageTitle';

const About = () => {
  usePageTitle('Our Story');
  return (
    <div className="page-enter section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-label">Who We Are</div>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-display)' }}>Our Story</h2>
          <div className="gold-divider center" />
        </div>
        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>
          📖 Full about page with chef profiles &amp; timeline coming in Phase 4
        </p>
      </div>
    </div>
  );
};
export default About;
