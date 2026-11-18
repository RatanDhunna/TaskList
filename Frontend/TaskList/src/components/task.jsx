import { useState } from "react";
import api from "../axiosInstance";
import { useEffect } from "react";

function Task({ task, setTodayTask }) {
  const { _id, title, desciption, isComplete } = task;
  const [taskStatus, setTaskStatus] = useState(isComplete);

  useEffect(() => {
    async function updateStatus() {
      const response = await api.patch(`/updateTask/${_id}`, {
        isComplete: taskStatus,
      });
      if (!response.status) {
        setTaskStatus((prev) => !prev);
      }
    }

    updateStatus();
  }, [taskStatus]);
  async function handleTaskDelete() {
    const response = await api.delete(`/deletetask/${_id}`);
    console.log("Delete Reponse", response);
    if (response?.data.status) {
      setTodayTask((prev) => {
        const newTaskList = prev.filter((ele) => ele._id !== _id);
        return [...newTaskList];
      });
    }
  }

  async function handleStatusClick() {
    setTaskStatus((prev) => !prev);
  }

  return (
    <div>
      <ul className="dashboard__task-list">
        <li
          className={`dashboard__task ${taskStatus && "dashboard__task--done"} `}
        >
          <span
            className="dashboard__task-check"
            aria-hidden="true"
            onClick={handleStatusClick}
          >
            {taskStatus && "✓"}
          </span>
          <span className="dashboard__task-name">{title}</span>
          <span className="dashboard__task-actions" aria-hidden="true">
            <span
              className="dashboard__trash-icon"
              onClick={handleTaskDelete}
            />
            <span className="dashboard__edit-icon" />
          </span>
        </li>
      </ul>
    </div>
  );
}

export default Task;
