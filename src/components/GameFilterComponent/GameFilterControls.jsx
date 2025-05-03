import { useState } from "react";

export default function GameFilterControls({ onSearch, onReset }) {
  const [query, setQuery] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    onSearch(query);
    localStorage.setItem("lastSearch", query);
  }

  function handleRecentSearch() {
    const lastSearch = localStorage.getItem("lastSearch");
    if (lastSearch) {
      setQuery(lastSearch);
      onSearch(lastSearch);
    }
  }

  return (
    <div className="filter-controls">
      <form className="search-text-area" onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search games..."
        />
        <button type="submit">Search</button>
      </form>
      <button onClick={handleRecentSearch}>Recent</button>
      <button onClick={onReset}>Reset</button>
    </div>
  );
}
