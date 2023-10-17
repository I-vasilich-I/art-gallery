import { AppKoaContext, AppRouter } from 'types';
import galleryService from '../gallery.service';

async function handler(ctx: AppKoaContext) {
  const { user } = ctx.state;

  const artCollection = await galleryService.find({ userId: user._id }, undefined, { sort: { createdOn: 'desc' } });

  ctx.body = artCollection;
}

export default (router: AppRouter) => {
  router.get('/user', handler);
};
