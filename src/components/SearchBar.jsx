import React from "react";
import 'tailwindcss/tailwind.css';

function SearchBar(fetchGifs) {
    return ( 
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 text-base font-medium text-black transition-all duration-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />  );
    }

export default SearchBar;