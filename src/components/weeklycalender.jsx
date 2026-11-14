import React from "react";

function Weeklycalender({
  selectedDate,
  setSelectedDate,
  weekCount,
  setWeekCounter,
}) {
  function getWeekDates() {
    let today = new Date();
    let startSunday = new Date(today);
    startSunday.setDate(today.getDate() - 7 * weekCount - today.getDay());

    const days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(startSunday);
      date.setDate(startSunday.getDate() + index);
      return { date: date, day: days[index] };
    });
  }

  function handleprevWeek() {
    const newSelected = new Date(selectedDate);
    newSelected.setDate(selectedDate.getDate() - 7);
    setWeekCounter((prev) => prev + 1);
    setSelectedDate(newSelected);
  }

  function handleNextWeek() {
    const newSelected = new Date(selectedDate);
    newSelected.setDate(selectedDate.getDate() + 7);
    setWeekCounter((prev) => prev - 1);
    setSelectedDate(newSelected);
  }

  return (
    <div className="dashboard__week-row">
      <button
        className="dashboard__week-nav"
        type="button"
        aria-label="Previous week"
        onClick={handleprevWeek}
      >
        ‹
      </button>
      <div className="dashboard__week">
        {getWeekDates().map((ele) => {
          const isSelected =
            ele.date.toDateString() === selectedDate.toDateString();

          return (
            <div
              className={`dashboard__week-day${isSelected ? " dashboard__week-day--selected" : ""}`}
              onClick={() => setSelectedDate(ele.date)}
            >
              <p>{ele.day}</p>
              <p>{ele.date.getDate()}</p>
            </div>
          );
        })}
      </div>

      <button
        className="dashboard__week-nav"
        type="button"
        aria-label="Next week"
        onClick={handleNextWeek}
        disabled={weekCount === 0}
      >
        ›
      </button>
    </div>
  );
}

export default Weeklycalender;
