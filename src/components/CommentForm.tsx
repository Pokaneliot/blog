import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { addComment } from '../api/comments';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const commentSchema = z.object({
  content: z.string().min(1, 'Comment cannot be empty'),
});

type CommentFormData = z.infer<typeof commentSchema>;

interface CommentFormProps {
  articleId: number;
}

const CommentForm: React.FC<CommentFormProps> = ({ articleId }) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  const mutation = useMutation({
    mutationFn: ({ articleId, content }: { articleId: number; content: string }) =>
        addComment({ articleId, content }),
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['article', articleId] });
        reset();
    },
});

  const onSubmit = (data: CommentFormData) => {
    mutation.mutate({ articleId, content: data.content });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <textarea
        {...register('content')}
        placeholder="Write your comment"
        className="w-full border rounded p-2"
      />
      {errors.content && <p className="text-red-600">{errors.content.message}</p>}
      <button
        type="submit"
        disabled={mutation.isPending}
        className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
        >
        {mutation.isPending ? 'Submitting...' : 'Submit Comment'}
      </button>
    </form>
  );
};

export default CommentForm;
