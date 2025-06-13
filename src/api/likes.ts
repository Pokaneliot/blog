import { upFetch } from './client';

export interface LikePayload {
  articleId: number;
}

export async function addLike(payload: LikePayload): Promise<void> {
  try {
    await upFetch('/likes', {
      method: 'POST',
      body: payload,  
    });
  } catch (error) {
    console.error('Failed to add like:', error);
    throw error;
  }
}