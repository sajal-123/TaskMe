import mongoose, { Schema, Document, Types } from 'mongoose';

// Define the types for the subTask and activity elements
export interface IActivity {
  type: 'assigned' | 'started' | 'in progress' | 'bug' | 'completed' | 'commented';
  activity: string;
  date: Date;
  by: Types.ObjectId; // Reference to the User model
}

interface ISubTask {
  title: string;
  date: Date;
  tag: string;
}

// Define the Task interface extending the Document interface from mongoose
interface ITask extends Document {
  title: string;
  date: Date;
  priority: 'high' | 'medium' | 'normal' | 'low';
  stage: 'todo' | 'in progress' | 'completed';
  activities: IActivity[]; // Array of activities
  subTasks: ISubTask[]; // Array of subTasks
  assets: string[]; // Array of asset URLs/paths
  team: Types.ObjectId[]; // Array of ObjectIds referencing the User model
  isTrashed: boolean;
}

// Create the task schema
const taskSchema: Schema<ITask> = new Schema(
  {
    title: { type: String, required: true },
    date: { type: Date, default: new Date() },
    priority: {
      type: String,
      default: 'normal',
      enum: ['high', 'medium', 'normal', 'low'],
    },
    stage: {
      type: String,
      default: 'todo',
      enum: ['todo', 'in progress', 'completed'],
    },
    activities: [
      {
        type: { 
          type: String, 
          default: 'assigned', 
          enum: ['assigned', 'started', 'in progress', 'bug', 'completed', 'commented'] 
        },
        activity: { type: String, required: true },
        date: { type: Date, default: new Date() },
        by: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
      },
    ],
    subTasks: [
      {
        title: { type: String, required: true },
        date: { type: Date, required: true },
        tag: { type: String },
      },
    ],
    assets: [String], // Array of strings (e.g., asset URLs)
    team: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Array of User references
    isTrashed: { type: Boolean, default: false },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Create the Task model
const Task = mongoose.model<ITask>('Task', taskSchema);

export default Task;
