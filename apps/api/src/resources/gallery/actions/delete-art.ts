import { AppKoaContext, AppRouter, Next } from 'types';
import { galleryService } from 'resources/gallery';
import { firebaseStorageService } from 'services';
import { ERROR_MESSAGES, STATUS_CODES } from 'app.constants';

type ValidatedData = never;
type Request = {
  params: {
    id: string;
  }
};

async function validator(ctx: AppKoaContext<ValidatedData, Request>, next: Next) {
  const isArtExists = await galleryService.exists({ _id: ctx.request.params.id, userId: ctx.state.user._id });

  ctx.assertError(isArtExists, ERROR_MESSAGES.ENTITY_NOT_FOUND('Art'));

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData, Request>) {
  const { id } = ctx.request.params;

  const art = await galleryService.findOne({ _id: id });

  if (art?.path) {
    await firebaseStorageService.deleteArt(art.path);
  }

  await galleryService.deleteOne({ _id: id });

  ctx.status = STATUS_CODES.NO_CONTENT;
}


export default (router: AppRouter) => {
  router.delete('/:id', validator, handler);
};