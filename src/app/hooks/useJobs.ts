import { useQuery } from '@tanstack/react-query';
import { publicApi } from '../api/publicApi';
import { useAppCache } from '../store/persistentStore';
import { useEffect } from 'react';

export const useJobs = () => {
  const { jobs: cachedJobs, setJobs } = useAppCache();

  const query = useQuery({
    queryKey: ['jobs'],
    queryFn: publicApi.getJobs,
    initialData: cachedJobs.length > 0 ? cachedJobs : undefined,
  });

  // Keep our persistent store updated
  useEffect(() => {
    if (query.data && query.data !== cachedJobs) {
      setJobs(query.data);
    }
  }, [query.data, cachedJobs, setJobs]);

  return query;
};
