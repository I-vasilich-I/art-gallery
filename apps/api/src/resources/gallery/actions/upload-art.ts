import multer from '@koa/multer';

import { firebaseStorageService } from 'services';
import { Next, AppKoaContext, AppRouter } from 'types';
import { galleryService } from 'resources/gallery';
import { z } from 'zod';
import { validateMiddleware } from 'middlewares';

const upload = multer();

const schema = z.object({
  isPublic: z.enum(['true', 'false']).optional(),
});

type ValidatedData = z.infer<typeof schema>;

async function validator(ctx: AppKoaContext<ValidatedData>, next: Next) {
  const { file } = ctx.request;

  ctx.assertClientError(file, {
    global: 'File cannot be empty',
  });

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { user } = ctx.state;
  const { file } = ctx.request;
  const { isPublic: isPublicParam } = ctx.validatedData;
  const isPublic = isPublicParam === 'true' ? true : false; 
  const fileName = `${user._id}-${Date.now()}-${file.originalname}`;
  const { ref } = await firebaseStorageService.upload(`gallery/${fileName}`, file);
  const path = await firebaseStorageService.getArtUrl(ref);

  const art = await galleryService.insertOne({
    userId: user._id,
    path,
    isPublic,
  });

  ctx.body = art;
}

export default (router: AppRouter) => {
  router.post('/art', upload.single('file'), validateMiddleware(schema), validator, handler);
};
