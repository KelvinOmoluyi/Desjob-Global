import { 
  useAdminStore, 
  JobSeekerMessage, 
  EmployerMessage, 
  JobPost,
  BlogPost
} from '../store/adminStore';

/**
 * Mock API layer for the Admin Dashboard.
 * These functions simulate network requests to a real backend like Supabase or Appwrite.
 * They wrap the synchronous Zustand store actions in Promises with an artificial delay.
 */

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const adminApi = {
  // Auth
  login: async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    await delay(1000);
    // Hardcoded mock credentials for demo purposes
    if (email === 'admin@desjobglobal.com' && password === 'admin123') {
      useAdminStore.getState().login();
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  },

  logout: async (): Promise<void> => {
    await delay(500);
    useAdminStore.getState().logout();
  },

  checkAuthSession: async (): Promise<boolean> => {
    await delay(300);
    return useAdminStore.getState().isAuthenticated;
  },

  // Messages
  getJobSeekerMessages: async (): Promise<JobSeekerMessage[]> => {
    await delay(800);
    return useAdminStore.getState().jobSeekerMessages;
  },

  getEmployerMessages: async (): Promise<EmployerMessage[]> => {
    await delay(800);
    return useAdminStore.getState().employerMessages;
  },

  // Posts
  getPosts: async (): Promise<JobPost[]> => {
    await delay(800);
    return useAdminStore.getState().posts;
  },

  createPost: async (postData: Omit<JobPost, 'id' | 'posted'>): Promise<JobPost> => {
    await delay(1200);
    return useAdminStore.getState().addPost(postData);
  },

  // Blog
  getBlogPosts: async (): Promise<BlogPost[]> => {
    await delay(800);
    return useAdminStore.getState().blogPosts;
  },

  getBlogPostBySlug: async (slug: string): Promise<BlogPost | undefined> => {
    await delay(500);
    return useAdminStore.getState().blogPosts.find(p => p.slug === slug);
  },

  createBlogPost: async (postData: Omit<BlogPost, 'id' | 'date'>): Promise<BlogPost> => {
    await delay(1200);
    return useAdminStore.getState().addBlogPost(postData);
  },

  updateBlogPost: async (id: string, postData: Partial<BlogPost>): Promise<void> => {
    await delay(1000);
    useAdminStore.getState().updateBlogPost(id, postData);
  },

  deleteBlogPost: async (id: string): Promise<void> => {
    await delay(800);
    useAdminStore.getState().deleteBlogPost(id);
  },
};
