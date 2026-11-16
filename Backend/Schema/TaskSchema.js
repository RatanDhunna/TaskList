import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
  taskDate: {
    type: Date,
    default: Date.now,
  },
  isComplete: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
  },
});

const TaskModel = mongoose.model("Task", taskSchema);

export default TaskModel;
