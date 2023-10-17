import { z } from 'zod';

// import config from 'config';
import { securityUtil } from 'utils';
import { analyticsService } from 'services';
import { validateMiddleware } from 'middlewares';
import { AppKoaContext, Next, AppRouter } from 'types';
import { userService, User } from 'resources/user';
import { ERROR_MESSAGES, PASSWORD_REGEX, VALIDATION_MESSAGES } from 'app.constants';

const { ENTER_ENTITY, INCORRECT_EMAIL_FORMAT, INCORRECT_PASSWORD_FORMAT } = VALIDATION_MESSAGES;

const schema = z.object({
  firstName: z.string().min(1, ENTER_ENTITY('First name')).max(100),
  lastName: z.string().min(1, ENTER_ENTITY('Last name')).max(100),
  email: z.string().min(1, ENTER_ENTITY('email')).email(INCORRECT_EMAIL_FORMAT),
  password: z.string().regex(
    PASSWORD_REGEX,
    INCORRECT_PASSWORD_FORMAT,
  ),
});

interface ValidatedData extends z.infer<typeof schema> {
  user: User;
}

async function validator(ctx: AppKoaContext<ValidatedData>, next: Next) {
  const { email } = ctx.validatedData;

  const isUserExists = await userService.exists({ email });
  ctx.assertClientError(!isUserExists, {
    email: ERROR_MESSAGES.USER_WITH_EMAIL_EXIST,
  });

  await next();
}

async function handler(ctx: AppKoaContext<ValidatedData>) {
  const {
    firstName,
    lastName,
    email,
    password,
  } = ctx.validatedData;

  const [hash, signupToken] = await Promise.all([
    securityUtil.getHash(password),
    securityUtil.generateSecureToken(),
  ]);

  const user = await userService.insertOne({
    email,
    firstName,
    lastName,
    fullName: `${firstName} ${lastName}`,
    passwordHash: hash.toString(),
    isEmailVerified: false,
    signupToken,
  });

  analyticsService.track('New user created', {
    firstName,
    lastName,
  });

  // await emailService.sendVerifyEmail(user.email, {
  //   verifyEmailUrl: `${config.apiUrl}/account/verify-email?token=${signupToken}`,
  // });

  // since it's a only a test app, I'll return token in production as well
  ctx.body = { signupToken }; // config.isDev ? { signupToken } : {};
}

export default (router: AppRouter) => {
  router.post('/sign-up', validateMiddleware(schema), validator, handler);
};
