import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ArrowRight, Star, Clock, Users, Utensils } from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle';
import { menuAPI } from '../api';

const Home = () => {
  usePageTitle('');
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    menuAPI.getAll().then(res => {
      const items = res.data.data || res.data || [];
      setFeatured(items.filter(i => i.isFeatured).slice(0, 3));
    });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  return (
    <div className="page-enter">
      {/* ── Hero Section ─────────────────────────────────────────────────── */}
      <section
        id="home-hero"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: '#0a0a0a',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url("/hero-bg.png")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            opacity: 0.5,
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(15,13,10,0.8) 0%, rgba(15,13,10,0.4) 50%, rgba(15,13,10,0.9) 100%)',
            zIndex: 1,
          }}
        />

        <motion.div
          className="container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}
        >
          <motion.div variants={itemVariants} className="section-label">
            Est. 2024 — Manhattan, NY
          </motion.div>

          <motion.h1
            variants={itemVariants}
            style={{
              fontFamily: 'var(--font-display)',
              marginBottom: '1.5rem',
              maxWidth: '900px',
              marginInline: 'auto',
            }}
          >
            A Culinary Journey<br />
            <span className="text-gradient">Beyond the Horizon</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            style={{
              maxWidth: '600px',
              margin: '0 auto 3rem',
              fontSize: '1.15rem',
              color: 'var(--color-warm-200)',
              lineHeight: 1.8,
            }}
          >
            Savour globally-inspired flavours, meticulously crafted with passion. 
            Experience an atmosphere where every detail is a masterpiece.
          </motion.p>

          <motion.div
            variants={itemVariants}
            style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <a href="/menu" className="btn btn-primary btn-lg">
              Explore Our Menu
            </a>
            <a href="/reservations" className="btn btn-outline btn-lg">
              Reserve a Table
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--color-gold-400)',
          }}
        >
          <span style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600 }}>Explore More</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Featured Dishes Section ────────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--color-bg-base)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', gap: '2rem', flexWrap: 'wrap' }}>
            <div>
              <div className="section-label" style={{ marginLeft: 0 }}>The Chef's Choice</div>
              <h2 className="section-title" style={{ fontFamily: 'var(--font-display)', margin: 0 }}>Featured <span className="text-gradient">Masterpieces</span></h2>
            </div>
            <a href="/menu" className="btn btn-ghost" style={{ gap: '0.5rem' }}>
              View Full Menu <ArrowRight size={16} />
            </a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {featured.map((item, i) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card"
              >
                <div style={{ height: '260px', overflow: 'hidden', position: 'relative' }}>
                  <img src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop'} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                    <span className="badge badge-featured">Featured</span>
                  </div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-heading)' }}>{item.name}</h3>
                    <span style={{ color: 'var(--color-gold-400)', fontWeight: 700 }}>${item.price}</span>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>{item.description}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Star size={12} fill="currentColor" /> {item.rating || 4.9}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={12} /> 15-20 min</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Preview Section ─────────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--color-bg-surface)', overflow: 'hidden' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '5rem', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="section-label" style={{ marginLeft: 0 }}>Our Philosophy</div>
              <h2 className="section-title" style={{ fontFamily: 'var(--font-display)', marginBottom: '1.5rem' }}>Where Every Detail <br />is a <span className="text-gradient">Masterpiece</span></h2>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem', color: 'var(--color-text-secondary)' }}>
                At Savory Skies, we believe dining is more than just a meal—it's an emotional journey. Our chefs combine heritage techniques with limitless creativity to serve moments you'll never forget.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
                <div>
                  <div style={{ color: 'var(--color-gold-400)', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.25rem' }}>12+</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Global Awards</div>
                </div>
                <div>
                  <div style={{ color: 'var(--color-gold-400)', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.25rem' }}>100%</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Organic Sourcing</div>
                </div>
              </div>
              <a href="/about" className="btn btn-outline" style={{ gap: '0.5rem' }}>
                Discover Our Story <ArrowRight size={16} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ position: 'relative' }}
            >
              <div style={{ position: 'absolute', inset: '-1.5rem', border: '1px solid var(--color-border-gold)', borderRadius: 'var(--radius-xl)', zIndex: 0 }} />
              <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=1000&fit=crop" alt="Experience" style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-xl)', position: 'relative', zIndex: 1, boxShadow: 'var(--shadow-elevated)' }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA Section ─────────────────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--color-bg-base)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass"
            style={{ padding: '5rem 2rem', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--color-border-gold)' }}
          >
            <h2 className="section-title" style={{ fontFamily: 'var(--font-display)', marginBottom: '1.5rem' }}>Ready to Experience <span className="text-gradient">Savory Skies?</span></h2>
            <p style={{ maxWidth: '500px', margin: '0 auto 3rem', color: 'var(--color-text-secondary)', fontSize: '1.1rem' }}>
              Tables are filling up fast for this weekend. Reserve your spot today for an unforgettable evening.
            </p>
            <a href="/reservations" className="btn btn-primary btn-lg">Book Your Table Now</a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
