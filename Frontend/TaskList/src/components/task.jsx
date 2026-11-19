
function Task({
  task,
  onDelete,
  onStatusUpdate,
  setModal,
  setformData,
  setIsEdit,
  setMessage,
}) {
  const {
    _id,
    title,
    startTime,
    endTime,
    taskDate,
    isComplete,
    description,
  } = task;

  // Convert Date into YYYY-MM-DD for date input.
  function formatDate(date) {
    const d = new Date(date);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  // Convert Date into HH:mm for time input.
  function formatTime(time) {
    if (!time) return "";

    if (typeof time === "string" && /^\d{2}:\d{2}$/.test(time)) {
      return time;
    }

    const d = new Date(time);

    if (Number.isNaN(d.getTime())) return "";

    return `${String(d.getHours()).padStart(2, "0")}:${String(
      d.getMinutes()
    ).padStart(2, "0")}`;
  }

  function handleEdit() {
    setMessage("");

    setformData({
      _id,
      title,
      startTime: formatTime(startTime),
      endTime: formatTime(endTime),
      taskDate: formatDate(taskDate),
      isComplete,
      description: description || "",
    });

    setIsEdit(true);
    setModal(true);
  }

  function handleStatusClick() {
    onStatusUpdate(_id, !isComplete);
  }

  function handleTaskDelete() {
    onDelete(_id);
  }

  return (
    <div>
      <ul className="dashboard__task-list">
        <li
          className={`dashboard__task ${
            isComplete ? "dashboard__task--done" : ""
          }`}
        >
          <span
            className="dashboard__task-check"
            aria-hidden="true"
            onClick={handleStatusClick}
          >
            {isComplete && "✓"}
          </span>

          <span className="dashboard__task-name">
            {title}
          </span>

          <span className="dashboard__task-actions">
            <span
              className="dashboard__trash-icon"
              onClick={handleTaskDelete}
            />

            <span
              className="dashboard__edit-icon"
              onClick={handleEdit}
            />
          </span>
        </li>
      </ul>
    </div>
  );
}

export default Task;
