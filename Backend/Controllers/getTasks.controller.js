import Task from "../Schema/TaskSchema.js";
export default async function GetTasks(req, res) {
  const { date } = req.query;
  const taskDate = new Date(date);
  taskDate.setHours(0, 0, 0, 0);
  const nextDay = new Date(taskDate);
  nextDay.setDate(taskDate.getDate() + 1);
  nextDay.setHours(0, 0, 0, 0);
  const startDate = new Date(taskDate);
  startDate.setDate(taskDate.getDate() - taskDate.getDay());
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 7);

  console.log(`getTask called with date-${taskDate}`);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(0, 0, 0, 0);
  const task1 = Task.find({ taskDate: { $gte: taskDate, $lt: nextDay } });
  const task2 = Task.countDocuments({
    taskDate: { $gte: startDate, $lte: endDate },
    isComplete: true,
  });
  const task3 = Task.countDocuments({
    taskDate: { $gte: startDate, $lte: endDate },
    isComplete: false,
  });
  let tasks;
  let completedCount;
  let uncompletedcount;
  let error = null;
  await Promise.all([task1, task2, task3])
    .then((val) => {
      tasks = val[0];
      completedCount = val[1];
      uncompletedcount = val[2];
    })
    .catch((err) => (error = err));
  if (error) {
    return res.status(500).json({ status: false, error: error });
  }

  return res
    .status(200)
    .json({ status: true, data: { tasks, completedCount, uncompletedcount } });
}
