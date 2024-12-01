import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongoose'; // Import ObjectId for referencing

// Import the Task model
import Task from './TaskModel';

// Define the user interface
interface IUser extends Document {
  name: string;
  title: string;
  role: string;
  email: string;
  password: string;
  isAdmin: boolean;
  isActive: boolean;
  tasks: Array<ObjectId>;  // Array of references to Task model
  comparePassword(password: string): Promise<boolean>;
}

// Create the user schema
const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,  // Defaults to true (active user)
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',  // Reference to the Task model
      },
    ],
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Hash password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error:any) {
    next(error);
  }
});

// Compare entered password with hashed password
userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};

// Create the User model
const User = mongoose.model<IUser>('User', userSchema);

export default User;
