import Task from "../Schema/TaskSchema.js";
export default async function GetTasks(req, res) {
  const { date } = req.query;
  const taskDate = new Date(date);
  const startDate = new Date(taskDate);
  startDate.setDate(taskDate.getDate() - taskDate.getDay());
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  const task1 = Task.find({ taskDate: taskDate });
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

  await Promise.all([task1, task2, task3])
    .then((val) => {
      tasks = val[0];
      completedCount = val[1];
      uncompletedcount = val[2];
    })
    .catch((err) => res.status(500).json({ status: false, error: err }));

  res
    .status(200)
    .json({ status: true, data: { tasks, completedCount, uncompletedcount } });
}
