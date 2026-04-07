import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Search, Filter, Utensils, Check, X, AlertTriangle, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { menuAPI } from '../../api';
import usePageTitle from '../../hooks/usePageTitle';
import { Link } from 'react-router-dom';

const MenuManagement = () => {
  usePageTitle('Manage Menu');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Main Course',
    isVeg: true,
    isFeatured: false,
    image: ''
  });

  const fetchMenu = async () => {
    try {
      setLoading(true);
      const res = await menuAPI.getAll();
      setItems(res.data.data || res.data || []);
    } catch (err) {
      toast.error('Failed to load menu items.');
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
        image: item.image || ''
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
        image: ''
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
        toast.success('Dish updated successfully!');
      } else {
        await menuAPI.create(formData);
        toast.success('New dish added successfully!');
      }
      fetchMenu();
      handleCloseModal();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Action failed.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this dish?')) return;
    try {
      await menuAPI.delete(id);
      toast.success('Dish deleted successfully.');
      fetchMenu();
    } catch (err) {
      toast.error('Failed to delete dish.');
    }
  };

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg-base)', padding: '2rem' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div>
            <Link to="/admin" style={{ color: 'var(--color-gold-500)', fontSize: '0.8rem', textDecoration: 'none', marginBottom: '0.5rem', display: 'block' }}>← Back to Dashboard</Link>
            <h1 style={{ fontSize: '1.75rem' }}>Menu Management</h1>
          </div>
          <button onClick={() => handleOpenModal()} className="btn btn-primary">
            <Plus size={18} /> Add New Dish
          </button>
        </div>

        {/* Toolbar */}
        <div className="card" style={{ padding: '1rem', marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
            <input 
              type="text" 
              className="form-input" 
              placeholder="Search items..." 
              style={{ paddingLeft: '2.5rem' }} 
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>DISH</th>
                <th>CATEGORY</th>
                <th>PRICE</th>
                <th>STATUS</th>
                <th style={{ textAlign: 'right' }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading items...</td>
                </tr>
              ) : filteredItems.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>No items found.</td>
                </tr>
              ) : filteredItems.map(item => (
                <tr key={item._id}>
                  <td>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <div style={{ width: '44px', height: '44px', borderRadius: 'var(--radius-sm)', background: 'var(--color-bg-elevated)', overflow: 'hidden', flexShrink: 0 }}>
                        <img src={item.image || 'https://via.placeholder.com/40'} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{item.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.description}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-gold">{item.category}</span>
                  </td>
                  <td style={{ fontWeight: 700, color: 'var(--color-gold-400)' }}>${item.price?.toFixed(2)}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      {item.isVeg && <span className="badge badge-veg">Veg</span>}
                      {item.isFeatured && <span className="badge badge-featured">Featured</span>}
                    </div>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button onClick={() => handleOpenModal(item)} className="btn btn-ghost btn-sm" style={{ padding: '0.5rem' }} title="Edit">
                        <Edit2 size={15} />
                      </button>
                      <button onClick={() => handleDelete(item._id)} className="btn btn-ghost btn-sm" style={{ padding: '0.5rem', color: 'var(--color-error)' }} title="Delete">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="modal-overlay">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="modal-content"
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{editingItem ? 'Edit Dish' : 'Add New Dish'}</h2>
                <button onClick={handleCloseModal} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', display: 'flex' }}>
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="form-group">
                  <label className="form-label">Dish Name</label>
                  <input type="text" className="form-input" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Signature Truffle Pasta" />
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea className="form-textarea" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Describe the flavors and ingredients..." />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Price ($)</label>
                    <input type="number" step="0.01" className="form-input" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} placeholder="0.00" />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select className="form-select" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                      <option value="Starters">Starters</option>
                      <option value="Main Course">Main Course</option>
                      <option value="Desserts">Desserts</option>
                      <option value="Beverages">Beverages</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Image URL</label>
                  <input type="text" className="form-input" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} placeholder="https://images.unsplash.com/..." />
                </div>

                <div style={{ display: 'flex', gap: '2rem', padding: '0.5rem 0' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                    <input type="checkbox" checked={formData.isVeg} onChange={e => setFormData({...formData, isVeg: e.target.checked})} style={{ width: '16px', height: '16px' }} />
                    Vegetarian
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                    <input type="checkbox" checked={formData.isFeatured} onChange={e => setFormData({...formData, isFeatured: e.target.checked})} style={{ width: '16px', height: '16px' }} />
                    Featured Dish
                  </label>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button type="button" onClick={handleCloseModal} className="btn btn-ghost" style={{ flex: 1 }}>Cancel</button>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                    {editingItem ? 'Save Changes' : 'Create Dish'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MenuManagement;
