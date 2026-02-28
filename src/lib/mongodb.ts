// MongoDB connection - This is used for server-side API routes
// For client-side, we use the API functions in src/api/

import mongoose from 'mongoose';

const MONGODB_URI = import.meta.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  console.warn('MONGODB_URI is not defined. Database features will not work.');
}

// This function is meant to be used in server-side API routes
// In a full-stack setup, this would connect to MongoDB
async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined');
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI);
    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export default connectDB;
