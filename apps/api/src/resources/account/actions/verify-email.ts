import { z } from 'zod';
import config from 'config';

import { AppKoaContext, Next, AppRouter } from 'types';

import { validateMiddleware } from 'middlewares';
import { authService } from 'services';
import { userService, User } from 'resources/user';
import { ERROR_MESSAGES, STATUS_CODES, VALIDATION_MESSAGES } from 'app.constants';

const schema = z.object({
  token: z.string().min(1, VALIDATION_MESSAGES.ENTITY_REQUIRED('Token')),
});

interface ValidatedData extends z.infer<typeof schema> {
  user: User;
}

async function validator(ctx: AppKoaContext<ValidatedData>, next: Next) {
  const user = await userService.findOne({ signupToken: ctx.validatedData.token });

  ctx.assertClientError(user, { token: ERROR_MESSAGES.INVALID_TOKEN }, STATUS_CODES.NOT_FOUND);

  ctx.validatedData.user = user;
  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { user } = ctx.validatedData;

  await userService.updateOne(
    { _id: user._id },
    () => ({
      isEmailVerified: true,
      signupToken: null,
    }),
  );

  await Promise.all([
    userService.updateLastRequest(user._id),
    authService.setTokens(ctx, user._id),
  ]);

  // await emailService.sendSignUpWelcome(user.email, {
  //   userName: user.fullName,
  //   actionLink: `${config.webUrl}/sign-in`,
  //   actionText: 'Sign in',
  // });

  ctx.redirect(config.webUrl);
}

export default (router: AppRouter) => {
  router.get('/verify-email', validateMiddleware(schema), validator, handler);
};
