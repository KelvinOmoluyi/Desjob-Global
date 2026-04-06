import { supabase } from '../../lib/supabase';
import type { JobPost, BlogPost, JobSeekerMessage, EmployerMessage } from '../store/adminStore';

// ─── AUTH ───────────────────────────────────────────────────────────────────

export const adminApi = {

  login: async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { success: false, error: error.message };
    return { success: true };
  },

  logout: async (): Promise<void> => {
    await supabase.auth.signOut();
  },

  uploadImage: async (file: File): Promise<string> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 11)}.${fileExt}`;
      const filePath = `post-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Supabase Storage Error:', uploadError);
        throw new Error(uploadError.message || 'Upload failed');
      }

      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (err: any) {
      console.error('uploadImage catch:', err);
      throw new Error(err.message || 'Unknown upload error');
    }
  },

  checkAuthSession: async (): Promise<boolean> => {
    const { data } = await supabase.auth.getSession();
    return !!data.session;
  },

  // ─── CONTACT MESSAGES ──────────────────────────────────────────────────────

  getJobSeekerMessages: async (): Promise<JobSeekerMessage[]> => {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .eq('type', 'job_seeker')
      .order('submitted_at', { ascending: false });

    if (error) { console.error(error); return []; }

    return (data ?? []).map((row) => ({
      id: row.id,
      name: row.name ?? '',
      email: row.email,
      phone: row.phone ?? '',
      field: row.field ?? '',
      experience: row.experience ?? '',
      message: row.message ?? '',
      date: row.submitted_at,
    }));
  },

  getEmployerMessages: async (): Promise<EmployerMessage[]> => {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .eq('type', 'employer')
      .order('submitted_at', { ascending: false });

    if (error) { console.error(error); return []; }

    return (data ?? []).map((row) => ({
      id: row.id,
      company: row.company ?? '',
      contact: row.contact ?? '',
      email: row.email,
      phone: row.phone ?? '',
      industry: row.industry ?? '',
      positions: row.positions ?? '',
      hiringNeeds: row.hiring_needs ?? '',
      timeline: row.timeline ?? '',
      message: row.message ?? '',
      date: row.submitted_at,
    }));
  },

  deleteMessage: async (id: string): Promise<void> => {
    const { error } = await supabase.from('contact_messages').delete().eq('id', id);
    if (error) console.error('deleteMessage error:', error);
  },

  // ─── JOBS ──────────────────────────────────────────────────────────────────

  getPosts: async (): Promise<JobPost[]> => {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('posted_at', { ascending: false });

    if (error) { console.error(error); return []; }

    return (data ?? []).map((row) => ({
      id: row.id,
      title: row.title,
      company: row.company,
      location: row.location,
      type: row.type,
      salary: row.salary,
      category: row.category,
      tags: row.tags ?? [],
      image: row.image ?? '',
      posted: new Date(row.posted_at).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
      }),
    }));
  },

  createPost: async (postData: Omit<JobPost, 'id' | 'posted'>): Promise<JobPost> => {
    const { data, error } = await supabase
      .from('jobs')
      .insert({
        title: postData.title,
        company: postData.company,
        location: postData.location,
        type: postData.type,
        salary: postData.salary,
        category: postData.category,
        tags: postData.tags,
        image: postData.image,
      })
      .select()
      .single();

    if (error || !data) throw new Error(error?.message ?? 'Failed to create job post');

    return {
      id: data.id,
      title: data.title,
      company: data.company,
      location: data.location,
      type: data.type,
      salary: data.salary,
      category: data.category,
      tags: data.tags,
      image: data.image ?? '',
      posted: 'Just now',
    };
  },

  updateJobPost: async (id: string, postData: Partial<JobPost>): Promise<void> => {
    const { error } = await supabase.from('jobs').update({
      title: postData.title,
      company: postData.company,
      location: postData.location,
      type: postData.type,
      salary: postData.salary,
      category: postData.category,
      tags: postData.tags,
      image: postData.image,
    }).eq('id', id);
    if (error) console.error('updateJobPost error:', error);
  },

  deleteJobPost: async (id: string): Promise<void> => {
    const { error } = await supabase.from('jobs').delete().eq('id', id);
    if (error) console.error('deleteJobPost error:', error);
  },

  // ─── BLOG ──────────────────────────────────────────────────────────────────

  getBlogPosts: async (): Promise<BlogPost[]> => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('published_at', { ascending: false });

    if (error) { console.error(error); return []; }

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

  createBlogPost: async (postData: Omit<BlogPost, 'id' | 'date'>): Promise<BlogPost> => {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert({
        title: postData.title,
        slug: postData.slug,
        image: postData.image,
        content: postData.content,
        author: postData.author,
        category: postData.category,
      })
      .select()
      .single();

    if (error || !data) throw new Error(error?.message ?? 'Failed to create blog post');

    return {
      id: data.id,
      title: data.title,
      slug: data.slug,
      image: data.image,
      content: data.content,
      author: data.author,
      category: data.category,
      date: new Date(data.published_at).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric',
      }),
    };
  },

  updateBlogPost: async (id: string, postData: Partial<BlogPost>): Promise<void> => {
    const { error } = await supabase.from('blog_posts').update({
      title: postData.title,
      slug: postData.slug,
      image: postData.image,
      content: postData.content,
      author: postData.author,
      category: postData.category,
    }).eq('id', id);
    if (error) console.error('updateBlogPost error:', error);
  },

  deleteBlogPost: async (id: string): Promise<void> => {
    const { error } = await supabase.from('blog_posts').delete().eq('id', id);
    if (error) console.error('deleteBlogPost error:', error);
  },
};
