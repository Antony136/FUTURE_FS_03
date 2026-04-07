import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Leaf, Utensils, Star, Soup, Salad, Cake, Coffee, SearchX, ShoppingBag, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { menuAPI } from '../api';
import usePageTitle from '../hooks/usePageTitle';

const CATEGORIES = [
  { id: 'All',          label: 'All',         icon: Utensils },
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

  useEffect(() => {
    menuAPI.getAll().then(res => {
      setItems(res.data.data || res.data || []);
      setLoading(false);
    }).catch(() => {
      toast.error('Could not load menu.');
      setLoading(false);
    });
  }, []);

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchesCat    = activeCategory === 'All' || item.category === activeCategory;
      const matchesVeg    = !vegOnly || item.isVeg;
      return matchesSearch && matchesCat && matchesVeg;
    });
  }, [items, search, activeCategory, vegOnly]);

  return (
    <div className="page-enter section" style={{ background: 'var(--color-bg-base)' }}>
      <div className="container">
        
        {/* ── Header ─────────────────────────────────────────────────────────── */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>The Culinary Collection</div>
          <h2 className="section-title font-display">Taste the <span className="text-gradient">Excellence</span></h2>
          <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
            Explore our curated menu featuring globally-inspired dishes, each prepared with the finest seasonal ingredients.
          </p>
        </div>

        {/* ── Filters & Search ──────────────────────────────────────────────── */}
        <div 
          className="glass" 
          style={{ 
            padding: '2rem', 
            borderRadius: 'var(--radius-xl)', 
            marginBottom: '4rem',
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem'
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ flex: 1, minWidth: '300px', position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }} />
              <input 
                type="text" 
                placeholder="Search our collection..." 
                className="form-input"
                style={{ paddingLeft: '3.5rem', borderRadius: 'var(--radius-md)', background: 'var(--color-bg-base)' }}
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                onClick={() => setVegOnly(p => !p)}
                className={`btn btn-sm ${vegOnly ? 'btn-primary' : 'btn-outline'}`}
                style={{ height: '48px', borderRadius: 'var(--radius-md)' }}
              >
                <Leaf size={16} /> Veg Only
              </button>
            </div>
          </div>

          <div 
            className="no-scrollbar"
            style={{ 
              display: 'flex', 
              gap: '1rem', 
              overflowX: 'auto',
              paddingBottom: '0.5rem'
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
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.875rem 1.75rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid',
                    borderColor: isActive ? 'var(--color-primary)' : 'var(--color-border)',
                    background: isActive ? 'var(--color-primary)' : 'transparent',
                    color: isActive ? '#FFFFFF' : 'var(--color-text-secondary)',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Icon size={16} /> {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Menu Items ────────────────────────────────────────────────────── */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '3rem' }}>
            {[1,2,3,4,5,6].map(i => <div key={i} className="card skeleton" style={{ height: '450px' }} />)}
          </div>
        ) : filteredItems.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '3rem' }}>
            <AnimatePresence>
              {filteredItems.map((item, i) => (
                <motion.div
                  layout
                  key={item._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05 }}
                  className="card"
                >
                  <div style={{ height: '260px', overflow: 'hidden', position: 'relative' }}>
                    <img 
                      src={item.image || 'https://images.unsplash.com/photo-1546241072-48010ad2862c?w=800&h=600&fit=crop'} 
                      alt={item.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
                      {item.isVeg && <span className="badge" style={{ background: '#4ade80' }}>Veg</span>}
                      {item.category === 'Main Course' && <span className="badge" style={{ background: 'var(--color-gold)', color: '#1A1A1A' }}>Chef's Choice</span>}
                    </div>
                  </div>
                  <div style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{item.name}</h3>
                      <span style={{ color: 'var(--color-primary)', fontWeight: 800, fontSize: '1.35rem' }}>${item.price}</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', marginBottom: '2rem', lineHeight: 1.6, minHeight: '3em' }}>{item.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-gold)', fontWeight: 700 }}>
                        <Star size={16} fill="currentColor" /> {item.rating || 4.8}
                      </div>
                      <button className="btn btn-primary btn-sm" style={{ padding: '0.5rem 1.25rem', borderRadius: '4px' }}>
                        Order Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '10rem 0' }}>
            <SearchX size={64} style={{ opacity: 0.2, marginBottom: '2rem' }} />
            <h3 className="font-display">No dishes match your craving</h3>
            <p>Try clearing your filters or searching for something else.</p>
            <button 
              className="btn btn-outline" 
              style={{ marginTop: '2rem' }}
              onClick={() => { setSearch(''); setActiveCategory('All'); setVegOnly(false); }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
