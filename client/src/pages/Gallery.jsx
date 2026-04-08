import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, Camera, Star, Sparkles, LayoutGrid } from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle';

const GALLERY_IMAGES = [
  { id: 1, src: 'https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?w=800&auto=format&fit=crop', category: 'Main', title: 'Signature Wagyu' },
  { id: 2, src: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1000&h=800&fit=crop', category: 'Cocktails', title: 'Midnight Muse' },
  { id: 3, src: 'https://images.unsplash.com/photo-1521017432531-fbd92d74426b?w=800&h=1000&fit=crop', category: 'Ambiance', title: 'The Golden Lounge' },
  { id: 4, src: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=1200&h=800&fit=crop', category: 'Chef', title: 'Precision in Motion' },
  { id: 5, src: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=800&h=1000&fit=crop', category: 'Chef', title: 'Precision & Passion' },
  { id: 6, src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1000&h=800&fit=crop', category: 'Main', title: 'Coastal Delight' },
  { id: 7, src: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=800&fit=crop', category: 'Ambiance', title: 'Main Dining Room' },
  { id: 8, src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1000&h=800&fit=crop', category: 'Main', title: 'Truffle Infusion' },
];

const Gallery = () => {
  usePageTitle('Gallery');
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...new Set(GALLERY_IMAGES.map(img => img.category))];
  const filteredImages = filter === 'All' ? GALLERY_IMAGES : GALLERY_IMAGES.filter(img => img.category === filter);

  return (
    <div className="page-enter section" style={{ background: 'var(--color-bg-base)', paddingTop: '10rem' }}>
      <div className="container">
        
        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Visual Masterpieces</div>
          <h2 className="font-display">Our <span className="text-gradient">Gallery</span></h2>
          <div className="gold-divider center" />
          <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
            A glimpse into the artistry, passion, and elegance that defines Every moment at Simple Restaurant.
          </p>
        </div>

        {/* ── Filters ───────────────────────────────────────────────────────── */}
        <div 
          className="no-scrollbar"
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '1rem', 
            marginBottom: '4rem',
            overflowX: 'auto',
            paddingBottom: '1rem'
          }}
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '0.75rem 1.75rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid',
                borderColor: filter === cat ? 'var(--color-primary)' : 'var(--color-border)',
                background: filter === cat ? 'var(--color-primary)' : 'transparent',
                color: filter === cat ? '#FFFFFF' : 'var(--color-text-secondary)',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s ease'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Masonry Grid ─────────────────────────────────────────────── */}
        <div 
          style={{ 
            columns: '1 350px', 
            columnGap: '1.5rem',
          }}
        >
          {filteredImages.map((img) => (
            <motion.div
              layout
              key={img.id}
              onClick={() => setSelectedImage(img)}
              className="gallery-item"
              style={{
                marginBottom: '1.5rem',
                breakInside: 'avoid',
                position: 'relative',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                cursor: 'pointer',
                background: 'var(--color-bg-card)',
                boxShadow: 'var(--shadow-sm)'
              }}
              whileHover="hover"
            >
              <img
                src={img.src}
                alt={img.title}
                loading="lazy"
                style={{ width: '100%', display: 'block', transition: 'transform 0.6s ease' }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              />
              
              <div
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent 70%)',
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                  padding: '1.5rem', opacity: 0, transition: 'opacity 0.3s ease'
                }}
                className="image-overlay"
              >
                <div style={{ color: 'var(--color-gold)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.25rem' }}>
                  {img.category.toUpperCase()}
                </div>
                <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', margin: 0 }}>{img.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="modal-overlay"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={e => e.stopPropagation()}
                style={{ maxWidth: '1000px', width: '100%', position: 'relative' }}
              >
                <button
                  onClick={() => setSelectedImage(null)}
                  style={{
                    position: 'absolute', top: '-3rem', right: '0', 
                    background: 'none', border: 'none', color: '#FFF', cursor: 'pointer'
                  }}
                >
                  <X size={32} />
                </button>
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}
                />
                <div style={{ padding: '1.5rem 0', color: '#FFF', textAlign: 'center' }}>
                  <h3 className="font-display" style={{ marginBottom: '0.5rem', color: '#FFF' }}>{selectedImage.title}</h3>
                  <div style={{ color: 'var(--color-gold)', fontSize: '0.85rem', fontWeight: 600 }}>{selectedImage.category}</div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <style>{`
          .gallery-item:hover .image-overlay { opacity: 1 !important; }
        `}</style>
      </div>
    </div>
  );
};

export default Gallery;
