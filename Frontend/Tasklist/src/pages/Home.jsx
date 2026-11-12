import React, { useState } from "react";
import Input from "../components/Input";

function Home() {
  const [searchValue, setSearchValue] = useState("");

  function searchInput() {}
  return (
    <div>
      <div>
        <Input
          classprop={"searchInput"}
          onChange={searchInput}
          placeholder="Search for a task"
          currValue={searchInput}
        />
      </div>
    </div>
  );
}

export default Home;
