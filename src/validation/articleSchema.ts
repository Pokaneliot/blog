import { z } from 'zod';

export const articleSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  categoryIds: z.array(z.number()).min(1, 'Select at least one category'),
});