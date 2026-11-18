import Task from "../Schema/TaskSchema.js";

export default async function editTask(req, res) {
  const { id } = req.params;
  const updateObj = req.body;
  console.log("edit task called with id:", id, "body:", updateObj);
  try {
    const updated = await Task.updateOne({ _id: id }, { ...updateObj });
    return res.status(200).json({
      status: true,
      message: "updated task sucessfully",
      data: updated,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "error in updating task", error });
  }
}
