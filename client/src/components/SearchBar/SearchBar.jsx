import React from "react";
import "./SearchBar.css";

const SearchBar = ({ filter, setFilter }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search properties..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
