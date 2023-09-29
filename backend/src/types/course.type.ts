import { z } from 'zod';

const Course = z.object({
  course_id: z.number().int().positive(),
  name: z.string().max(50),
  description: z.string().max(100),
  author: z.string().max(30),
  tag: z.string().max(50),
  is_open: z.boolean(),
});

export type Course = z.infer<typeof Course>;
export default Course;