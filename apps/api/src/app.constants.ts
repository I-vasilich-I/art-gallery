const DATABASE_DOCUMENTS = {
  USERS: 'users',
  TOKENS: 'tokens',
  GALLERY: 'gallery',
};

const COOKIES = {
  ACCESS_TOKEN: 'access_token',
};

const TOKEN_SECURITY_LENGTH = 32;
const STATUS_CODES = {
  NO_CONTENT: 204,
  NOT_FOUND: 404,
};

const FIREBASE_FOLDER_PATHS = {
  GALLERY: 'gallery',
};

const ERROR_MESSAGES = {
  ENTITY_NOT_FOUND: (entityName: string) => `${entityName} not found`,
  FILE_CANNOT_BE_EMPTY: 'File cannot be empty',
  INVALID_CREDENTIALS: 'The email or password you have entered is invalid',
  VERIFY_YOUR_EMAIL: 'Please verify your email to sign in',
  USER_WITH_EMAIL_EXIST: 'User with this email is already registered',
  INVALID_TOKEN: 'Token is invalid',
};

const VALIDATION_MESSAGES = {
  ENTER_ENTITY: (entityName: string) => `Please enter ${entityName}`,
  ENTITY_REQUIRED: (entityName: string) => `${entityName} is required`,
  INCORRECT_EMAIL_FORMAT: 'Email format is incorrect.',
  INCORRECT_PASSWORD_FORMAT: 
    'The password must contain 6 or more characters with at least one letter (a-z) and one number (0-9).',
};

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d\W]{6,}$/g;

export {
  DATABASE_DOCUMENTS,
  COOKIES,
  TOKEN_SECURITY_LENGTH,
  STATUS_CODES,
  FIREBASE_FOLDER_PATHS,
  ERROR_MESSAGES,
  VALIDATION_MESSAGES,
  PASSWORD_REGEX,
};
