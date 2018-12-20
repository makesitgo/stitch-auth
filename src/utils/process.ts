export const ENV_PROD = 'production';

export const nodeEnv = process.env.NODE_ENV;

export const isProd = () => nodeEnv === ENV_PROD;

export const publicUrl = process.env.PUBLIC_URL;
