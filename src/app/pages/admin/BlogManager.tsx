import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, ExternalLink, RefreshCw, X, Image as ImageIcon } from 'lucide-react';
import { adminApi } from '../../api/adminApi';
import { BlogPost } from '../../store/adminStore';

const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w-]+/g, '')   // Remove all non-word chars
    .replace(/--+/g, '-');      // Replace multiple - with single -
};

export default function BlogManager() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    category: 'Hiring Tips',
    content: '',
    author: 'Desjob Editor'
  });

  const fetchBlogs = async () => {
    setIsLoading(true);
    const data = await adminApi.getBlogPosts();
    setBlogs(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const blogData = {
      ...formData,
      slug: slugify(formData.title),
      content: formData.content.split('\n\n').map(p => p.trim()).filter(p => p),
    };

    if (editingId) {
      await adminApi.updateBlogPost(editingId, blogData);
    } else {
      await adminApi.createBlogPost(blogData);
    }

    await fetchBlogs();
    setIsSubmitting(false);
    resetForm();
  };

  const handleEdit = (blog: BlogPost) => {
    setFormData({
      title: blog.title,
      image: blog.image,
      category: blog.category,
      content: blog.content.join('\n\n'),
      author: blog.author
    });
    setEditingId(blog.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await adminApi.deleteBlogPost(id);
      await fetchBlogs();
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      image: '',
      category: 'Hiring Tips',
      content: '',
      author: 'Desjob Editor'
    });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="admin-blog-manager">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="admin-page-title" style={{ margin: 0 }}>Manage Blog</h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={fetchBlogs} className="admin-btn-outline" disabled={isLoading || isSubmitting}>
            <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
            Refresh
          </button>
          <button onClick={() => setShowForm(!showForm)} className="admin-btn-primary">
            {showForm ? 'Cancel' : <><Plus size={18} /> Create Post</>}
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-form" style={{ marginBottom: '2rem' }}>
          <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem' }}>{editingId ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
          
          <div className="admin-form-group">
            <label className="admin-label">Blog Title</label>
            <input type="text" name="title" className="admin-input" required value={formData.title} onChange={handleInputChange} placeholder="e.g. 5 recruitment tips for 2026" />
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label className="admin-label">Header Image URL</label>
              <input type="text" name="image" className="admin-input" required value={formData.image} onChange={handleInputChange} placeholder="Unsplash URL, etc." />
            </div>
            <div className="admin-form-group">
              <label className="admin-label">Category</label>
              <select name="category" className="admin-input" value={formData.category} onChange={handleInputChange}>
                {['Hiring Tips', 'Industry News', 'Marketing', 'Talent Search', 'Business Trends'].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Content (double enter for new paragraph)</label>
            <textarea 
              name="content" 
              className="admin-input" 
              required 
              rows={8}
              value={formData.content} 
              onChange={handleInputChange} 
              placeholder="Write your article here..."
              style={{ resize: 'vertical', minHeight: '200px' }}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Author</label>
            <input type="text" name="author" className="admin-input" required value={formData.author} onChange={handleInputChange} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="button" onClick={resetForm} className="admin-btn-outline">Cancel</button>
            <button type="submit" className="admin-btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : (editingId ? 'Update Post' : 'Publish Post')}
            </button>
          </div>
        </form>
      )}

      <div className="admin-card">
        {isLoading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>Searching for stories...</div>
        ) : blogs.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>No stories published yet.</div>
        ) : (
          <div className="admin-list">
            {blogs.map(blog => (
              <div key={blog.id} className="admin-list-item">
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  <img src={blog.image} alt="" style={{ width: '100px', height: '60px', borderRadius: '0.5rem', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <h3 className="admin-item-title" style={{ margin: 0 }}>{blog.title}</h3>
                        <p className="admin-item-subtitle" style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>
                          slug: {blog.slug} | {blog.category}
                        </p>
                      </div>
                      <div className="admin-item-date">{blog.date}</div>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                      <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Author: {blog.author}</span>
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <a href={`/blog/${blog.slug}`} target="_blank" rel="noopener noreferrer" className="admin-btn-icon" title="View Article">
                          <ExternalLink size={18} />
                        </a>
                        <button onClick={() => handleEdit(blog)} className="admin-btn-icon" style={{ color: '#0f172a' }} title="Edit">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => handleDelete(blog.id)} className="admin-btn-icon" style={{ color: '#ef4444' }} title="Delete">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
