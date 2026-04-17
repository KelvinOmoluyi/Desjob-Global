import React, { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Trash2, Edit2, Plus, Briefcase, MapPin, Clock, RefreshCw, X } from 'lucide-react';
import { adminApi } from '../../api/adminApi';
import { JobPost } from '../../store/adminStore';
import ConfirmModal from '../../components/admin/ConfirmModal';

const EMPTY_FORM = { title: '', company: '', location: '', type: 'Full-time', salary: '', category: 'Technology', tags: '' };

export default function Posts() {
  const queryClient = useQueryClient();
  const [posts, setPosts] = useState<JobPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    variant: 'confirm' | 'alert',
    type: 'job' | 'blog' | 'error',
    title?: string,
    message?: string,
    onConfirm?: () => void
  }>({
    variant: 'confirm',
    type: 'job'
  });
  const [postToDelete, setPostToDelete] = useState<{ id: string, title: string } | null>(null);

  // Form state
  const [formData, setFormData] = useState(EMPTY_FORM);

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

  const handleEdit = (post: JobPost) => {
    setFormData({
      title: post.title,
      company: post.company,
      location: post.location,
      type: post.type,
      salary: post.salary,
      category: post.category,
      tags: post.tags.join(', '),
    });
    setEditingId(post.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setFormData(EMPTY_FORM);
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const postData = {
      ...formData,
      tags: formData.tags.split(',').map((tag: string) => tag.trim()).filter((t: string) => t),
    };

    if (editingId) {
      await adminApi.updateJobPost(editingId, postData);
    } else {
      await adminApi.createPost(postData);
    }

    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ['admin-jobs'] }),
      queryClient.invalidateQueries({ queryKey: ['jobs'] }),
    ]);
    await fetchPosts();
    setIsSubmitting(false);
    resetForm();
  };

  const handleDeleteClick = (post: JobPost) => {
    setPostToDelete({ id: post.id, title: post.title });
    setModalConfig({
      variant: 'confirm',
      type: 'job',
      title: post.title,
      onConfirm: confirmDelete
    });
    setModalOpen(true);
  };

  const confirmDelete = async () => {
    if (postToDelete) {
      setIsSubmitting(true);
      await adminApi.deleteJobPost(postToDelete.id);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['admin-jobs'] }),
        queryClient.invalidateQueries({ queryKey: ['jobs'] }),
      ]);
      await fetchPosts();
      setIsSubmitting(false);
      setModalOpen(false);
      setPostToDelete(null);
    }
  };

  const cancelDelete = () => {
    setModalOpen(false);
    setPostToDelete(null);
  };

  const isBusy = isLoading || isSubmitting;

  return (
    <div className="admin-page-container">
      <div className="admin-header-row">
        <h1 className="admin-page-title">Job Posts</h1>
        <div className="admin-header-actions">
          <button 
            onClick={fetchPosts} 
            className="admin-btn-outline" 
            disabled={isBusy}
            aria-label="Refresh job posts"
          >
            <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
            Refresh
          </button>
          <button 
            onClick={() => showForm ? resetForm() : setShowForm(true)} 
            className="admin-btn-primary" 
            disabled={isSubmitting}
            aria-label={showForm ? "Cancel creating post" : "Create new job post"}
          >
            {showForm ? <><X size={18} /> Cancel</> : <><Plus size={18} /> Create Post</>}
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="admin-form" style={{ marginBottom: '2rem' }}>
          <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.25rem' }}>
            {editingId ? 'Edit Job Post' : 'Create New Job Post'}
          </h2>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label htmlFor="job-title" className="admin-label">Job Title</label>
              <input 
                id="job-title"
                type="text" 
                name="title" 
                className="admin-input" 
                required 
                aria-required="true"
                value={formData.title} 
                onChange={handleInputChange} 
                placeholder="e.g. Senior Frontend Developer" 
              />
            </div>
            <div className="admin-form-group">
              <label htmlFor="company-name" className="admin-label">Company</label>
              <input 
                id="company-name"
                type="text" 
                name="company" 
                className="admin-input" 
                required 
                aria-required="true"
                value={formData.company} 
                onChange={handleInputChange} 
                placeholder="e.g. TechBridge Nigeria" 
              />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label htmlFor="location" className="admin-label">Location</label>
              <input 
                id="location"
                type="text" 
                name="location" 
                className="admin-input" 
                required 
                aria-required="true"
                value={formData.location} 
                onChange={handleInputChange} 
                placeholder="e.g. Lagos, Nigeria (Hybrid)" 
              />
            </div>
            <div className="admin-form-group">
              <label htmlFor="job-type" className="admin-label">Job Type</label>
              <select id="job-type" name="type" className="admin-input" value={formData.type} onChange={handleInputChange}>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-group">
              <label htmlFor="salary" className="admin-label">Salary Range</label>
              <input
                id="salary"
                type="text"
                name="salary"
                className="admin-input"
                required
                aria-required="true"
                value={formData.salary}
                onChange={handleInputChange}
                onBlur={(e) => {
                  const raw = e.target.value.trim();
                  if (!raw) return;
                  const formatted = raw
                    .split(/\s*[-\u2013]\s*/)
                    .map(part => {
                      const clean = part.trim().replace(/^\u20a6/, '');
                      return clean ? `\u20a6${clean}` : '';
                    })
                    .filter(Boolean)
                    .join(' \u2013 ') + '/month';
                  setFormData(prev => ({ ...prev, salary: formatted }));
                }}
                placeholder="e.g. 500,000 - 800,000"
              />
            </div>
            <div className="admin-form-group">
              <label htmlFor="category" className="admin-label">Category</label>
              <select id="category" name="category" className="admin-input" value={formData.category} onChange={handleInputChange}>
                {['Technology', 'Finance & Banking', 'Marketing', 'HR & People', 'Sales', 'Operations', 'Healthcare', 'Oil & Gas'].map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="admin-form-group">
            <label htmlFor="tags" className="admin-label">Tags (comma separated)</label>
            <input id="tags" type="text" name="tags" className="admin-input" value={formData.tags} onChange={handleInputChange} placeholder="e.g. React, Node.js, TypeScript" />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button type="submit" className="admin-btn-primary" disabled={isSubmitting}>
              {isSubmitting ? (editingId ? 'Saving...' : 'Creating...') : (editingId ? 'Save Changes' : 'Publish Post')}
            </button>
          </div>
        </form>
      )}

      <div className="admin-data-card" aria-busy={isLoading}>
        {isLoading ? (
          <div className="admin-loading-state" aria-live="polite">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="admin-empty-state">No posts available.</div>
        ) : (
          <div className="admin-list-container">
            {posts.map((post: JobPost) => (
              <div key={post.id} className="admin-list-card">
                <div className="admin-list-card-details">
                  <div className="admin-list-card-header">
                    <div>
                      <h3 className="admin-list-card-title">{post.title}</h3>
                      <p className="admin-list-card-subtitle">{post.company}</p>
                    </div>
                    <span className="admin-list-card-date">{post.posted}</span>
                  </div>

                  <div className="admin-list-card-footer">
                    <div className="admin-list-card-meta-tags">
                      <span className="admin-meta-tag" aria-label="Location"><MapPin size={14} aria-hidden="true" /> {post.location}</span>
                      <span className="admin-meta-tag" aria-label="Job type"><Clock size={14} aria-hidden="true" /> {post.type}</span>
                      <span className="admin-meta-tag" aria-label="Category"><Briefcase size={14} aria-hidden="true" /> {post.category}</span>
                      <span className="admin-meta-tag salary-tag" aria-label="Salary">{post.salary}</span>
                    </div>
                    <div className="admin-list-card-actions">
                      <button 
                        onClick={() => handleEdit(post)} 
                        className="admin-btn-icon btn-edit" 
                        title="Edit post" 
                        aria-label={`Edit ${post.title} at ${post.company}`}
                        disabled={isBusy}
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(post)} 
                        className="admin-btn-icon btn-delete" 
                        title="Delete post" 
                        aria-label={`Delete ${post.title} at ${post.company}`}
                        disabled={isBusy}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="admin-list-card-tags" aria-label="Skills and tags">
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
        variant={modalConfig.variant}
        type={modalConfig.type}
        title={modalConfig.title}
        message={modalConfig.message}
        onConfirm={modalConfig.onConfirm || (() => setModalOpen(false))}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
}
