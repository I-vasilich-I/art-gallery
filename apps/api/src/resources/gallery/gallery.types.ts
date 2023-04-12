import { z } from 'zod';

import schema from './gallery.schema';

export type Gallery = z.infer<typeof schema>;
