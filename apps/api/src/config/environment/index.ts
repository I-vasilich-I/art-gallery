import { configUtil } from 'utils';

const env = process.env.APP_ENV || 'development';

const base = {
  env,
  port: process.env.PORT || 3001,
  isDev: env === 'development' || env === 'development-docker',
  mongo: {
    connection: process.env.MONGO_CONNECTION || '',
    dbName: process.env.MONGO_DB_NAME || '',
  },
  apiUrl: '',
  webUrl: '',
  redis: process.env.REDIS_CONNECTION || 'redis://:super-secured-password@redis-master.redis.svc.cluster.local:6379',
  sendgridApiKey: process.env.SENDGRID_API_KEY || '',
  cloudStorage: {
    endpoint: process.env.CLOUD_STORAGE_ENDPOINT || '',
    credentials: {
      accessKeyId: process.env.CLOUD_STORAGE_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.CLOUD_STORAGE_SECRET_ACCESS_KEY || '',
    },
    bucket: process.env.CLOUD_STORAGE_BUCKET || '',
  },
  firebaseConfig: {
    apiKey: process.env.FIREBASE_API_KEY || '',
    authDomain: process.env.FIREBASE_AUTH_DOMAIN || '',
    projectId: process.env.FIREBASE_PROJECT_ID || '',
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || '',
    appId: process.env.FIREBASE_APP_ID || '',
  },
  adminKey: process.env.ADMIN_KEY || '',
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  },
  mixpanel: {
    apiKey: process.env.MIXPANEL_API_KEY || '',
  },
};

const config = configUtil.loadConfig(base, env, __dirname);

export default config;
