import { upFetch } from './client';

export interface Category {
  id: number;
  title: string;
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    return await upFetch('/categories', {
      method: 'GET'
    });
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    throw error;
  }
}

export async function createCategory(title: string): Promise<Category> {
  try {
    return await upFetch('/categories', {
      method: 'POST',
      body: { title }  
    });
  } catch (error) {
    console.error('Failed to create category:', error);
    throw error;
  }
}

export async function updateCategory(id: number, title: string): Promise<Category> {
  try {
    return await upFetch(`/categories/${id}`, {
      method: 'PUT',
      body: { title }
    });
  } catch (error) {
    console.error(`Failed to update category ${id}:`, error);
    throw error;
  }
}

export async function deleteCategory(id: number): Promise<void> {
  try {
    await upFetch(`/categories/${id}`, {
      method: 'DELETE'
    });
  } catch (error) {
    console.error(`Failed to delete category ${id}:`, error);
    throw error;
  }
}