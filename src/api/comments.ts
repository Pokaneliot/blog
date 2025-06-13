import { upFetch } from './client';

export interface CommentPayload {
  articleId: number;
  content: string;
}

export async function addComment(payload: CommentPayload): Promise<void> {
  try {
    await upFetch('/comments', {
      method: 'POST',
      body: payload, 
    });
  } catch (error) {
    console.error('Failed to add comment:', error);
    throw error; 
  }
}