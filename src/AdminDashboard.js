import React, { useState } from 'react';

const ADMIN_PASSWORD = 'admin123'; // Change this to your preferred password

function AdminDashboard({ products, setProducts }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '', image: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.category || !newProduct.price) {
      alert('Please fill all fields');
      return;
    }
    setProducts([
      ...products,
      { ...newProduct, id: Date.now(), price: parseFloat(newProduct.price) },
    ]);
    setNewProduct({ name: '', category: '', price: '', image: '' });
    setSuccessMsg('Product added!');
    setTimeout(() => setSuccessMsg(''), 1200);
  };

  const handleEditProduct = (index) => {
    setEditIndex(index);
    setNewProduct(products[index]);
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const updatedProducts = [...products];
    updatedProducts[editIndex] = { ...newProduct, price: parseFloat(newProduct.price) };
    setProducts(updatedProducts);
    setEditIndex(null);
    setNewProduct({ name: '', category: '', price: '', image: '' });
    setSuccessMsg('Product updated!');
    setTimeout(() => setSuccessMsg(''), 1200);
  };

  const handleDeleteProduct = (index) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter((_, i) => i !== index));
      setSuccessMsg('Product deleted!');
      setTimeout(() => setSuccessMsg(''), 1200);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setEditIndex(null);
    setNewProduct({ name: '', category: '', price: '', image: '' });
    setSuccessMsg('');
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-dashboard-modern-card" style={{ maxWidth: 400, margin: '64px auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(67,160,71,0.10)', padding: 32 }}>
        <h2 className="admin-title" style={{ textAlign: 'center', marginBottom: 24 }}>Admin Login</h2>
        <form onSubmit={handleLogin} className="admin-form-modern" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="admin-input-modern"
            style={{ padding: 12, borderRadius: 8, border: '1px solid #bbb', fontSize: 16 }}
          />
          <button type="submit" className="admin-btn-modern" style={{ padding: 12, borderRadius: 8, background: '#43a047', color: '#fff', fontWeight: 600, fontSize: 16, border: 'none', cursor: 'pointer' }}>Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-modern" style={{ maxWidth: 900, margin: '40px auto', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(67,160,71,0.10)', padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 className="admin-title" style={{ margin: 0 }}>Admin Dashboard</h2>
        <button onClick={handleLogout} style={{ background: '#e53935', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 20px', fontWeight: 600, cursor: 'pointer', fontSize: 15 }}>Logout</button>
                    </div>
      <form onSubmit={editIndex === null ? handleAddProduct : handleUpdateProduct} className="admin-form-modern" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={handleInputChange}
          className="admin-input-modern"
          style={{ padding: 10, borderRadius: 8, border: '1px solid #bbb', fontSize: 15, minWidth: 120 }}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={newProduct.category}
          onChange={handleInputChange}
          className="admin-input-modern"
          style={{ padding: 10, borderRadius: 8, border: '1px solid #bbb', fontSize: 15, minWidth: 120 }}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleInputChange}
          className="admin-input-modern"
          style={{ padding: 10, borderRadius: 8, border: '1px solid #bbb', fontSize: 15, minWidth: 90 }}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL (optional)"
          value={newProduct.image}
          onChange={handleInputChange}
          className="admin-input-modern"
          style={{ padding: 10, borderRadius: 8, border: '1px solid #bbb', fontSize: 15, minWidth: 180 }}
        />
        <button type="submit" className="admin-btn-modern" style={{ padding: '10px 20px', borderRadius: 8, background: '#43a047', color: '#fff', fontWeight: 600, fontSize: 15, border: 'none', cursor: 'pointer' }}>
          {editIndex === null ? 'Add Product' : 'Update Product'}
        </button>
                  </form>
      {successMsg && (
        <div style={{ background: '#e8f5e9', color: '#388e3c', borderRadius: 8, padding: '10px 0', textAlign: 'center', marginBottom: 18, fontWeight: 600, fontSize: 16, transition: 'all 0.3s' }}>
          {successMsg}
              </div>
            )}
      <div className="admin-table-wrapper" style={{ overflowX: 'auto' }}>
        <table className="admin-table-modern" style={{ width: '100%', borderCollapse: 'collapse', background: '#fafafa', borderRadius: 12 }}>
              <thead>
            <tr style={{ background: '#e0f2f1' }}>
              <th style={{ padding: 10, fontWeight: 700 }}>Name</th>
              <th style={{ padding: 10, fontWeight: 700 }}>Category</th>
              <th style={{ padding: 10, fontWeight: 700 }}>Price</th>
              <th style={{ padding: 10, fontWeight: 700 }}>Image</th>
              <th style={{ padding: 10, fontWeight: 700 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
            {products.map((prod, idx) => (
              <tr key={prod.id} style={{ background: idx % 2 === 0 ? '#fff' : '#f1f8e9', transition: 'background 0.3s' }}>
                <td style={{ padding: 10 }}>{prod.name}</td>
                <td style={{ padding: 10 }}>{prod.category}</td>
                <td style={{ padding: 10 }}>₹{prod.price}</td>
                <td style={{ padding: 10 }}>
                  {prod.image ? <img src={prod.image} alt={prod.name} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 8, border: '1px solid #ddd' }} /> : 'N/A'}
                </td>
                <td style={{ padding: 10 }}>
                  <button className="admin-btn-edit" onClick={() => handleEditProduct(idx)} style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 14px', marginRight: 8, fontWeight: 600, cursor: 'pointer' }}>Edit</button>
                  <button className="admin-btn-delete" onClick={() => handleDeleteProduct(idx)} style={{ background: '#e53935', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 14px', fontWeight: 600, cursor: 'pointer' }}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
      </div>
    </div>
  );
}

export default AdminDashboard; 