import { useState } from "react";
import Input from "../components/Input";
import Weeklycalender from "../components/weeklycalender";
import "./Home.css";
import Task from "../components/task";
import { useEffect } from "react";
import api from "../axiosInstance";

function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekCounter, setWeekCounter] = useState(0);
  const [todayTask, setTodayTask] = useState([]);
  const [weekcount, setWeekCount] = useState(0);

  useEffect(() => {
    async function getTasks() {
      console.log(`/getTas`, { params: { data: selectedDate.toISOString() } });
      const response = await api.get(`/getTask`, {
        params: { date: selectedDate.toISOString() },
      });
      console.log(response);
      const { data } = response;
      if (data.status === true) {
        setTodayTask([...data.data.tasks]);
        setWeekCount([data.data.completedCount, data.data.uncompletedcount]);
      }
    }
    getTasks();
  }, [selectedDate, todayTask]);

  function searchInput(e) {
    setSearchValue(e.target.value);
  }
  return (
    <main className="dashboard">
      <div className="dashboard__search">
        <Input
          classprop="dashboard__search-input"
          onChange={searchInput}
          placeholder="Search for a task"
          currValue={searchValue}
        />
        <span className="dashboard__search-icon" aria-hidden="true" />
      </div>
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
            {weekcount[1]} <span>This Week</span>
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

      <section className="dashboard__tasks" aria-labelledby="tasks-today-title">
        <div className="dashboard__section-heading">
          <h2 id="tasks-today-title">Tasks Today</h2>
          <button className="dashboard__view-all" type="button">
            View All
          </button>
        </div>
        {todayTask.length === 0 ? (
          <div>No tasks scheduled for today</div>
        ) : (
          todayTask.map((ele, ind) => (
            <Task key={ele._id} task={ele} setTodayTask={setTodayTask} />
          ))
        )}
      </section>
      <button className="dashboard__add" type="button" aria-label="Add task">
        <span aria-hidden="true">+</span>
      </button>
    </main>
  );
}

export default Home;
