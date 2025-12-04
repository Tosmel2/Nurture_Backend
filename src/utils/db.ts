import mongoose from 'mongoose';
import { MONGO_URI } from '../config';

export async function connectDB() {
  if (!MONGO_URI) {
    throw new Error('MONGO_URI not set in environment');
  }
  await mongoose.connect(MONGO_URI);
  console.log('MongoDB connected');
}