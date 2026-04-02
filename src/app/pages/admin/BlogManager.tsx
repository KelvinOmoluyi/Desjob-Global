import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, ExternalLink, RefreshCw, X, Image as ImageIcon } from 'lucide-react';
import { adminApi } from '../../api/adminApi';
import { BlogPost } from '../../store/adminStore';
import ConfirmModal from '../../components/admin/ConfirmModal';

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
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<{ id: string, title: string } | null>(null);

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
      content: formData.content.split('\n\n').map((p: string) => p.trim()).filter((p: string) => p),
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

  const handleDeleteClick = (blog: BlogPost) => {
    setPostToDelete({ id: blog.id, title: blog.title });
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (postToDelete) {
      await adminApi.deleteBlogPost(postToDelete.id);
      await fetchBlogs();
      setModalOpen(false);
      setPostToDelete(null);
    }
  };

  const cancelDelete = () => {
    setModalOpen(false);
    setPostToDelete(null);
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
    <div className="admin-page-container">
      <div className="admin-header-row">
        <h1 className="admin-page-title">Manage Blog</h1>
        <div className="admin-header-actions">
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
        <form onSubmit={handleSubmit} className="admin-form-container">
          <h2 className="admin-form-title">{editingId ? 'Edit Blog Post' : 'Create New Blog Post'}</h2>
          
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
              style={{ minHeight: '200px' }}
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label">Author</label>
            <input type="text" name="author" className="admin-input" required value={formData.author} onChange={handleInputChange} />
          </div>

          <div className="admin-form-footer">
            <button type="button" onClick={resetForm} className="admin-btn-outline">Cancel</button>
            <button type="submit" className="admin-btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : (editingId ? 'Update Post' : 'Publish Post')}
            </button>
          </div>
        </form>
      )}

      <div className="admin-data-card">
        {isLoading ? (
          <div className="admin-loading-state">Searching for stories...</div>
        ) : blogs.length === 0 ? (
          <div className="admin-empty-state">No stories published yet.</div>
        ) : (
          <div className="admin-list-container">
            {blogs.map(blog => (
              <div key={blog.id} className="admin-list-card">
                <div className="admin-list-card-content">
                  <img src={blog.image} alt="" className="admin-list-card-thumb" />
                  <div className="admin-list-card-details">
                    <div className="admin-list-card-header">
                      <div>
                        <h3 className="admin-list-card-title">{blog.title}</h3>
                        <p className="admin-list-card-subtitle">
                          slug: {blog.slug} | {blog.category}
                        </p>
                      </div>
                      <div className="admin-list-card-date">{blog.date}</div>
                    </div>
                    
                    <div className="admin-list-card-footer">
                      <span className="admin-list-card-author">Author: {blog.author}</span>
                      <div className="admin-list-card-actions">
                        <a href={`/blog/${blog.slug}`} target="_blank" rel="noopener noreferrer" className="admin-btn-icon" title="View Article">
                          <ExternalLink size={18} />
                        </a>
                        <button onClick={() => handleEdit(blog)} className="admin-btn-icon btn-edit" title="Edit">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => handleDeleteClick(blog)} className="admin-btn-icon btn-delete" title="Delete">
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

      <ConfirmModal 
        isOpen={modalOpen}
        type="blog"
        title={postToDelete?.title}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
