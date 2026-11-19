
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Input from "../components/Input";
import Weeklycalender from "../components/weeklycalender";
import "./Home.css";
import Task from "../components/task";
import AddTaskModal from "../components/createForm";
import api from "../axiosInstance";

function Home() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekCounter, setWeekCounter] = useState(0);

  const [todayTask, setTodayTask] = useState([]);
  const [weekcount, setWeekCount] = useState([0, 0]);

  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState("");
  const [isEdit, setIsEdit] = useState(false);

  const initialFormData = {
    _id: "",
    title: "",
    startTime: "",
    endTime: "",
    taskDate: "",
    isComplete: false,
    description: "",
  };

  const [formData, setformData] = useState(initialFormData);

  // Format date using local timezone.
  function formatDate(date) {
    const d = new Date(date);

    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function isSameDate(date1, date2) {
    return formatDate(date1) === formatDate(date2);
  }

  // Check whether a date belongs to the currently selected week.
  function isInSelectedWeek(date) {
    const start = new Date(selectedDate);
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - start.getDay());

    const end = new Date(start);
    end.setDate(end.getDate() + 7);

    const taskDate = new Date(date);

    return taskDate >= start && taskDate < end;
  }

  // Update weekly statistics based on old and new task.
  function updateWeeklyCounts(oldTask, newTask) {
    const oldInWeek =
      oldTask && isInSelectedWeek(oldTask.taskDate);

    const newInWeek =
      newTask && isInSelectedWeek(newTask.taskDate);

    const completedDifference =
      (newInWeek && newTask.isComplete ? 1 : 0) -
      (oldInWeek && oldTask.isComplete ? 1 : 0);

    const pendingDifference =
      (newInWeek && !newTask.isComplete ? 1 : 0) -
      (oldInWeek && !oldTask.isComplete ? 1 : 0);

    setWeekCount((prev) => [
      prev[0] + completedDifference,
      prev[1] + pendingDifference,
    ]);
  }

  // Fetch tasks only when selected date changes.
  useEffect(() => {
    getTasks();
  }, [selectedDate]);

  async function getTasks() {
    try {
      const response = await api.get("/getTask", {
        params: {
          date: selectedDate.toISOString(),
        },
      });

      if (response.data.status) {
        setTodayTask(response.data.data.tasks);

        setWeekCount([
          response.data.data.completedCount,
          response.data.data.uncompletedcount,
        ]);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  // Open create modal.
  function handleCreateForm() {
    setIsEdit(false);
    setMessage("");

    setformData({
      ...initialFormData,
      taskDate: formatDate(selectedDate),
    });

    setModal(true);
  }

  // Close modal and reset form.
  function handleCloseModal() {
    setModal(false);
    setMessage("");
    setformData(initialFormData);
  }

  // CREATE TASK
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post("/createTask", formData);

      if (response.data.status) {
        const newTask = response.data.task;

        // Update task list only if it belongs to selected date.
        if (isSameDate(newTask.taskDate, selectedDate)) {
          setTodayTask((prev) => [...prev, newTask]);
        }

        // Update weekly statistics.
        updateWeeklyCounts(null, newTask);

        handleCloseModal();
      }
    } catch (error) {
      console.error("Error creating task:", error);
      setMessage("Unable to create task");
    }
  }

  // EDIT TASK
  async function handleEditTask(e) {
    e.preventDefault();

    const { _id, ...taskUpdate } = formData;

    const oldTask = todayTask.find(
      (task) => task._id === _id
    );

    if (!oldTask) return;

    try {
      const response = await api.patch(
        `/updateTask/${_id}`,
        taskUpdate
      );

      if (response.data.status) {
        const updatedTask = response.data.data;

        // Update the current task list.
        setTodayTask((prev) => {
          // Remove task if its date was changed.
          if (!isSameDate(updatedTask.taskDate, selectedDate)) {
            return prev.filter((task) => task._id !== _id);
          }

          // Replace old task with updated task.
          return prev.map((task) =>
            task._id === _id ? updatedTask : task
          );
        });

        // Recalculate weekly counter differences.
        updateWeeklyCounts(oldTask, updatedTask);

        handleCloseModal();
      } else {
        setMessage("Task cannot be updated");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      setMessage("Unable to update task");
    }
  }

  // UPDATE TASK STATUS
  async function handleStatusUpdate(id, newStatus) {
    const currentTask = todayTask.find(
      (task) => task._id === id
    );

    if (!currentTask) return;

    try {
      const response = await api.patch(
        `/updateTask/${id}`,
        {
          isComplete: newStatus,
        }
      );

      if (response.data.status) {
        const updatedTask = {
          ...currentTask,
          isComplete: newStatus,
        };

        setTodayTask((prev) =>
          prev.map((task) =>
            task._id === id ? updatedTask : task
          )
        );

        updateWeeklyCounts(currentTask, updatedTask);
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  }

  // DELETE TASK
  async function handleTaskDelete(id) {
    const currentTask = todayTask.find(
      (task) => task._id === id
    );

    if (!currentTask) return;

    try {
      const response = await api.delete(`/deletetask/${id}`);

      if (response.data.status) {
        setTodayTask((prev) =>
          prev.filter((task) => task._id !== id)
        );

        // Remove task from weekly statistics.
        updateWeeklyCounts(currentTask, null);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  function searchInput(e) {
    setSearchValue(e.target.value);
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    const searchTerm = searchValue.trim();

    if (searchTerm) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  }

  return (
    <main className="dashboard">
      <form className="dashboard__search" onSubmit={handleSearchSubmit}>
        <Input
          classprop="dashboard__search-input"
          onChange={searchInput}
          placeholder="Search all tasks"
          currValue={searchValue}
        />

        <button
          className="dashboard__search-submit"
          type="submit"
          aria-label="Search tasks"
        >
          <span className="dashboard__search-icon" aria-hidden="true" />
        </button>
      </form>

      <div className="dashboard__calendar">
        <Weeklycalender
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          weekCount={weekCounter}
          setWeekCounter={setWeekCounter}
        />
      </div>

      <section className="dashboard__stats" aria-label="Task summary">
        <article className="dashboard__stat dashboard__stat--complete">
          <div className="dashboard__stat-label">
            <span
              className="dashboard__checkbox dashboard__checkbox--checked"
              aria-hidden="true"
            >
              ✓
            </span>

            <span>Task Complete</span>
          </div>

          <p className="dashboard__stat-count">
            {weekcount[0]}
            <span>This Week</span>
          </p>
        </article>

        <article className="dashboard__stat dashboard__stat--pending">
          <div className="dashboard__stat-label">
            <span
              className="dashboard__checkbox dashboard__checkbox--pending"
              aria-hidden="true"
            >
              ×
            </span>

            <span>Task Pending</span>
          </div>

          <p className="dashboard__stat-count">
            {weekcount[1]}
            <span>This Week</span>
          </p>
        </article>
      </section>

      <section
        className="dashboard__progress"
        aria-labelledby="weekly-progress-title"
      >
        <h1 id="weekly-progress-title">Weekly Progress</h1>

        <div className="dashboard__progress-track" aria-hidden="true">
          <span />
        </div>
      </section>

      <section
        className="dashboard__tasks"
        aria-labelledby="tasks-today-title"
      >
        <div className="dashboard__section-heading">
          <h2 id="tasks-today-title">Tasks Today</h2>

          <button className="dashboard__view-all" type="button">
            View All
          </button>
        </div>

        {todayTask.length === 0 ? (
          <div>No tasks scheduled for this date</div>
        ) : (
          todayTask.map((ele) => (
            <Task
              key={ele._id}
              task={ele}
              onDelete={handleTaskDelete}
              onStatusUpdate={handleStatusUpdate}
              setformData={setformData}
              setModal={setModal}
              setIsEdit={setIsEdit}
              setMessage={setMessage}
            />
          ))
        )}
      </section>

      <button
        className="dashboard__add"
        type="button"
        aria-label="Add task"
        onClick={handleCreateForm}
      >
        <span aria-hidden="true">+</span>
      </button>

      {modal && (
        <AddTaskModal
          onClose={handleCloseModal}
          formData={formData}
          setformData={setformData}
          handleSubmit={isEdit ? handleEditTask : handleSubmit}
          message={message}
        />
      )}
    </main>
  );
}

export default Home;
