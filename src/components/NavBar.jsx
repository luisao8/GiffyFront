import React from "react";
import 'tailwindcss/tailwind.css';
import logo from "../multimedia/Logo2.png";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";



  

function NavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, isAuthenticated, logout, loginWithRedirect, getAccessTokenSilently } = useAuth0();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [userMetadata, setUserMetadata] = useState([]);

  const isLoggedOut = async () => {

    // If the user is authenticated
    if (isAuthenticated) {
      const domain = "dev-sb6ntunibpcdilyy.eu.auth0.com";
      
      
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        },
      });
        
  
      
      console.log(accessToken)
      const userName = user.name;
      const userEmail = user.email;
      // Call your backend API to logout
      const response = await fetch('http://localhost:5000/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`, // Assuming the JWT is stored on the user object
        },
        body: JSON.stringify({
          user: userName,
          email: userEmail
        })
      });
  
      // Check if the logout was successful
      if (response.ok) {
        console.log('Logged out from backend successfully');
      } else {
        console.log('Failed to logout from backend');
      }
  
      // Call the Auth0 logout function
      logout({
        returnTo: window.location.origin, // After logging out, user will be redirected to the homepage of your application
      });
    } else {
      // If the user is not authenticated, redirect them to the login page
      loginWithRedirect();
    }
  };


  const [showModal, setShowModal] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  
  return (
    <header className="pb-6 bg-white lg:pb-0">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* lg+ */}
        <nav className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex-shrink-0">
            <a href="#" title="" className="flex">
              <img className="w-25 h-14" src={logo} alt="logo" />
            </a>
          </div>
          <div className="flex-grow mx-10">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 text-base font-medium text-black transition-all duration-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
       </div>

          <button
            type="button"
            className="inline-flex p-2 text-black transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
          >
            {/* Menu open: "hidden", Menu closed: "block" */}
            <svg
              className="block w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
            </svg>

            {/* Menu open: "block", Menu closed: "hidden" */}
            <svg
              className="hidden w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="hidden lg:flex lg:items-center lg:ml-auto lg:space-x-10">
            <a href="#" title="" className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"> About Us </a>

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

           
          </div>

          {isAuthenticated ? (
              <>
                <a href="#" title="" onClick={(e) => {
                                                      e.preventDefault();
                                                      setShowModal(true);
                                                    }}  className="items-center justify-center hidden px-4 py-3 ml-4 text-base font-semibold text-white transition-all duration-200 bg-green-600 border border-transparent rounded-md lg:inline-flex hover:bg-green-700 focus:bg-green-700" role="button"> Upload GIF </a>
                <div className="relative">
                    <button onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} className="items-center justify-center hidden px-4 py-3 ml-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md lg:inline-flex hover:bg-blue-700 focus:bg-blue-700" role="button">
                        {user.name}
                    </button>
                    {isUserDropdownOpen && (
                        <div className="absolute z-10 mt-2 py-2 bg-white border border-gray-200 rounded-md shadow-md">
                            <p className="block px-4 py-2 text-base font-medium text-black">
                                {user.email}
                            </p>
                            <button onClick={isLoggedOut} className="block w-full px-4 py-2 text-base font-medium text-black transition-all duration-200 hover:bg-red-700 focus:bg-red-700">
                                Log Out
                            </button>
                        </div>
                    )}
                </div>
            </>
        ) : (
             <a href="#" title="" onClick={() => loginWithRedirect()} className="items-center justify-center hidden px-4 py-3 ml-10 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md lg:inline-flex hover:bg-blue-700 focus:bg-blue-700" role="button"> Log in / Register </a>
            )}
            {showModal && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="bg-white rounded-lg w-1/2">
                          <div className="p-4">
                            <h2 className="text-lg mb-10">Upload GIF</h2>
                            <button className="float-right" onClick={() => setShowModal(false)}>Close</button>
                            <form>
                              <label>
                                GIF Name:
                                <input type="text" name="Name" />
                              </label>
                              <label>
                                Description:
                                <input type="text" name="Description" />
                              </label>
                              <p>          </p>
                              <label for="category">Select a category:</label>
                              <select id="category" name="category">
                                <option value="category1">Animals</option>
                                <option value="category2">Coding</option>
                                <option value="category3">Love</option>
                              </select>
                              
                              
                              <label className="ml-5">
                                Upload:   
                                <input className="ml-2" type="file" name="file" />
                              </label>
                              <input type="submit" className="px-4 py-2 mt-10 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"  value="Submit" />
                            </form>
                          </div>
                        </div>
                      </div>
                    )}
        </nav>
      </div>
    </header>
  );
}

export default NavBar;
