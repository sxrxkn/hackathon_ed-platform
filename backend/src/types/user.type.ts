import { z } from 'zod';

export const UserSchema = z.object({
  last_name: z.string().max(30),
  first_name: z.string().max(30),
  middle_name: z.string().max(30),
  birth_date: z.any(),
  city: z.string().max(30),
  email: z.string().email().max(254),
  password: z.string().max(128),
  is_teacher: z.number().int(),
  is_admin: z.number().int(),
}).required();

export type User = z.infer<typeof UserSchema>;