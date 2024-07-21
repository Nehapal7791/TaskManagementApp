import mongoose, { Schema } from "mongoose";

const taskdataSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxLength: [50, "Title should not exceed 50 characters"],
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    priorityStatus: {
      type: String,
      required: true,
    },
    dueDate: {
      type: String,
      trim: true,
      required: [true, "Due date is required"],
    },
    isDone: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskdataSchema);
export default Task;
