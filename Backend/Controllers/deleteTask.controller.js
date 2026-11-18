import Task from "../Schema/TaskSchema.js";

export default async function deleteTask(req, res) {
  const { id } = req.params;
  console.log(`Delete Task called with ${id}`)
  try {
    const deleted = await Task.deleteOne({ _id: id });
    return res
      .status(200)
      .json({
        status: true,
        message: "task deleted successfully",
        data: deleted,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "crashed at deleting task", error: err });
  }
}
