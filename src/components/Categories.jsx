import React from "react";
import 'tailwindcss/tailwind.css';
import { useState } from "react";





  

function Categories({ fetchGifs }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);



    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
      };
  

  
    return (
        <div className="relative">
              <a
                href="#"
                title=""
                className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                onClick={toggleDropdown}
              >
                Categories
              </a>
              {isDropdownOpen && (
                <div className="absolute z-10 mt-2 py-2 bg-white border border-gray-200 rounded-md shadow-md">
                  <a
                    href="#"
                    title=""
                    className="block px-4 py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    Animals
                  </a>
                  <a
                    href="#"
                    title=""
                    className="block px-4 py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    Coding
                  </a>
                  <a
                    href="#"
                    title=""
                    className="block px-4 py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  >
                    Love
                  </a>
                </div>
              )}
        </div>
      );
    }

export default Categories;




            