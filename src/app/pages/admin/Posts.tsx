import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Plus, Briefcase, MapPin, Clock, RefreshCw } from 'lucide-react';
import { adminApi } from '../../api/adminApi';
import { JobPost } from '../../store/adminStore';
import ConfirmModal from '../../components/admin/ConfirmModal';

export default function Posts() {
  const [posts, setPosts] = useState<JobPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<{ id: string, title: string } | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '', company: '', location: '', type: 'Full-time', salary: '', category: 'Technology', tags: ''
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
      tags: formData.tags.split(',').map((tag: string) => tag.trim()).filter((t: string) => t),
    };
    
    await adminApi.createPost(newPostData);
    await fetchPosts();
    
    setIsSubmitting(false);
    setShowForm(false);
    
    // Reset form
    setFormData({
      title: '', company: '', location: '', type: 'Full-time', salary: '', category: 'Technology', tags: ''
    });
  };

  const handleDeleteClick = (post: JobPost) => {
    setPostToDelete({ id: post.id, title: post.title });
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (postToDelete) {
      await adminApi.deleteJobPost(postToDelete.id);
      await fetchPosts();
      setModalOpen(false);
      setPostToDelete(null);
    }
  };

  const cancelDelete = () => {
    setModalOpen(false);
    setPostToDelete(null);
  };

  return (
    <div className="admin-page-container">
      <div className="admin-header-row">
        <h1 className="admin-page-title">Job Posts</h1>
        <div className="admin-header-actions">
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

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button type="submit" className="admin-btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Publish Post'}
            </button>
          </div>
        </form>
      )}

      <div className="admin-data-card">
        {isLoading ? (
          <div className="admin-loading-state">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="admin-empty-state">No posts available.</div>
        ) : (
          <div className="admin-list-container">
            {posts.map((post: JobPost) => (
              <div key={post.id} className="admin-list-card">
                <div className="admin-list-card-details">
                  <div className="admin-list-card-header">
                    <div>
                      <div className="admin-list-card-title-row">
                        <h3 className="admin-list-card-title">{post.title}</h3>
                      </div>
                      <p className="admin-list-card-subtitle">{post.company}</p>
                    </div>
                    <span className="admin-list-card-date">{post.posted}</span>
                  </div>
                
                  <div className="admin-list-card-footer">
                    <div className="admin-list-card-meta-tags">
                      <span className="admin-meta-tag"><MapPin size={14} /> {post.location}</span>
                      <span className="admin-meta-tag"><Clock size={14} /> {post.type}</span>
                      <span className="admin-meta-tag"><Briefcase size={14} /> {post.category}</span>
                      <span className="admin-meta-tag salary-tag">{post.salary}</span>
                    </div>
                    <div className="admin-list-card-actions">
                      <button onClick={() => handleDeleteClick(post)} className="admin-btn-icon btn-delete" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="admin-list-card-tags">
                    {post.tags.map((tag: string) => (
                      <span key={tag} className="admin-tag-pill">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmModal 
        isOpen={modalOpen}
        type="job"
        title={postToDelete?.title}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
}
