import { useState } from "react";
import "./createForm.css";
import api from "../axiosInstance";
function AddTaskModal({ onClose, formData, setformData,handleSubmit,message }) {

    const { title, startTime, endTime, taskDate, description } =
      formData;
  

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          {message !== "" && <p>{message}</p>}
          <h3>Add New Task</h3>

          <button onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Task title</label>
          <input
            type="text"
            placeholder="Enter task title"
            required
            value={title}
            onChange={(e) =>
              setformData((prev) => ({ ...prev, title: e.target.value }))
            }
          />

          <label>Set Time</label>
          <div className="time-inputs">
            <input
              type="time"
              value={startTime}
              onChange={(e) =>
                setformData((prev) => ({ ...prev, startTime: e.target.value }))
              }
            />
            <input
              type="time"
              value={endTime}
              onChange={(e) =>
                setformData((prev) => ({ ...prev, endTime: e.target.value }))
              }
            />
          </div>

          <label>Set Date</label>
          <input
            type="date"
            required
            value={taskDate}
            onChange={(e) =>
              setformData((prev) => ({ ...prev, taskDate: e.target.value }))
            }
          />

          <label>Description</label>
          <textarea
            placeholder="Add Description"
            value={description}
            onChange={(e) =>
              setformData((prev) => ({ ...prev, description: e.target.value }))
            }
          />

          <button type="submit" className="create-btn">
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTaskModal;
