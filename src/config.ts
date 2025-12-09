import dotenv from 'dotenv';

dotenv.config();

export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
export const JWT_SECRET = process.env.JWT_SECRET as string;
export const MONGO_URI = process.env.MONGO_URI || '';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is not defined in environment variables');
}