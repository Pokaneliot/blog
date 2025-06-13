import { z } from 'zod';

export const categorySchema = z.object({
  title: z.string().min(2, 'Title is too short'),
});