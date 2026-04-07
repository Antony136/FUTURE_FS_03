import { motion } from 'framer-motion';
import { ChefHat, History, Award, Heart, Sparkles } from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle';

const About = () => {
  usePageTitle('Our Story');

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <div className="page-enter">
      
      {/* ── Header Section ─────────────────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--color-bg-surface)', paddingTop: '6rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="section-label"
            >
              The Heart of Savory Skies
            </motion.div>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="section-title"
              style={{ fontFamily: 'var(--font-display)', marginBottom: '1.5rem' }}
            >
              Our <span className="text-gradient">Story</span>
            </motion.h2>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="gold-divider center"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-gold-300)' }}>A Vision for Excellence</h3>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                Founded in 2024, Savory Skies was born out of a desire to create a dining space that transcends the ordinary. Our journey began with a simple mission: to blend global culinary traditions with modern, artistic presentation.
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                Every dish tells a story of heritage, passion, and the endless pursuit of perfection. From the sourcing of our rare ingredients to the final brushstroke on the plate, we are dedicated to providing an unforgettable experience.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              style={{ position: 'relative' }}
            >
              <div style={{
                position: 'absolute',
                inset: '-1rem',
                border: '2px solid var(--color-border-gold)',
                borderRadius: 'var(--radius-xl)',
                zIndex: 0,
              }} />
              <img
                src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&h=600&fit=crop"
                alt="Restaurant interior"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-xl)',
                  position: 'relative',
                  zIndex: 1,
                  boxShadow: 'var(--shadow-elevated)',
                }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Values Section ─────────────────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--color-bg-base)' }}>
        <div className="container">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem' }}
          >
            {[
              { icon: Heart,   title: 'Crafted with Passion', desc: 'We believe that the secret ingredient in every dish is the love and care of our chefs.' },
              { icon: Sparkles, title: 'Artistic Innovation', desc: 'Our menu is a canvas where traditional flavors meet modern techniques.' },
              { icon: History, title: 'Globally Inspired',  desc: 'Exploring the world one plate at a time, bringing diverse cultures to your table.' },
              { icon: Award,   title: 'Quality First',      desc: 'Only the freshest, locally-sourced ingredients make it into our kitchen.' },
            ].map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  variants={fadeInUp}
                  className="card"
                  style={{ padding: '2.5rem', textAlign: 'center', background: 'var(--color-bg-surface)' }}
                >
                  <div style={{
                    width: '60px', height: '60px',
                    margin: '0 auto 1.5rem',
                    background: 'rgba(196, 144, 32, 0.1)',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--color-gold-400)'
                  }}>
                    <Icon size={28} />
                  </div>
                  <h4 style={{ marginBottom: '1rem', color: 'var(--color-text-primary)' }}>{value.title}</h4>
                  <p style={{ fontSize: '0.9rem' }}>{value.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── Meet the Chefs Section ─────────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--color-bg-surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="section-label">The Visionaries</div>
            <h2 className="section-title">Meet Our <span className="text-gradient">Experts</span></h2>
            <div className="gold-divider center" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
            {/* Chef 1 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="card"
              style={{ overflow: 'hidden' }}
            >
              <div style={{ height: '400px', overflow: 'hidden' }}>
                <img
                  src="/chef.png"
                  alt="Head Chef Marcus Sterling"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Marcus Sterling</h3>
                <p className="section-label" style={{ fontSize: '0.7rem', color: 'var(--color-gold-500)', marginBottom: '1rem' }}>Executive Head Chef</p>
                <p style={{ fontSize: '0.925rem' }}>
                  With over 20 years of experience in Michelin-starred restaurants across Europe, Marcus brings a disciplined yet daring approach to every dish.
                </p>
              </div>
            </motion.div>

            {/* Chef 2 */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
              className="card"
              style={{ overflow: 'hidden' }}
            >
              <div style={{ height: '400px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src="https://images.unsplash.com/photo-1583394238182-6f3ad3c29d65?w=800&h=1000&fit=crop"
                  alt="Pastry Chef Elena Rossi"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>Elena Rossi</h3>
                <p className="section-label" style={{ fontSize: '0.7rem', color: 'var(--color-gold-500)', marginBottom: '1rem' }}>Master Pastry Chef</p>
                <p style={{ fontSize: '0.925rem' }}>
                  Elena's creations are more than just desserts—they are sculpted masterpieces that redefine the boundaries of sweetness and texture.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
