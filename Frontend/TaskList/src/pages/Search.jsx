import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import Input from "../components/Input";
import api from "../axiosInstance";
import "./Home.css";
import "./Search.css";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = (searchParams.get("q") || "").trim();

  return (
    <SearchResults
      key={query}
      query={query}
      setSearchParams={setSearchParams}
    />
  );
}

function SearchResults({ query, setSearchParams }) {
  const [searchValue, setSearchValue] = useState(query);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(Boolean(query));
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    if (!query) {
      return () => {
        active = false;
      };
    }

    async function fetchTasks() {
      try {
        const response = await api.get("/searchTask", {
          params: { q: query },
        });

        if (!response.data.status) {
          throw new Error(response.data.message || "Search failed");
        }

        if (active) {
          setTasks(response.data.data.tasks);
        }
      } catch (requestError) {
        console.error("Error searching tasks:", requestError);
        if (active) {
          setError("Unable to search tasks. Please try again.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    fetchTasks();

    return () => {
      active = false;
    };
  }, [query]);

  function handleSearchSubmit(event) {
    event.preventDefault();
    const searchTerm = searchValue.trim();
    setSearchParams(searchTerm ? { q: searchTerm } : {});
  }

  function formatTaskDate(date) {
    const parsedDate = new Date(date);
    return Number.isNaN(parsedDate.getTime())
      ? ""
      : parsedDate.toLocaleDateString();
  }

  return (
    <main className="dashboard search-page">
      <form className="dashboard__search" onSubmit={handleSearchSubmit}>
        <Input
          classprop="dashboard__search-input"
          onChange={(event) => setSearchValue(event.target.value)}
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

      <section className="search-page__content" aria-labelledby="search-title">
        <div className="dashboard__section-heading">
          <h1 id="search-title">Search results</h1>
          <Link className="dashboard__view-all" to="/home">
            Back to tasks
          </Link>
        </div>

        {query && (
          <p className="search-page__summary">
            Results for <strong>{query}</strong>
          </p>
        )}

        {loading && <p role="status">Searching tasks...</p>}
        {error && <p role="alert">{error}</p>}
        {!query && !loading && (
          <p>Enter a keyword to search all tasks.</p>
        )}
        {query && !loading && !error && tasks.length === 0 && (
          <p>No tasks match your search.</p>
        )}

        {!loading && !error && tasks.length > 0 && (
          <ul className="search-page__results">
            {tasks.map((task) => (
              <li className="search-page__result" key={task._id}>
                <div className="search-page__result-heading">
                  <h2>{task.title}</h2>
                  <span>{formatTaskDate(task.taskDate)}</span>
                </div>
                {task.description && <p>{task.description}</p>}
                <span
                  className={`search-page__status ${
                    task.isComplete ? "search-page__status--complete" : ""
                  }`}
                >
                  {task.isComplete ? "Complete" : "Pending"}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default Search;
