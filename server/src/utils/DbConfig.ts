import mongoose from 'mongoose';
import { ENV } from './EnviromentVar';



// MongoDB connection URI
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';

/**
 * Connect to MongoDB using Mongoose
 */
export const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(ENV.MONGO_URI);
    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process if connection fails
  }
};

/**
 * Close the database connection
 */
export const closeDatabaseConnection = async (): Promise<void> => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
};
