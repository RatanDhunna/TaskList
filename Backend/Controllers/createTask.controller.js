import Task from "../Schema/TaskSchema.js";

export default async function CreateTask(req, res) {
  const { title, startTime, endTime, taskDate, description } = req.body;
   console.log(`Create Task called with ${title, startTime, endTime, taskDate, description }`)
  try {
    const task = await Task.create({
      title,
      startTime,
      endTime,
      taskDate,
      description,
    });

    return res.status(200).json({
      status: true,
      message: "Task added sucessfully",
      task: task,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Error while adding task",
      error: error,
    });
  }
}
