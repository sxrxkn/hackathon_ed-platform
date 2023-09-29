import { z } from 'zod';

const Test = z.object({
  test_id: z.number().int().positive(),
  course_id: z.number().int().positive(),
  name: z.string().max(50),
  description: z.string().max(254),
  passing_score: z.number().positive(),
});

export type Test = z.infer<typeof Test>;
export default Test;