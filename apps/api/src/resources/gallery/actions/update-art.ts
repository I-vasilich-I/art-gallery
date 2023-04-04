import { AppKoaContext, AppRouter, Next } from 'types';
import { z } from 'zod';
import { galleryService } from 'resources/gallery';
import { validateMiddleware } from 'middlewares';


const schema = z.object({
  isPublic: z.boolean(),
});

type ValidatedData = z.infer<typeof schema>;
type Request = {
  params: {
    id: string;
  }
};

async function validator(ctx: AppKoaContext<ValidatedData, Request>, next: Next) {

  const isArtExists = await galleryService.exists({ _id: ctx.request.params.id, userId: ctx.state.user._id });
  

  ctx.assertError(isArtExists, 'Art not found');

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData, Request>) {
  const { isPublic } = ctx.validatedData;

  const updatedArt = await galleryService.updateOne(
    { _id: ctx.request.params.id },
    () => ({ isPublic }),
  );

  ctx.body = updatedArt;
}


export default (router: AppRouter) => {
  router.put('/:id', validator, validateMiddleware(schema), handler);
};