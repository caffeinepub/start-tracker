import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

export function useGetCounts() {
  const { actor, isFetching } = useActor();

  return useQuery<[bigint, bigint]>({
    queryKey: ['counts'],
    queryFn: async () => {
      if (!actor) return [BigInt(0), BigInt(0)];
      return actor.getCounts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useClickStart() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.clickStart();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['counts'] });
    },
  });
}

export function useClickNoStart() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.clickNoStart();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['counts'] });
    },
  });
}

export function useResetCounts() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.resetCounts();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['counts'] });
    },
  });
}
