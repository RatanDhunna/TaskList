import Task from "../Schema/TaskSchema.js";

export default async function SearchTasks(req, res) {
  const query = typeof req.query.q === "string" ? req.query.q.trim() : "";

  if (!query) {
    return res.status(400).json({
      status: false,
      message: "A search keyword is required",
    });
  }

  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  try {
    const tasks = await Task.find({
      $or: [
        { title: { $regex: escapedQuery, $options: "i" } },
        { description: { $regex: escapedQuery, $options: "i" } },
      ],
    }).sort({ taskDate: -1 });

    return res.status(200).json({
      status: true,
      data: { tasks },
    });
  } catch (error) {
    console.error("Error searching tasks:", error);
    return res.status(500).json({
      status: false,
      message: "Unable to search tasks",
    });
  }
}
