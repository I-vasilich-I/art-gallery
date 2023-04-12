import { z } from 'zod';

import { securityUtil } from 'utils';
import { authService } from 'services';
import { validateMiddleware } from 'middlewares';
import { AppKoaContext, Next, AppRouter } from 'types';
import { userService, User } from 'resources/user';
import { ERROR_MESSAGES, VALIDATION_MESSAGES } from 'app.constants';

const { ENTER_ENTITY, INCORRECT_EMAIL_FORMAT } = VALIDATION_MESSAGES;

const schema = z.object({
  email: z.string().min(1, ENTER_ENTITY('email')).email(INCORRECT_EMAIL_FORMAT),
  password: z.string().min(1, ENTER_ENTITY('password')),
});

interface ValidatedData extends z.infer<typeof schema> {
  user: User;
}

async function validator(ctx: AppKoaContext<ValidatedData>, next: Next) {
  const { email, password } = ctx.validatedData;

  const user = await userService.findOne({ email });

  ctx.assertClientError(user && user.passwordHash, {
    credentials: ERROR_MESSAGES.INVALID_CREDENTIALS,
  });

  const isPasswordMatch = await securityUtil.compareTextWithHash(password, user.passwordHash);
  ctx.assertClientError(isPasswordMatch, {
    credentials: ERROR_MESSAGES.INVALID_CREDENTIALS,
  });

  ctx.assertClientError(user.isEmailVerified, {
    email: ERROR_MESSAGES.VERIFY_YOUR_EMAIL,
  });

  ctx.validatedData.user = user;
  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const { user } = ctx.validatedData;
  ctx.cookies.secure = true;

  await Promise.all([
    userService.updateLastRequest(user._id),
    authService.setTokens(ctx, user._id),
  ]);

  ctx.body = userService.getPublic(user);
}

export default (router: AppRouter) => {
  router.post('/sign-in', validateMiddleware(schema), validator, handler);
};
