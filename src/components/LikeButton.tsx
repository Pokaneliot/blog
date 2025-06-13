import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addLike } from '../api/likes';

interface LikeButtonProps {
  articleId: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ articleId }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => addLike({ articleId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      queryClient.invalidateQueries({ queryKey: ['article', articleId] });
    },
  });

  return (
    <button
      onClick={() => mutation.mutate()}
      disabled={mutation.isPending} 
      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
    >
      {mutation.isPending ? 'Liking...' : 'Like'}
    </button>
  );
};

export default LikeButton;