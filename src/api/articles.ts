import {upFetch} from './client';

export interface Category {
  id: number;
  title: string;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface Comment {
  id: number;
  user: User;
  content: string;
  createdAt: string;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  categories: Category[];
  comments: Comment[];
  articleLikesCount?: number;
  commentsCount?: number;
  categoriesCount?: number;
}
export type ArticleInput = {
  title: string;
  content: string;
  categoryIds: number[];
};


export interface ArticleListResponse {
  data: Article[];
  totalCount: number;
  filteredCount: number;
}

export async function createArticle(data: ArticleInput) {
  try {
    return await upFetch('/articles', {
      method: 'POST',
      body: data,
    });
  } catch (error) {
    console.error('Failed to create article:', error);
    throw error;
  }
}

export async function fetchArticles(
  start = 0,
  length = 10,
  search?: string,
  orderColumn?: string,
  orderDir?: 'ASC' | 'DESC'
): Promise<ArticleListResponse> {
    try {
    const params = new URLSearchParams({
        start: start.toString(),
        length: length.toString(),
        search: search || '',
        orderColumn: orderColumn || 'a.createdAt',
        orderDir: orderDir || 'DESC',
    });

    const query = params.toString();
    return await upFetch(`/articles?${query}`, {
      method: 'GET',
    });
    } 
    catch (error) {
    console.error('Failed to fetch articles:', error);
    throw error;
  }
}

export async function fetchArticle(id: number): Promise<Article> {
  try {
    return await upFetch(`/articles/${id}`, {
      method: 'GET'
    });
  } catch (error) {
    console.error(`Failed to fetch article ${id}:`, error);
    throw error;
  }
}
