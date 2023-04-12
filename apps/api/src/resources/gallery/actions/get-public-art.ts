import { AppKoaContext, AppRouter } from 'types';
import { galleryService } from 'resources/gallery';

async function handler(ctx: AppKoaContext) {
  const artCollection = await galleryService.find({ isPublic: true }, undefined, { sort: { createdOn: 'desc' } });

  ctx.body = artCollection;
}

export default (router: AppRouter) => {
  router.get('/public', handler);
};
