import { useQuery } from '@tanstack/react-query';
import { publicApi } from '../api/publicApi';
import { useAppCache } from '../store/persistentStore';
import { useEffect } from 'react';

export const useBlogPosts = () => {
  const { blogPosts: cachedPosts, setBlogPosts } = useAppCache();

  const query = useQuery({
    queryKey: ['blog-posts'],
    queryFn: publicApi.getBlogPosts,
    initialData: cachedPosts.length > 0 ? cachedPosts : undefined,
  });

  useEffect(() => {
    if (query.data && query.data !== cachedPosts) {
      setBlogPosts(query.data);
    }
  }, [query.data, cachedPosts, setBlogPosts]);

  return query;
};

export const useBlogPost = (slug: string) => {
  const { blogPosts } = useAppCache();
  
  // Try to find it in the cached list first
  const initialPost = blogPosts.find(p => p.slug === slug);

  return useQuery({
    queryKey: ['blog-post', slug],
    queryFn: () => publicApi.getBlogPostBySlug(slug),
    initialData: initialPost,
    enabled: !!slug,
  });
};
