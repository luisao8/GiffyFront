import React from "react";
import 'tailwindcss/tailwind.css';

function SearchBar({ fetchBar }) {
    const handleSearchSubmit = (e) => {
      e.preventDefault();
      fetchBar(e.target.elements.search.value);
    };
  
    return (
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          name="search"
          placeholder="Search..."
          className="w-full px-4 py-2 text-base font-medium text-black transition-all duration-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        
      </form>
    );
  }
  
  export default SearchBar;
  