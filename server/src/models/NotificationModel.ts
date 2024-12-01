import mongoose, { Schema, Document, Types } from "mongoose";

// Define the Notice interface extending Document
interface INotice extends Document {
  team: Types.ObjectId[]; // Array of ObjectIds referencing the User model
  text: string;
  task: Types.ObjectId; // ObjectId referencing the Task model
  notiType: 'alert' | 'message'; // Notification type
  isRead: Types.ObjectId[]; // Array of ObjectIds referencing the User model who read the notice
}

// Define the Notice schema
const noticeSchema: Schema<INotice> = new Schema(
  {
    team: [{ type: Schema.Types.ObjectId, ref: "User" }], // Reference to User model (array)
    text: { type: String, required: true },
    task: { type: Schema.Types.ObjectId, ref: "Task", required: true }, // Reference to Task model
    notiType: { type: String, default: "alert", enum: ["alert", "message"] }, // Type of notification
    isRead: [{ type: Schema.Types.ObjectId, ref: "User" }], // Array of User references who have read the notice
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Create the Notice model using the schema
const Notice = mongoose.model<INotice>("Notice", noticeSchema);

export default Notice;
