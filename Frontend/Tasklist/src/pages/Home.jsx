import { useState } from "react";
import Input from "../components/Input";
import Weeklycalender from "../components/weeklycalender";
import "./Home.css";

function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekCounter, setWeekCounter] = useState(0);
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
            50 <span>This Week</span>
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
            08 <span>This Week</span>
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
        <ul className="dashboard__task-list">
          <li className="dashboard__task">
            <span className="dashboard__task-check" aria-hidden="true" />
            <span className="dashboard__task-name">Finishing Wireframe</span>
            <span className="dashboard__task-actions" aria-hidden="true">
              <span className="dashboard__trash-icon" />
              <span className="dashboard__edit-icon" />
            </span>
          </li>
          <li className="dashboard__task">
            <span className="dashboard__task-check" aria-hidden="true" />
            <span className="dashboard__task-name">Meeting with team</span>
            <span className="dashboard__task-actions" aria-hidden="true">
              <span className="dashboard__trash-icon" />
              <span className="dashboard__edit-icon" />
            </span>
          </li>
          <li className="dashboard__task dashboard__task--done">
            <span className="dashboard__task-check" aria-hidden="true">
              ✓
            </span>
            <span className="dashboard__task-name">Buy cat food</span>
            <span className="dashboard__task-actions" aria-hidden="true">
              <span className="dashboard__trash-icon" />
              <span className="dashboard__edit-icon" />
            </span>
          </li>
          <li className="dashboard__task dashboard__task--done">
            <span className="dashboard__task-check" aria-hidden="true">
              ✓
            </span>
            <span className="dashboard__task-name">
              Finishing daily commission
            </span>
            <span className="dashboard__task-actions" aria-hidden="true">
              <span className="dashboard__trash-icon" />
              <span className="dashboard__edit-icon" />
            </span>
          </li>
        </ul>
      </section>
      <button className="dashboard__add" type="button" aria-label="Add task">
        <span aria-hidden="true">+</span>
      </button>
    </main>
  );
}

export default Home;
