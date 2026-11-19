
import Task from "../Schema/TaskSchema.js";

export default async function editTask(req, res) {
  const { id } = req.params;
  const updateObj = req.body;

  console.log("Edit task called:", id, updateObj);

  try {
    const updated = await Task.findByIdAndUpdate(
      id,
      { $set: updateObj },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated) {
      return res.status(404).json({
        status: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Task updated successfully",
      data: updated,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Error while updating task",
      error: error.message,
    });
  }
}
