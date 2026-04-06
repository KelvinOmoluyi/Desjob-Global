import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '../api/adminApi';
import { BlogPost, JobPost } from '../store/adminStore';
import { toast } from 'sonner';

// ─── MESSAGES ────────────────────────────────────────────────────────────────

export const useAdminMessages = () => {
  const queryClient = useQueryClient();

  const jobSeekers = useQuery({
    queryKey: ['admin-messages', 'job-seeker'],
    queryFn: adminApi.getJobSeekerMessages,
  });

  const employers = useQuery({
    queryKey: ['admin-messages', 'employer'],
    queryFn: adminApi.getEmployerMessages,
  });

  const deleteMessage = useMutation({
    mutationFn: (id: string) => adminApi.deleteMessage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-messages'] });
      toast.success('Message deleted successfully');
    },
    onError: () => toast.error('Failed to delete message'),
  });

  return { 
    jobSeekers, 
    employers, 
    deleteMessage,
    isLoading: jobSeekers.isLoading || employers.isLoading 
  };
};

// ─── JOB MANAGEMENT ──────────────────────────────────────────────────────────

export const useAdminJobs = () => {
  const queryClient = useQueryClient();

  const jobs = useQuery({
    queryKey: ['admin-jobs'],
    queryFn: adminApi.getPosts,
  });

  const createJob = useMutation({
    mutationFn: (data: Omit<JobPost, 'id' | 'posted'>) => adminApi.createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-jobs'] });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast.success('Job post created!');
    },
  });

  const updateJob = useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<JobPost> }) => adminApi.updateJobPost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-jobs'] });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast.success('Job post updated!');
    },
  });

  const deleteJob = useMutation({
    mutationFn: (id: string) => adminApi.deleteJobPost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-jobs'] });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast.success('Job post removed');
    },
  });

  return { jobs, createJob, updateJob, deleteJob };
};

// ─── BLOG MANAGEMENT ─────────────────────────────────────────────────────────

export const useAdminBlog = () => {
  const queryClient = useQueryClient();

  const blogPosts = useQuery({
    queryKey: ['admin-blog-posts'],
    queryFn: adminApi.getBlogPosts,
  });

  const createPost = useMutation({
    mutationFn: (data: Omit<BlogPost, 'id' | 'date'>) => adminApi.createBlogPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast.success('Blog post published!');
    },
  });

  const updatePost = useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<BlogPost> }) => adminApi.updateBlogPost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast.success('Blog post updated!');
    },
  });

  const deletePost = useMutation({
    mutationFn: (id: string) => adminApi.deleteBlogPost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-blog-posts'] });
      queryClient.invalidateQueries({ queryKey: ['blog-posts'] });
      toast.success('Blog post removed');
    },
  });

  return { blogPosts, createPost, updatePost, deletePost };
};
