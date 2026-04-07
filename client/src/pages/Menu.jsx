import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Leaf, Utensils, Star, Soup, Salad, Cake, Coffee, SearchX, ShoppingBag } from 'lucide-react';
import toast from 'react-hot-toast';
import { menuAPI } from '../api';
import usePageTitle from '../hooks/usePageTitle';

const CATEGORIES = [
  { id: 'All',          label: 'All Items',   icon: Utensils },
  { id: 'Starters',     label: 'Starters',    icon: Star     },
  { id: 'Soups',        label: 'Soups',       icon: Soup     },
  { id: 'Main Course',  label: 'Main Course', icon: Salad    },
  { id: 'Desserts',     label: 'Desserts',    icon: Cake     },
  { id: 'Beverages',    label: 'Beverages',   icon: Coffee   },
];

const Menu = () => {
  usePageTitle('Our Menu');

  const [items, setItems]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [search, setSearch]         = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [vegOnly, setVegOnly]       = useState(false);

  // ── Fetch Menu ────────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const res = await menuAPI.getAll();
        setItems(res.data.data || res.data || []);
      } catch (err) {
        toast.error('Failed to load menu items. Please try again.');
        console.error('Menu load error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  // ── Filtering Logic ──────────────────────────────────────────────────────
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch   = item.name.toLowerCase().includes(search.toLowerCase()) || 
                              item.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesVeg      = !vegOnly || item.isVeg;
      return matchesSearch && matchesCategory && matchesVeg;
    });
  }, [items, search, activeCategory, vegOnly]);

  return (
    <div className="page-enter section">
      <div className="container">

        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-label"
          >
            Culinary Masterpieces
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="section-title"
            style={{ fontFamily: 'var(--font-display)', marginBottom: '1.5rem' }}
          >
            Our <span className="text-gradient">Signature</span> Menu
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="gold-divider center"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-text-secondary)' }}
          >
            From traditional classics to contemporary innovations, explore our carefully curated selection of globally-inspired dishes.
          </motion.p>
        </div>

        {/* ── Controls Section ────────────────────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            marginBottom: '3.5rem',
          }}
        >
          {/* Search & Toggle Row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
            <div className="form-group" style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
              <Search
                size={18}
                style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }}
              />
              <input
                type="text"
                className="form-input"
                placeholder="Search for dishes, ingredients..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ paddingLeft: '3rem' }}
              />
            </div>

            <button
              onClick={() => setVegOnly(p => !p)}
              className={`btn ${vegOnly ? 'btn-primary' : 'btn-ghost'}`}
              style={{ padding: '0.625rem 1.25rem', borderRadius: 'var(--radius-xl)' }}
            >
              <Leaf size={16} strokeWidth={2.5} color={vegOnly ? '#0f0d0a' : '#4ade80'} />
              <span>Veg Only</span>
            </button>
          </div>

          {/* Categories Tabs */}
          <div
            className="no-scrollbar"
            style={{
              display: 'flex',
              gap: '0.75rem',
              overflowX: 'auto',
              padding: '0.5rem 0.25rem',
            }}
          >
            {CATEGORIES.map(cat => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.625rem',
                    padding: '0.75rem 1.25rem',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--color-gold-500)' : 'var(--color-border)',
                    background: isActive ? 'rgba(196, 144, 32, 0.1)' : 'var(--color-bg-elevated)',
                    color: isActive ? 'var(--color-gold-200)' : 'var(--color-text-muted)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: isActive ? 600 : 500,
                    fontSize: '0.875rem',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    transition: 'all 200ms ease',
                    boxShadow: isActive ? 'var(--shadow-gold-sm)' : 'none',
                  }}
                  onMouseEnter={e => !isActive && (e.currentTarget.style.borderColor = 'var(--color-warm-600)')}
                  onMouseLeave={e => !isActive && (e.currentTarget.style.borderColor = 'var(--color-border)')}
                >
                  <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Menu Grid ───────────────────────────────────────────────────────── */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="card" style={{ height: '420px', padding: 0 }}>
                <div className="skeleton" style={{ height: '240px', borderRadius: 0 }} />
                <div style={{ padding: '1.5rem' }}>
                  <div className="skeleton" style={{ height: '1.5rem', width: '70%', marginBottom: '1rem' }} />
                  <div className="skeleton" style={{ height: '3rem', width: '100%', marginBottom: '1.5rem' }} />
                  <div className="skeleton" style={{ height: '2.5rem', width: '40%' }} />
                </div>
              </div>
            ))}
          </div>
        ) : filteredItems.length > 0 ? (
          <motion.div
            layout
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map(item => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="card"
                  style={{ display: 'flex', flexDirection: 'column' }}
                >
                  {/* Item Image */}
                  <div style={{ position: 'relative', height: '230px', overflow: 'hidden' }}>
                    <img
                      src={item.image || `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop`}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 500ms ease' }}
                      onMouseEnter={e => e.target.style.transform = 'scale(1.08)'}
                      onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                    />
                    {/* Badge Overlay */}
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
                      {item.isVeg && <span className="badge badge-veg">Veg</span>}
                      {item.isFeatured && <span className="badge badge-featured">Signature</span>}
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                      <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-heading)' }}>{item.name}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--color-gold-400)', fontSize: '0.875rem' }}>
                        <Star size={14} fill="currentColor" />
                        <span style={{ fontWeight: 600 }}>{item.rating || '4.5'}</span>
                      </div>
                    </div>
                    
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                      {item.description}
                    </p>

                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-gold-300)', fontFamily: 'var(--font-heading)' }}>
                        ${item.price.toFixed(2)}
                      </span>
                      <button className="btn btn-primary btn-sm" style={{ paddingInline: '1rem' }}>
                        <ShoppingBag size={14} />
                        Add
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--color-text-muted)' }}
          >
            <SearchX size={64} style={{ marginBottom: '1rem', opacity: 0.4 }} />
            <h3>No dishes found</h3>
            <p>Try adjusting your search or filters to find what you're looking for.</p>
            <button
              onClick={() => { setSearch(''); setActiveCategory('All'); setVegOnly(false); }}
              className="btn btn-outline btn-sm"
              style={{ marginTop: '1.5rem' }}
            >
              Reset All Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Menu;
