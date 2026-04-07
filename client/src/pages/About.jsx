import { motion } from 'framer-motion';
import { ChefHat, Award, Sparkles, Heart, Clock, Utensils, History, Star } from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle';

const About = () => {
  usePageTitle('Our Story');

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  const PHILOSOPHY = [
    { title: 'The Finest Ingredients', desc: 'Sourced from the most reputable local and global suppliers, we ensure every dish begins with excellence.', icon: Utensils },
    { title: 'Culinary Passion', desc: 'Our chefs bring decades of combined experience and a relentless pursuit of culinary innovation.', icon: Heart },
    { title: 'Bespoke Experience', desc: 'From the first welcome to the final farewell, we provide service that is truly tailored to you.', icon: Star },
  ];

  return (
    <div className="page-enter" style={{ background: 'var(--color-bg-base)' }}>
      
      {/* ── Hero Section ─────────────────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: '10rem', background: 'var(--color-bg-surface)', textAlign: 'center', position: 'relative' }}>
        <div className="container">
          <div className="section-label" style={{ justifyContent: 'center' }}>The Heart of Savory Skies</div>
          <h1 className="font-display" style={{ marginBottom: '2rem' }}>About Our <span className="text-gradient">Heritage</span></h1>
          <div className="gold-divider center" />
          <p style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.25rem' }}>
            A journey that began with a single vision: to transform dining into an unforgettable multisensory experience.
          </p>
        </div>
      </section>

      {/* ── Story Split ─────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '6rem', alignItems: 'center' }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <div className="section-label">Since 2024</div>
              <h2 className="font-display" style={{ marginBottom: '2.5rem' }}>Where Tradition Meets <span className="text-gradient">Innovation</span></h2>
              <p style={{ fontSize: '1.15rem', lineHeight: 1.9, marginBottom: '2.5rem' }}>
                Founded in the heart of Manhattan, Savory Skies was born from a desire to push the boundaries of traditional fine dining. 
                What started as a small, passionate group of chefs and critics has grown into a destination for those who seek the extraordinary.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--color-primary)', background: 'var(--color-bg-surface)', padding: '0.75rem', borderRadius: '12px' }}>
                    <ChefHat size={20} />
                  </div>
                  <div>
                    <h4 style={{ marginBottom: '0.25rem' }}>Masterchefs at the Helm</h4>
                    <p style={{ fontSize: '0.9rem' }}>An executive team with 3 Michelin stars and 20+ collective years of global experience.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ color: 'var(--color-primary)', background: 'var(--color-bg-surface)', padding: '0.75rem', borderRadius: '12px' }}>
                    <History size={20} />
                  </div>
                  <div>
                    <h4 style={{ marginBottom: '0.25rem' }}>Sustaining Culture</h4>
                    <p style={{ fontSize: '0.9rem' }}>Integrating historical recipes with modern presentation to create timeless taste.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              style={{ position: 'relative' }}
            >
              <div style={{ position: 'absolute', inset: '-1.5rem', border: '2px solid var(--color-border-gold)', borderRadius: 'var(--radius-2xl)', zIndex: 0 }} />
              <img 
                src="https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1000&auto=format&fit=crop" 
                alt="Chef in Action" 
                style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-xl)', position: 'relative', zIndex: 1, boxShadow: 'var(--shadow-lg)' }} 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Philosophy Section ───────────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--color-bg-surface)', overflow: 'hidden' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>The Pillar of our Craft</div>
            <h2 className="font-display">Our <span className="text-gradient">Philosophy</span></h2>
            <div className="gold-divider center" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
            {PHILOSOPHY.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card"
                style={{ padding: '3.5rem 2.5rem', textAlign: 'center' }}
              >
                <item.icon size={48} color="var(--color-primary)" style={{ marginBottom: '2rem', marginInline: 'auto' }} />
                <h3 style={{ marginBottom: '1.25rem', fontSize: '1.5rem' }}>{item.title}</h3>
                <p style={{ lineHeight: 1.75 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Milestones Gallery ──────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div style={{ gridRow: 'span 2', position: 'relative' }}>
              <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=1200&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-lg)' }} alt="Dish" />
            </div>
            <div style={{ height: '300px' }}>
              <img src="https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800&h=600&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-lg)' }} alt="Cocktail" />
            </div>
            <div style={{ height: '300px' }}>
              <img src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&h=600&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-lg)' }} alt="Chef" />
            </div>
            <div style={{ gridColumn: 'span 2', height: '400px' }}>
              <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--radius-lg)' }} alt="Dining Room" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer Link ──────────────────────────────────────────────────── */}
      <section className="section" style={{ textAlign: 'center', background: 'var(--color-bg-base)' }}>
        <div className="container">
          <ChefHat size={64} style={{ opacity: 0.1, marginBottom: '3rem' }} />
          <h2 className="font-display">Experience it Yourself</h2>
          <p style={{ maxWidth: '500px', margin: '2rem auto 4rem' }}>
            Our doors are always open for those who seek the extraordinary. Join us for an evening you won’t forget.
          </p>
          <a href="/reservations" className="btn btn-primary btn-lg" style={{ borderRadius: '4px' }}>
            Book a Journey
          </a>
        </div>
      </section>
    </div>
  );
};

export default About;
