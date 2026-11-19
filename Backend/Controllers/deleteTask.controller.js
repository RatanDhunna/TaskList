
import Task from "../Schema/TaskSchema.js";

export default async function deleteTask(req, res) {
  const { id } = req.params;

  try {
    const deleted = await Task.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        status: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Task deleted successfully",
      data: deleted,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Error while deleting task",
      error: error.message,
    });
  }
}
