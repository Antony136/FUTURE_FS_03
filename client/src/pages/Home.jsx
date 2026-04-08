import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, Star, Clock, Heart, Quote, Sparkles, ChefHat } from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle';
import { menuAPI } from '../api';

const TESTIMONIALS = [
  { id: 1, name: 'Elena Rodriguez', role: 'Food Critic', content: 'An absolute masterpiece. The fusion of flavors and the atmospheric design creates an experience that lingers long after the meal.', rating: 5 },
  { id: 2, name: 'James Wilson', role: 'Local Diners', content: 'Simple Restaurant has redefined fine dining in Manhattan. Every dish is a work of art, both visually and culinarily.', rating: 5 },
  { id: 3, name: 'Sophia Chen', role: 'Culinary Blogger', content: ' The attention to detail is unparalleled. From the service to the Wagyu, everything was perfection.', rating: 5 },
];

const Home = () => {
  usePageTitle('');
  const [featured, setFeatured] = useState([]);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    menuAPI.getAll().then(res => {
      const items = res.data.data || res.data || [];
      setFeatured(items.filter(i => i.isFeatured).slice(0, 3));
    });

    const timer = setInterval(() => {
      setActiveTestimonial(p => (p + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
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
          background: 'var(--color-bg-base)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url("https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1920&h=1080&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.4,
            transform: 'scale(1.05)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent, var(--color-bg-base) 95%)',
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
          <motion.div variants={fadeInUp} className="section-label" style={{ justifyContent: 'center' }}>
            Elevating the Art of Dining
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="font-display"
            style={{ marginBottom: '1.5rem', maxWidth: '1000px', marginInline: 'auto' }}
          >
            A Symphony of <span className="text-gradient">Flavours</span> <br />
            Beneath the Manhattan Sky
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            style={{
              maxWidth: '650px',
              margin: '0 auto 3.5rem',
              fontSize: '1.2rem',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.8,
            }}
          >
            Experience a culinary odyssey where heritage meets innovation. 
            Meticulously crafted dishes served in an atmosphere of timeless elegance.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <a href="/menu" className="btn btn-primary btn-lg">
              Explore Menu
            </a>
            <a href="/reservations" className="btn btn-outline btn-lg" style={{ color: 'var(--color-text-primary)', borderColor: 'var(--color-text-primary)' }}>
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
            bottom: '2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.75rem',
            color: 'var(--color-primary)',
          }}
        >
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ChevronDown size={24} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Featured Dishes ────────────────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--color-bg-base)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>The Autumn Collection</div>
            <h2 className="section-title">Seasonal <span className="text-gradient">Masterpieces</span></h2>
            <div className="gold-divider center" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '3rem' }}>
            {featured.length > 0 ? featured.map((item, i) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="card"
              >
                <div style={{ height: '300px', overflow: 'hidden', position: 'relative' }}>
                  <img src={item.image || 'https://images.unsplash.com/photo-1546241072-48010ad2862c?w=800&h=600&fit=crop'} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem' }}>
                    <span className="badge" style={{ padding: '0.5rem 1rem' }}>Featured</span>
                  </div>
                </div>
                <div style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <h3 style={{ margin: 0 }}>{item.name}</h3>
                    <span style={{ color: 'var(--color-primary)', fontWeight: 800, fontSize: '1.25rem' }}>${item.price}</span>
                  </div>
                  <p style={{ fontSize: '0.95rem', marginBottom: '2rem', minHeight: '3em' }}>{item.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < (item.rating || 5) ? 'var(--color-gold)' : 'transparent'} color="var(--color-gold)" />)}
                    </div>
                    <a href="/menu" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-primary)' }}>
                      Details <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </motion.div>
            )) : (
              [1,2,3].map(i => <div key={i} className="card skeleton" style={{ height: '500px' }} />)
            )}
          </div>
        </div>
      </section>

      {/* ── About Split Section ───────────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--color-bg-surface)', overflow: 'hidden' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '6rem', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="section-label">Our Philosophy</div>
              <h2 className="section-title font-display">Crafting Moments, <br />Not Just Meals</h2>
              <p style={{ fontSize: '1.15rem', marginBottom: '2.5rem', lineHeight: 1.9 }}>
                Simple Restaurant was founded on a simple yet profound belief: that dining should be a multisensory journey. 
                Our culinary team blends time-honoured techniques with progressive artistry to create dishes that tell a story of Manhattan’s vibrant heritage.
              </p>
              <ul style={{ listStyle: 'none', marginBottom: '3.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 500 }}>
                  <div style={{ color: 'var(--color-primary)' }}><Sparkles size={20} /></div> Sustainably Sourced Rare Ingredients
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 500 }}>
                  <div style={{ color: 'var(--color-primary)' }}><ChefHat size={20} /></div> Award-Winning Executive Culinary Team
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontWeight: 500 }}>
                  <div style={{ color: 'var(--color-primary)' }}><Heart size={20} /></div> Bespoke Service Tailored to You
                </li>
              </ul>
              <a href="/about" className="btn btn-primary">
                Learn More About Us <ArrowRight size={18} style={{ marginLeft: '0.5rem' }} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              style={{ position: 'relative' }}
            >
              <div style={{ position: 'absolute', inset: '-1.5rem', border: '2px solid var(--color-border-gold)', borderRadius: 'var(--radius-2xl)', zIndex: 0 }} />
              <img 
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1000&h=1200&fit=crop" 
                alt="Dining Experience" 
                style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-xl)', position: 'relative', zIndex: 1, boxShadow: 'var(--shadow-lg)' }} 
              />
              <div 
                className="glass"
                style={{ 
                  position: 'absolute', bottom: '2rem', left: '-2rem', padding: '1.5rem 2.5rem', borderRadius: 'var(--radius-lg)', 
                  display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 2, border: '1px solid var(--color-border-gold)'
                }}
              >
                <div style={{ color: 'var(--color-primary)', fontSize: '2.5rem', fontWeight: 800 }}>15+</div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600, lineHeight: 1.2 }}>Years of <br />Culinary Excellence</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--color-bg-base)', textAlign: 'center' }}>
        <div className="container">
          <div className="section-label" style={{ justifyContent: 'center' }}>Kind words</div>
          <h2 className="section-title">What Our <span className="text-gradient">Guests Say</span></h2>
          
          <div style={{ maxWidth: '800px', margin: '4rem auto', position: 'relative', minHeight: '300px' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Quote size={48} color="var(--color-primary)" style={{ opacity: 0.2, marginBottom: '2rem' }} />
                <p style={{ fontSize: '1.65rem', fontFamily: 'var(--font-display)', fontStyle: 'italic', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                  "{TESTIMONIALS[activeTestimonial].content}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                  <div style={{ padding: '0.2rem', border: '1px solid var(--color-gold)', borderRadius: '50%' }}>
                    <div style={{ width: '50px', height: '50px', background: 'var(--color-bg-surface)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Star size={20} fill="var(--color-gold)" color="var(--color-gold)" />
                    </div>
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{TESTIMONIALS[activeTestimonial].name}</div>
                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{TESTIMONIALS[activeTestimonial].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '4rem' }}>
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  style={{ 
                    width: i === activeTestimonial ? '30px' : '10px', 
                    height: '10px', 
                    borderRadius: '5px',
                    background: i === activeTestimonial ? 'var(--color-primary)' : 'var(--color-border)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Premium CTA ───────────────────────────────────────────────────── */}
      <section className="section" style={{ background: 'var(--color-bg-surface)', position: 'relative', overflow: 'hidden' }}>
        <div 
          style={{ 
            position: 'absolute', inset: 0, 
            backgroundImage: 'url("https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&h=600&fit=crop")',
            backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1
          }} 
        />
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass"
            style={{ padding: '6rem 2rem', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--color-border-gold)' }}
          >
            <h2 className="font-display" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Ready to Experience <span className="text-gradient">True Excellence?</span></h2>
            <p style={{ maxWidth: '600px', margin: '0 auto 3.5rem', fontSize: '1.25rem' }}>
              Indulge in a world where luxury meets tradition. Secure your table at Simple Restaurant today.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/reservations" className="btn btn-primary btn-lg" style={{ borderRadius: 'var(--radius-sm)' }}>Book Your Journey Now</a>
              <a href="/contact" className="btn btn-outline btn-lg" style={{ borderRadius: 'var(--radius-sm)', borderColor: 'var(--color-text-primary)', color: 'var(--color-text-primary)' }}>Contact Concierge</a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
