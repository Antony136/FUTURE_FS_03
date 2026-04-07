import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Camera } from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle';

const GALLERY_IMAGES = [
  { id: 1, src: '/dish1.png', category: 'Main', title: 'Signature Wagyu Experience' },
  { id: 2, src: '/dish2.png', category: 'Dessert', title: 'Citrus Sensation' },
  { id: 3, src: 'https://images.unsplash.com/photo-1550966842-8877144e597d?w=800&h=600&fit=crop', category: 'Ambiance', title: 'Golden Hour Lounge' },
  { id: 4, src: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=600&h=800&fit=crop', category: 'Cocktails', title: 'Midnight Muse' },
  { id: 5, src: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&h=1000&fit=crop', category: 'Chef', title: 'Precision & Passion' },
  { id: 6, src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop', category: 'Main', title: 'Coastal Delight' },
  { id: 7, src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop', category: 'Ambiance', title: 'Main Dining Room' },
  { id: 8, src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1000&h=800&fit=crop', category: 'Main', title: 'Truffle Infusion' },
];

const Gallery = () => {
  usePageTitle('Gallery');
  const [selectedImage, setSelectedImage] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="page-enter section">
      <div className="container">
        
        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div className="section-label">Moments &amp; Flavours</div>
          <h2 className="section-title" style={{ fontFamily: 'var(--font-display)' }}>Our <span className="text-gradient">Gallery</span></h2>
          <div className="gold-divider center" />
          <p style={{ maxWidth: '560px', margin: '0 auto', color: 'var(--color-text-secondary)' }}>
            A glimpse into the craftsmanship, ambiance, and flavors that define Savory Skies.
          </p>
        </div>

        {/* ── Masonry Grid ─────────────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            columns: '1 300px',
            columnGap: '1.5rem',
            padding: '1rem 0',
          }}
        >
          {GALLERY_IMAGES.map((img) => (
            <motion.div
              key={img.id}
              variants={itemVariants}
              onClick={() => setSelectedImage(img)}
              style={{
                marginBottom: '1.5rem',
                breakInside: 'avoid',
                position: 'relative',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                cursor: 'pointer',
                background: 'var(--color-bg-card)',
                boxShadow: 'var(--shadow-card)',
              }}
              whileHover="hover"
            >
              <img
                src={img.src}
                alt={img.title}
                loading="lazy"
                style={{
                  width: '100%',
                  display: 'block',
                  transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
              
              {/* Overlay on Hover */}
              <motion.div
                variants={{
                  hover: { opacity: 1 },
                  initial: { opacity: 0 }
                }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15,13,10,0.9) 0%, rgba(15,13,10,0.2) 60%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '1.5rem',
                  opacity: 0,
                  zIndex: 2,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>{img.category}</span>
                    <h4 style={{ color: 'var(--color-text-primary)', margin: 0 }}>{img.title}</h4>
                  </div>
                  <div style={{
                    width: '36px', height: '36px', boderRadius: '50%',
                    background: 'var(--color-gold-500)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', color: '#0f0d0a'
                  }}>
                    <ZoomIn size={18} />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Lightbox Modal ─────────────────────────────────────────────────── */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 1000,
                background: 'rgba(5, 5, 5, 0.95)',
                backdropFilter: 'blur(10px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
              }}
              onClick={() => setSelectedImage(null)}
            >
              <motion.button
                style={{
                  position: 'absolute',
                  top: '2rem',
                  right: '2rem',
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  zIndex: 1001,
                }}
                onClick={() => setSelectedImage(null)}
              >
                <X size={32} />
              </motion.button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                style={{ position: 'relative', maxWidth: '1000px', width: '100%' }}
                onClick={e => e.stopPropagation()}
              >
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  style={{
                    width: '100%',
                    maxHeight: '80vh',
                    objectFit: 'contain',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: '0 0 40px rgba(0,0,0,0.8)',
                  }}
                />
                <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                  <span className="badge badge-gold" style={{ marginBottom: '0.5rem' }}>{selectedImage.category}</span>
                  <h3 style={{ fontSize: '1.5rem', color: 'var(--color-text-primary)' }}>{selectedImage.title}</h3>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Social CTA ────────────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginTop: '6rem', padding: '4rem', background: 'var(--color-bg-surface)', borderRadius: 'var(--radius-2xl)' }}>
          <Camera size={32} style={{ color: 'var(--color-gold-400)', marginBottom: '1rem' }} />
          <h3 style={{ marginBottom: '1rem' }}>Follow Our Journey</h3>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Share your moments at Savory Skies and tag us to be featured on our feed.</p>
          <a href="#" className="btn btn-outline">
            @SavorySkies
          </a>
        </div>

      </div>
    </div>
  );
};

export default Gallery;
