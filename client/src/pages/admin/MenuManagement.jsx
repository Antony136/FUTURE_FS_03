import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Search, Filter, ChefHat, Check, X, AlertTriangle, Image as ImageIcon, LayoutGrid, List, Sparkles, DollarSign, Tag, Info, ArrowLeft, MoreVertical, Star, Flame, Salad, Coffee, CakeSlice } from 'lucide-react';
import toast from 'react-hot-toast';
import { menuAPI, adminAPI } from '../../api';
import usePageTitle from '../../hooks/usePageTitle';
import { Link } from 'react-router-dom';

const MenuManagement = () => {
  usePageTitle('Culinary Collection Management');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Main Course',
    isVeg: true,
    isFeatured: false,
    image: '',
    spiceLevel: 'None'
  });

  const fetchMenu = async () => {
    try {
      setLoading(true);
      const res = await menuAPI.getAll();
      setItems(res.data.data || res.data || []);
    } catch (err) {
      toast.error('Failed to sync collection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        isVeg: item.isVeg,
        isFeatured: item.isFeatured,
        image: item.image || '',
        spiceLevel: item.spiceLevel || 'None'
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: 'Main Course',
        isVeg: true,
        isFeatured: false,
        image: '',
        spiceLevel: 'None'
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await menuAPI.update(editingItem._id, formData);
        toast.success('Collection entry refined.');
      } else {
        await menuAPI.create(formData);
        toast.success('New signature dish added.');
      }
      fetchMenu();
      handleCloseModal();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Permanent removal. Proceed with collection cleanup?')) return;
    try {
      await menuAPI.delete(id);
      toast.success('Dish removed from collection.');
      fetchMenu();
    } catch (err) {
      toast.error('Removal failed.');
    }
  };

  const [uploadLoading, setUploadLoading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataUpload = new FormData();
    formDataUpload.append('image', file);

    try {
      setUploadLoading(true);
      const res = await adminAPI.uploadImage(formDataUpload);
      setFormData({ ...formData, image: res.data.data });
      toast.success('Visual asset uploaded.');
    } catch (err) {
      toast.error('Asset upload failed.');
    } finally {
      setUploadLoading(false);
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                         item.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === 'All' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categoryIcons = {
    'Starters': <Salad size={14} />,
    'Main Course': <ChefHat size={14} />,
    'Desserts': <CakeSlice size={14} />,
    'Beverages': <Coffee size={14} />,
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-base)', display: 'flex' }}>
      
      {/* Sidebar Placeholder Space */}
      <div style={{ width: '80px', flexShrink: 0 }} />

      <div style={{ flex: 1, padding: '3rem 5rem' }}>
        
        {/* Navigation Breadcrumb */}
        <header style={{ marginBottom: '3.5rem' }}>
          <Link to="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 700, marginBottom: '1rem' }}>
             <ArrowLeft size={14} /> Back to Hub
          </Link>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
             <div>
                <h1 className="font-display" style={{ fontSize: '2.5rem' }}>Culinary <span className="text-gradient">Collection</span></h1>
                <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>Curating {items.length} dishes for the signature guest experience.</p>
             </div>
             <button onClick={() => handleOpenModal()} className="btn btn-primary" style={{ height: '52px', paddingInline: '2rem', borderRadius: 'var(--radius-sm)' }}>
                <Plus size={20} style={{ marginRight: '8px' }} /> New Masterpiece
             </button>
          </div>
        </header>

        {/* Filters & View Tools */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', gap: '2rem' }}>
           <div style={{ position: 'relative', flex: 1, maxWidth: '500px' }}>
              <Search size={18} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input 
                type="text" 
                className="form-input" 
                placeholder="Search collection..." 
                style={{ paddingLeft: '3.5rem', borderRadius: '12px' }} 
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
           </div>

           <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ display: 'flex', background: 'var(--color-bg-elevated)', padding: '0.25rem', borderRadius: '10px', border: '1px solid var(--color-border)' }}>
                 {['All', 'Starters', 'Main Course', 'Desserts', 'Beverages'].map(cat => (
                   <button 
                     key={cat}
                     onClick={() => setFilterCategory(cat)}
                     style={{ 
                       padding: '0.5rem 1rem', 
                       borderRadius: '8px', 
                       fontSize: '0.8rem', 
                       fontWeight: 700, 
                       background: filterCategory === cat ? 'var(--color-primary)' : 'transparent',
                       color: filterCategory === cat ? 'white' : 'var(--color-text-muted)',
                       border: 'none', cursor: 'pointer', transition: 'all 0.3s'
                     }}
                   >
                     {cat}
                   </button>
                 ))}
              </div>
              <div style={{ display: 'flex', background: 'var(--color-bg-elevated)', padding: '0.25rem', borderRadius: '10px', border: '1px solid var(--color-border)' }}>
                 <button onClick={() => setViewMode('grid')} style={{ padding: '0.5rem', borderRadius: '8px', background: viewMode === 'grid' ? 'var(--color-primary)' : 'transparent', color: viewMode === 'grid' ? 'white' : 'var(--color-text-muted)', border: 'none', cursor: 'pointer' }}><LayoutGrid size={18} /></button>
                 <button onClick={() => setViewMode('list')} style={{ padding: '0.5rem', borderRadius: '8px', background: viewMode === 'list' ? 'var(--color-primary)' : 'transparent', color: viewMode === 'list' ? 'white' : 'var(--color-text-muted)', border: 'none', cursor: 'pointer' }}><List size={18} /></button>
              </div>
           </div>
        </div>

        {/* Grid View */}
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div 
               key="grid"
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}
            >
               {loading ? Array(6).fill(0).map((_, i) => (
                 <div key={i} className="card" style={{ height: '380px', opacity: 0.5, animation: 'pulse 2s infinite' }} />
               )) : filteredItems.map((item, i) => (
                 <motion.div 
                    key={item._id} 
                    initial={{ opacity: 0, scale: 0.9 }} 
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="card glass hover-card" 
                    style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%', border: '1px solid var(--color-border)' }}
                 >
                    <div style={{ height: '180px', position: 'relative', overflow: 'hidden' }}>
                       <img src={item.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500'} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                       <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
                          {item.isFeatured && <div style={{ background: 'var(--color-primary)', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}><Star size={8} fill="white" /> Featured</div>}
                          <div style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', color: 'white', padding: '0.25rem 0.5rem', borderRadius: '6px', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase' }}>{item.category}</div>
                       </div>
                       {item.isVeg && <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', width: '20px', height: '20px', border: '1px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ width: '10px', height: '10px', background: '#10b981', borderRadius: '50%' }} /></div>}
                    </div>
                    
                    <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                          <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{item.name}</h3>
                          <span style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--color-primary)' }}>${item.price?.toFixed(2)}</span>
                       </div>
                       <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.5, marginBottom: '1.5rem', flex: 1 }}>{item.description}</p>
                       
                       <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
                          <button onClick={() => handleOpenModal(item)} className="btn btn-ghost" style={{ flex: 1, gap: '0.5rem', fontSize: '0.8rem' }}><Edit2 size={14} /> Refine</button>
                          <button onClick={() => handleDelete(item._id)} className="btn btn-ghost" style={{ flex: 1, gap: '0.5rem', fontSize: '0.8rem', color: 'var(--color-error)' }}><Trash2 size={14} /> Clear</button>
                       </div>
                    </div>
                 </motion.div>
               ))}
            </motion.div>
          ) : (
             /* List View Redesign */
             <motion.div 
               key="list"
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               className="admin-table-container"
               style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}
             >
                <table className="admin-table">
                   <thead>
                      <tr>
                        <th>MASTERPIECE</th>
                        <th>INTELLIGENCE</th>
                        <th>PRICING</th>
                        <th style={{ textAlign: 'right' }}>ACTIONS</th>
                      </tr>
                   </thead>
                   <tbody>
                      {filteredItems.map(item => (
                        <tr key={item._id}>
                           <td>
                              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                                 <div style={{ width: '60px', height: '60px', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                                    <img src={item.image || 'https://via.placeholder.com/60'} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                 </div>
                                 <div>
                                    <div style={{ fontWeight: 800, fontSize: '1rem' }}>{item.name}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                                       {categoryIcons[item.category]} {item.category}
                                    </div>
                                 </div>
                              </div>
                           </td>
                           <td>
                              <div style={{ display: 'flex', gap: '0.5rem' }}>
                                 {item.isVeg && <span style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800 }}>PLANT-BASED</span>}
                                 {item.isFeatured && <span style={{ background: 'rgba(139, 0, 0, 0.1)', color: 'var(--color-primary)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800 }}>SIGNATURE</span>}
                                 {item.spiceLevel !== 'None' && <span style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800 }}>{item.spiceLevel.toUpperCase()}</span>}
                              </div>
                           </td>
                           <td style={{ fontWeight: 900, color: 'var(--color-primary)', fontSize: '1.1rem' }}>${item.price?.toFixed(2)}</td>
                           <td style={{ textAlign: 'right' }}>
                              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                                 <button onClick={() => handleOpenModal(item)} className="footer-icon-link" title="Edit"><Edit2 size={16} /></button>
                                 <button onClick={() => handleDelete(item._id)} className="footer-icon-link" style={{ color: 'var(--color-error)' }} title="Delete"><Trash2 size={16} /></button>
                              </div>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {!loading && filteredItems.length === 0 && (
           <div style={{ padding: '10rem', textAlign: 'center' }}>
              <Utensils size={64} color="var(--color-border)" style={{ marginBottom: '2rem' }} />
              <h2 className="font-display" style={{ fontSize: '1.5rem', color: 'var(--color-text-muted)' }}>No dishes found in this category.</h2>
              <button onClick={() => { setSearch(''); setFilterCategory('All'); }} className="btn btn-ghost" style={{ marginTop: '1rem' }}>Clear all filters</button>
           </div>
        )}

      </div>

      {/* Modern Drawer/Modal */}
      <AnimatePresence>
         {isModalOpen && (
           <>
             <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               onClick={handleCloseModal}
               style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 1000 }} 
             />
             <motion.div 
               initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
               transition={{ type: 'spring', damping: 25, stiffness: 200 }}
               style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: '600px', background: 'var(--color-bg-base)', zIndex: 1001, padding: '4rem', overflowY: 'auto', borderLeft: '1px solid var(--color-border)' }}
             >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3.5rem' }}>
                   <div>
                      <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--color-primary)', letterSpacing: '0.1em' }}>Collection Management</span>
                      <h2 className="font-display" style={{ fontSize: '2rem', marginTop: '0.25rem' }}>{editingItem ? 'Refine Dish' : 'New Masterpiece'}</h2>
                   </div>
                   <button onClick={handleCloseModal} className="footer-icon" style={{ padding: '0.5rem' }}><X size={24} /></button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                   
                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                      <div className="form-group">
                         <label className="form-label" style={{ fontWeight: 700 }}>Signature Name</label>
                         <input type="text" className="form-input" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Vintage Risotto" />
                      </div>
                      <div className="form-group">
                         <label className="form-label" style={{ fontWeight: 700 }}>Price Profile ($)</label>
                         <input type="number" step="0.01" className="form-input" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="0.00" />
                      </div>
                   </div>

                   <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700 }}>Culinary Narrative</label>
                      <textarea className="form-textarea" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Tell the story of this dish..." style={{ height: '120px' }} />
                   </div>

                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                      <div className="form-group">
                         <label className="form-label" style={{ fontWeight: 700 }}>Menu Category</label>
                         <select className="form-select" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                            <option value="Starters">Starters</option>
                            <option value="Main Course">Main Course</option>
                            <option value="Desserts">Desserts</option>
                            <option value="Beverages">Beverages</option>
                         </select>
                      </div>
                      <div className="form-group">
                         <label className="form-label" style={{ fontWeight: 700 }}>Aromatic intensity</label>
                         <select className="form-select" value={formData.spiceLevel} onChange={e => setFormData({...formData, spiceLevel: e.target.value})}>
                            <option value="None">Mild</option>
                            <option value="Medium">Medium Heat</option>
                            <option value="High">Intense</option>
                         </select>
                      </div>
                   </div>

                   <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 700 }}>Visual Asset (URL or Local)</label>
                      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
                        <input type="text" className="form-input" style={{ flex: 1 }} value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} placeholder="https://..." />
                        <label className="btn btn-ghost" style={{ cursor: 'pointer', paddingInline: '1rem', fontSize: '0.8rem', gap: '0.5rem', flexShrink: 0 }}>
                          <ImageIcon size={16} /> {uploadLoading ? 'Uploading...' : 'System File'}
                          <input type="file" onChange={handleImageUpload} style={{ display: 'none' }} disabled={uploadLoading} />
                        </label>
                      </div>
                      <div style={{ height: '150px', borderRadius: '12px', border: '2px dashed var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'var(--color-bg-elevated)' }}>
                         {formData.image ? <img src={formData.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ textAlign: 'center', color: 'var(--color-text-muted)' }}><ImageIcon size={32} style={{ marginBottom: '1rem' }} /><div>Visual Preview</div></div>}
                      </div>
                   </div>

                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', background: 'var(--color-bg-elevated)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
                         <div style={{ position: 'relative', width: '40px', height: '20px', background: formData.isVeg ? 'var(--color-primary)' : 'var(--color-border)', borderRadius: '20px', transition: '0.3s' }}>
                            <motion.div animate={{ x: formData.isVeg ? 22 : 2 }} style={{ position: 'absolute', top: '2px', width: '16px', height: '16px', background: 'white', borderRadius: '50%' }} />
                            <input type="checkbox" checked={formData.isVeg} onChange={e => setFormData({...formData, isVeg: e.target.checked})} style={{ display: 'none' }} />
                         </div>
                         <span style={{ fontSize: '0.9rem', fontWeight: 800 }}>PLANT-BASED</span>
                      </label>
                      
                      <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}>
                         <div style={{ position: 'relative', width: '40px', height: '20px', background: formData.isFeatured ? 'var(--color-primary)' : 'var(--color-border)', borderRadius: '20px', transition: '0.3s' }}>
                            <motion.div animate={{ x: formData.isFeatured ? 22 : 2 }} style={{ position: 'absolute', top: '2px', width: '16px', height: '16px', background: 'white', borderRadius: '50%' }} />
                            <input type="checkbox" checked={formData.isFeatured} onChange={e => setFormData({...formData, isFeatured: e.target.checked})} style={{ display: 'none' }} />
                         </div>
                         <span style={{ fontSize: '0.9rem', fontWeight: 800 }}>SIGNATURE STATUS</span>
                      </label>
                   </div>

                   <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem' }}>
                      <button type="button" onClick={handleCloseModal} className="btn btn-ghost" style={{ flex: 1, height: '56px' }}>Discard Changes</button>
                      <button type="submit" className="btn btn-primary" style={{ flex: 1.5, height: '56px' }}>
                         {editingItem ? 'Finalize Refinement' : 'Authorize Placement'}
                      </button>
                   </div>
                </form>
             </motion.div>
           </>
         )}
      </AnimatePresence>

      <style>{`
         @keyframes pulse {
            0%, 100% { opacity: 0.5; }
            50% { opacity: 0.3; }
         }
         .hover-card { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
         .hover-card:hover { transform: translateY(-10px); box-shadow: var(--shadow-xl); border-color: var(--color-primary) !important; }
      `}</style>
    </div>
  );
};

export default MenuManagement;
