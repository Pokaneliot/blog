import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  fetchCategories,
  createCategory,
  deleteCategory,
  type Category,
} from '../api/categories';
import { categorySchema } from '../validation/categorySchema';

const CategoryPage: React.FC = () => {
  const queryClient = useQueryClient();

  // Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
  });

  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const createMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      reset();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const onSubmit = (data: z.infer<typeof categorySchema>) => {
    createMutation.mutate(data.title);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 space-y-6">
      <h1 className="text-2xl font-bold">Manage Categories</h1>

      {/* Add form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 items-start">
        <div className="flex-1">
          <input
            {...register('title')}
            placeholder="Category title"
            className="w-full border p-2"
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={createMutation.isPending}
        >
          {createMutation.isPending ? 'Adding...' : 'Add'}
        </button>
      </form>

      {/* Category table */}
      {isLoading ? (
        <p>Loading categories...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Title</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((cat: Category) => (
              <tr key={cat.id}>
                <td className="p-2 border">{cat.id}</td>
                <td className="p-2 border">{cat.title}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete category "${cat.title}"?`)) {
                        deleteMutation.mutate(cat.id);
                      }
                    }}
                    className="text-red-600 hover:underline"
                    disabled={deleteMutation.isPending}
                  >
                    {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CategoryPage;
