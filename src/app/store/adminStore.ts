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
  posted: string;
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

const initialEmployerMessages: EmployerMessage[] = [
  {
    id: '1',
    company: 'Acme Nigeria Ltd',
    contact: 'John Doe',
    email: 'john.doe@acmenigeria.com',
    phone: '+234 000 111 2222',
    industry: 'Manufacturing',
    positions: '4–10 positions',
    hiringNeeds: 'Talent Acquisition / Recruitment',
    timeline: 'Within 2 weeks',
    message: 'We are expanding our operations in Kano and urgently need plant supervisors.',
    date: new Date(Date.now() - 172800000).toISOString(),
  },
];

const initialJobPosts: JobPost[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    company: 'TechBridge Nigeria',
    location: 'Lagos, Nigeria',
    type: 'Full-time',
    salary: '₦500k – ₦800k/month',
    category: 'Technology',
    tags: ['React', 'Node.js', 'TypeScript'],
    posted: '2 days ago',
  },
  {
    id: '2',
    title: 'Head of Marketing',
    company: 'Greenfield FMCG Ltd',
    location: 'Abuja, Nigeria',
    type: 'Full-time',
    salary: '₦600k – ₦900k/month',
    category: 'Marketing',
    tags: ['Brand Strategy', 'Digital Marketing', 'Team Leadership'],
    posted: '3 days ago',
  },
];

type AdminState = {
  isAuthenticated: boolean;
  jobSeekerMessages: JobSeekerMessage[];
  employerMessages: EmployerMessage[];
  posts: JobPost[];
  
  // Actions
  login: () => void;
  logout: () => void;
  setJobSeekerMessages: (messages: JobSeekerMessage[]) => void;
  setEmployerMessages: (messages: EmployerMessage[]) => void;
  setPosts: (posts: JobPost[]) => void;
  addPost: (post: Omit<JobPost, 'id' | 'posted'>) => JobPost;
};

export const useAdminStore = create<AdminState>((set) => ({
  isAuthenticated: false, // Start unauthenticated
  jobSeekerMessages: initialJobSeekerMessages,
  employerMessages: initialEmployerMessages,
  posts: initialJobPosts,

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
}));
