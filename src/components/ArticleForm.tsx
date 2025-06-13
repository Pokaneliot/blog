import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { articleSchema } from '../validation/articleSchema';
import { z } from 'zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createArticle} from '../api/articles';
import { fetchCategories } from '../api/categories';
import type { Category } from '../api/categories';

const ArticleForm: React.FC = () => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<z.infer<typeof articleSchema>>({
    resolver: zodResolver(articleSchema),
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const mutation = useMutation({
    mutationFn: createArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
      reset();
    },
    onError: (error) => {
        console.error('Failed to submit article:', error);
        alert('Submission failed. Check console or server logs.');
    },
  });

  const onSubmit = (data: z.infer<typeof articleSchema>) => {
    console.log('Form data:', data);
    mutation.mutate(data);
  };

  return (
    <form
  onSubmit={handleSubmit(onSubmit)}
  className="space-y-6 w-full"
>
  <div className="w-full">
    {/* <label htmlFor="title" className="sr-only">Title</label> */}
    <input
      id="title"
      {...register('title')}
      className="border-b-2 border-gray-300 focus:border-blue-500 px-1 py-3 w-full bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none transition-all text-base"
      placeholder="Title"
      style={{ minHeight: '2.5rem', width: '50%', marginBottom: '12px' }}
    />
    {errors.title && <p className="mt-1 text-red-500 text-sm">{errors.title.message}</p>}
  </div>

  <div className="w-full">
    {/* <label htmlFor="content" className="sr-only">Content</label> */}
    <textarea
      id="content"
      {...register('content')}
      className="border-b-2 border-gray-300 focus:border-blue-500 px-1 py-3 w-full h-36 resize-y bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none transition-all text-base"
      placeholder="Content"
      style={{ minHeight: '6rem', width: '80%', marginBottom: '12px' }}
    />
    {errors.content && <p className="mt-1 text-red-500 text-sm">{errors.content.message}</p>}
  </div>

  <div className="w-full">
    {/* <label htmlFor="categories" className="block text-sm text-gray-600 mb-1">Categories</label> */}
    <select
      id="categories"
      multiple
      className="border-b-2 border-gray-300 focus:border-blue-500 px-1 py-2 w-full bg-transparent text-gray-900 focus:outline-none transition-all cursor-pointer"
      onChange={e => {
        const selected = Array.from(e.target.selectedOptions).map(opt => Number(opt.value));
        setValue('categoryIds', selected, { shouldValidate: true });
      }}
      style={{ minHeight: '2rem', width: '60%' , marginBottom: '12px'}}
    >
      {categoriesLoading && <option className="text-gray-400">Loading...</option>}
      {categories &&
        categories.map((cat: Category) => (
          <option key={cat.id} value={cat.id} className="text-gray-900 hover:bg-gray-70">
            {cat.title}
          </option>
        ))}
    </select>
    {errors.categoryIds && <p className="mt-1 text-red-500 text-sm">{errors.categoryIds.message}</p>}
  </div>

  <button
    type="submit"
    disabled={mutation.isPending}
    className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium px-6 py-3 rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
    style={{ width: '70%' }}
  >
    {mutation.isPending ? (
      <span className="flex items-center justify-center gap-2">
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Submitting...
      </span>
    ) : 'Submit'}
  </button>
</form>

  );
};

export default ArticleForm;