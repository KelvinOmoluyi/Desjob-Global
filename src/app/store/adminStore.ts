import { create } from 'zustand';

export type JobSeekerMessage = {
  id: string;
  name: string;
  email: string;
  phone: string;
  field: string;
  experience: string;
  message: string;
  cvUrl?: string; // Mock URL for CV
  date: string;
};

export type EmployerMessage = {
  id: string;
  company: string;
  contact: string;
  email: string;
  phone: string;
  industry: string;
  positions: string;
  hiringNeeds: string;
  timeline: string;
  message: string;
  date: string;
};

export type JobPost = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  category: string;
  tags: string[];
  image: string;
  posted: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  image: string;
  content: string[]; // Array of paragraphs
  author: string;
  date: string;
  category: string;
};

// Initial mock data
const initialJobSeekerMessages: JobSeekerMessage[] = [
  {
    id: '1',
    name: 'Adaeze Williams',
    email: 'adaeze@example.com',
    phone: '+234 801 234 5678',
    field: 'Technology & IT',
    experience: '3–5 years (Mid-Level)',
    message: 'Looking for a Senior Frontend Developer role in Lagos.',
    cvUrl: '#',
    date: new Date(Date.now() - 86400000).toISOString(),
  },
];

const initialEmployerMessages: EmployerMessage[] = [];

const initialJobPosts: JobPost[] = [];

const initialBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Why Your Current Skills and Mindset Won\'t Take You to the Next Level',
    slug: 'skills-and-mindset-next-level',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop',
    content: [
      'At the recently concluded RGEP Talent Summit 2.0, a powerful statement by Paul Akolade stood out and continues to resonate deeply: "The same skill or mentality you\'ve got will not get you to the result you desire. Upskill!"',
      'It is a simple message, yet one that carries profound truth for anyone looking to grow in their career, business, or personal life.',
      'Many professionals hit a plateau not because they lack effort, but because they are trying to solve new-level problems with old-level thinking. To reach the next stage of your career, you must intentionally evolve your toolset and your perspective.'
    ],
    author: 'Desjob Editor',
    date: 'March 23, 2026',
    category: 'Hiring Tips'
  },
  {
    id: '2',
    title: '5 Key Lessons From the RGEP Program By RecruitTech HR Solutions',
    slug: '5-key-lessons-rgep-program',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
    content: [
      'The RGEP program has been a cornerstone of talent development in Nigeria. Here are the top 5 lessons we\'ve seen transform organizations.',
      '1. Culture eats strategy for breakfast. 2. Emotional intelligence is the most underrated skill. 3. Continuous feedback loops are essential. 4. Remote work is about trust, not tracking. 5. Diversity is a business imperative, not just a metric.'
    ],
    author: 'Marketing Team',
    date: 'March 28, 2026',
    category: 'Industry News'
  }
];

type AdminState = {
  isAuthenticated: boolean;
  jobSeekerMessages: JobSeekerMessage[];
  employerMessages: EmployerMessage[];
  posts: JobPost[];
  blogPosts: BlogPost[];
  
  // Actions
  login: () => void;
  logout: () => void;
  setJobSeekerMessages: (messages: JobSeekerMessage[]) => void;
  setEmployerMessages: (messages: EmployerMessage[]) => void;
  setPosts: (posts: JobPost[]) => void;
  addPost: (post: Omit<JobPost, 'id' | 'posted'>) => JobPost;
  updateJobPost: (id: string, post: Partial<JobPost>) => void;
  deleteJobPost: (id: string) => void;
  
  // Blog Actions
  setBlogPosts: (posts: BlogPost[]) => void;
  addBlogPost: (post: Omit<BlogPost, 'id' | 'date'>) => BlogPost;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;
};

export const useAdminStore = create<AdminState>((set) => ({
  isAuthenticated: false,
  jobSeekerMessages: [],
  employerMessages: [],
  posts: [],
  blogPosts: [],

  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false }),
  setJobSeekerMessages: (messages) => set({ jobSeekerMessages: messages }),
  setEmployerMessages: (messages) => set({ employerMessages: messages }),
  setPosts: (posts) => set({ posts }),
  
  addPost: (postData) => {
    const newPost: JobPost = {
      ...postData,
      id: Math.random().toString(36).substring(2, 9),
      posted: 'Just now',
    };
    
    set((state) => ({ posts: [newPost, ...state.posts] }));
    return newPost;
  },

  deleteJobPost: (id) => {
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== id),
    }));
  },

  updateJobPost: (id: string, updatedFields: Partial<JobPost>) => {
    set((state) => ({
      posts: state.posts.map((post) => (post.id === id ? { ...post, ...updatedFields } : post)),
    }));
  },

  setBlogPosts: (blogPosts) => set({ blogPosts }),
  addBlogPost: (postData) => {
    const newPost: BlogPost = {
      ...postData,
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    };
    set((state) => ({ blogPosts: [newPost, ...state.blogPosts] }));
    return newPost;
  },
  updateBlogPost: (id, updatedFields) => {
    set((state) => ({
      blogPosts: state.blogPosts.map((post) => (post.id === id ? { ...post, ...updatedFields } : post)),
    }));
  },
  deleteBlogPost: (id) => {
    set((state) => ({
      blogPosts: state.blogPosts.filter((post) => post.id !== id),
    }));
  },
}));
