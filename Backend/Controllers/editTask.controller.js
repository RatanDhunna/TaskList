import Task from "../Schema/TaskSchema.js";

export default async function editTask(req, res) {
  const { id } = req.params.id;
  const updateObj = req.body;

  try {
    const updated = await Task.updateOne({ _id: id }, { ...updateObj });
    return res
      .status(200)
      .json({
        status: true,
        message: "updated task sucessfully",
        data: updated,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "error in updating task", error: err });
  }
}
