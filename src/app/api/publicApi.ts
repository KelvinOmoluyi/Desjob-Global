import { supabase } from '../../lib/supabase';
import type { JobPost, BlogPost } from '../store/adminStore';

/**
 * Public API — no authentication required.
 * Used by the public-facing Jobs and Blog pages.
 */
export const publicApi = {

  // ─── JOBS ──────────────────────────────────────────────────────────────────

  getJobs: async (): Promise<JobPost[]> => {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('posted_at', { ascending: false });

    if (error) { console.error('getJobs error:', error); return []; }

    return (data ?? []).map((row) => ({
      id: row.id,
      title: row.title,
      company: row.company,
      location: row.location,
      type: row.type,
      salary: row.salary,
      category: row.category,
      tags: row.tags ?? [],
      image: row.image || '',
      posted: new Date(row.posted_at).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
      }),
    }));
  },

  // ─── BLOG ──────────────────────────────────────────────────────────────────

  getBlogPosts: async (): Promise<BlogPost[]> => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false });

    if (error) { console.error('getBlogPosts error:', error); return []; }

    return (data ?? []).map((row) => ({
      id: row.id,
      title: row.title,
      slug: row.slug,
      image: row.image,
      content: row.content ?? [],
      author: row.author,
      category: row.category,
      date: new Date(row.published_at).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric',
      }),
    }));
  },

  getBlogPostBySlug: async (slug: string): Promise<BlogPost | undefined> => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) return undefined;

    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      image: data.image,
      content: data.content ?? [],
      author: data.author,
      category: data.category,
      date: new Date(data.published_at).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric',
      }),
    };
  },

  // ─── CONTACT FORM SUBMISSIONS ───────────────────────────────────────────────

  submitJobSeekerForm: async (formData: {
    name: string;
    email: string;
    phone: string;
    field: string;
    experience: string;
    message: string;
  }): Promise<{ success: boolean; error?: string }> => {
    const { error } = await supabase.from('contact_messages').insert({
      type: 'job_seeker',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      field: formData.field,
      experience: formData.experience,
      message: formData.message,
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  },

  submitEmployerForm: async (formData: {
    company: string;
    contact: string;
    email: string;
    phone: string;
    industry: string;
    positions: string;
    hiringNeeds: string;
    timeline: string;
    message: string;
  }): Promise<{ success: boolean; error?: string }> => {
    const { error } = await supabase.from('contact_messages').insert({
      type: 'employer',
      company: formData.company,
      contact: formData.contact,
      email: formData.email,
      phone: formData.phone,
      industry: formData.industry,
      positions: formData.positions,
      hiring_needs: formData.hiringNeeds,
      timeline: formData.timeline,
      message: formData.message,
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  },
};
