import { AppKoaContext, AppRouter } from 'types';
import galleryService from '../gallery.service';

async function handler(ctx: AppKoaContext) {
  const { user } = ctx.state;

  const artArr = await galleryService.find({ userId: user._id });

  ctx.body = artArr;
}

export default (router: AppRouter) => {
  router.get('/user', handler);
};
