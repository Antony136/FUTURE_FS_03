import usePageTitle from '../hooks/usePageTitle';

const Contact = () => {
  usePageTitle('Contact Us');
  return (
    <div className="page-enter section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-label">Get in Touch</div>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-display)' }}>Contact Us</h2>
          <div className="gold-divider center" />
        </div>
        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}>
          📞 Full contact form &amp; Google Maps coming in Phase 4
        </p>
      </div>
    </div>
  );
};
export default Contact;
