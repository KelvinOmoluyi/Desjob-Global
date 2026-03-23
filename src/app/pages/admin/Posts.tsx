import React, { useState, useEffect } from 'react';
import { Plus, Briefcase, MapPin, Clock, RefreshCw } from 'lucide-react';
import { adminApi } from '../../api/adminApi';
import { JobPost } from '../../store/adminStore';

export default function Posts() {
  const [posts, setPosts] = useState<JobPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '', company: '', location: '', type: 'Full-time', salary: '', category: 'Technology', tags: '', featured: false
  });

  const fetchPosts = async () => {
    setIsLoading(true);
    const fetchedPosts = await adminApi.getPosts();
    setPosts(fetchedPosts);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newPostData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(t => t),
    };
    
    await adminApi.createPost(newPostData);
    await fetchPosts();
    
    setIsSubmitting(false);
    setShowForm(false);
    
    // Reset form
    setFormData({
      title: '', company: '', location: '', type: 'Full-time', salary: '', category: 'Technology', tags: '', featured: false
    });
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="admin-page-title" style={{ margin: 0 }}>Job Posts</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={fetchPosts} className="admin-btn-outline" disabled={isLoading || isSubmitting}>
            <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
            Refresh
          </button>
          <button onClick={() => setShowForm(!showForm)} className="admin-btn-primary">
            {showForm ? 'Cancel' : <><Plus size={18} /> Create Post</>}
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleCreatePost} className="admin-form" style={{ marginBottom: '2rem' }}>
          <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem' }}>Create New Job Post</h2>
          
          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Job Title</label>
              <input type="text" name="title" className="admin-input" required value={formData.title} onChange={handleInputChange} placeholder="e.g. Senior Frontend Developer" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Company</label>
              <input type="text" name="company" className="admin-input" required value={formData.company} onChange={handleInputChange} placeholder="e.g. TechBridge Nigeria" />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Location</label>
              <input type="text" name="location" className="admin-input" required value={formData.location} onChange={handleInputChange} placeholder="e.g. Lagos, Nigeria (Hybrid)" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Job Type</label>
              <select name="type" className="admin-input" value={formData.type} onChange={handleInputChange}>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Salary Range</label>
              <input type="text" name="salary" className="admin-input" required value={formData.salary} onChange={handleInputChange} placeholder="e.g. ₦500k – ₦800k/month" />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Category</label>
              <select name="category" className="admin-input" value={formData.category} onChange={handleInputChange}>
                {['Technology', 'Finance & Banking', 'Marketing', 'HR & People', 'Sales', 'Operations', 'Healthcare', 'Oil & Gas'].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Tags (comma separated)</label>
            <input type="text" name="tags" className="admin-input" value={formData.tags} onChange={handleInputChange} placeholder="e.g. React, Node.js, TypeScript" />
          </div>

          <div className="admin-form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
            <input type="checkbox" name="featured" id="featured" checked={formData.featured} onChange={handleInputChange} style={{ width: '1.25rem', height: '1.25rem', accentColor: 'var(--main-color-01)' }} />
            <label htmlFor="featured" className="admin-label" style={{ cursor: 'pointer' }}>Mark as Featured Post</label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button type="submit" className="admin-btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Publish Post'}
            </button>
          </div>
        </form>
      )}

      <div className="admin-card">
        {isLoading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>Loading posts...</div>
        ) : posts.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>No posts available.</div>
        ) : (
          <div className="admin-list">
            {posts.map(post => (
              <div key={post.id} className="admin-list-item">
                <div className="admin-list-header">
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                      <h3 className="admin-item-title" style={{ margin: 0 }}>{post.title}</h3>
                      {post.featured && <span style={{ fontSize: '0.75rem', fontWeight: 600, background: '#fef3c7', color: '#92400e', padding: '0.125rem 0.5rem', borderRadius: '1rem' }}>Featured</span>}
                    </div>
                    <p className="admin-item-subtitle">{post.company}</p>
                  </div>
                  <span className="admin-item-date">{post.posted}</span>
                </div>
                
                <div className="admin-item-meta">
                  <span className="admin-meta-tag"><MapPin size={14} /> {post.location}</span>
                  <span className="admin-meta-tag"><Clock size={14} /> {post.type}</span>
                  <span className="admin-meta-tag"><Briefcase size={14} /> {post.category}</span>
                  <span className="admin-meta-tag" style={{ color: 'var(--main-color-01)', background: '#ecfdf5', fontWeight: 500 }}>{post.salary}</span>
                </div>

                <div className="admin-item-meta" style={{ marginTop: '0.25rem' }}>
                  {post.tags.map((tag: string) => (
                    <span key={tag} style={{ fontSize: '0.75rem', color: '#64748b', border: '1px solid #e2e8f0', padding: '0.125rem 0.5rem', borderRadius: '0.25rem' }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
