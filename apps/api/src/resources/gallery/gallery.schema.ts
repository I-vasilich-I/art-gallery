import { z } from 'zod';

const schema = z.object({
  _id: z.string(),
  createdOn: z.date().optional(),
  updatedOn: z.date().optional(),
  userId: z.string(),
  path: z.string(),
  isPublic: z.boolean().default(false),
}).strict();

export default schema;
