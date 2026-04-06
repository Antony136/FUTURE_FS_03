import usePageTitle from '../hooks/usePageTitle';

const Home = () => {
  usePageTitle('');
  return (
    <div className="page-enter">
      {/* Hero, FeaturedDishes, About Preview, Testimonials — Phase 4 */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="section-label">Welcome to Savory Skies</div>
          <h1 className="section-title" style={{ fontFamily: 'var(--font-display)', marginBottom: '1.5rem' }}>
            A Culinary Journey<br />
            <span className="text-gradient">Beyond the Horizon</span>
          </h1>
          <p style={{ maxWidth: '560px', margin: '0 auto 2.5rem', fontSize: '1.1rem' }}>
            Globally-inspired flavours, crafted with passion. Reserve your table and experience dining reimagined.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/menu" className="btn btn-primary btn-lg">Explore Menu</a>
            <a href="/reservations" className="btn btn-outline btn-lg">Reserve a Table</a>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
