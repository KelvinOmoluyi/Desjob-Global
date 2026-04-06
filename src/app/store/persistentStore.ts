import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { JobPost, BlogPost } from './adminStore';

interface AppCache {
  jobs: JobPost[];
  blogPosts: BlogPost[];
  
  setJobs: (jobs: JobPost[]) => void;
  setBlogPosts: (posts: BlogPost[]) => void;
  clearCache: () => void;
}

export const useAppCache = create<AppCache>()(
  persist(
    (set) => ({
      jobs: [],
      blogPosts: [],
      
      setJobs: (jobs) => set({ jobs }),
      setBlogPosts: (blogPosts) => set({ blogPosts }),
      clearCache: () => set({ jobs: [], blogPosts: [] }),
    }),
    {
      name: 'desjob-public-cache', // Key in localStorage
    }
  )
);
