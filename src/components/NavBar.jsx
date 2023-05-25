import React from "react";
import 'tailwindcss/tailwind.css';
import logo from "../multimedia/Logo2.png";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
// import { useEffect } from "react";
import SearchBar from "./SearchBar";
import Categories from "./Categories";

function NavBar({ likedGifs, uploadedGifs, fetchCategories, fetchBar }) {

  const { user, isAuthenticated, logout, loginWithRedirect, getAccessTokenSilently } = useAuth0();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    console.log("hola")
    if (isAuthenticated) {
      console.log("hola")
      const urlLink = event.target.elements.urlLink.value;
      const description = event.target.elements.description.value;
      const userEmail = user.email;
      const userName = user.name;
      const domain = process.env.REACT_APP_DOMAIN;

      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        },
      });

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          urlLink: urlLink,
          user: userName,
          email: userEmail,
          description: description,
          flag: true,
        }),
      });

      if (response.ok) {
        console.log('Gif uploaded successfully');
        // Clear the input field
        event.target.elements.urlLink.value = '';
        event.target.elements.description.value = '';
      } else {
        console.log('Failed to upload gif');
      }
    }
  };

  // const isLoggedOut = async () => {
  //   // If the user is authenticated
  //   if (isAuthenticated) {
  //     const domain = "dev-sb6ntunibpcdilyy.eu.auth0.com";
  //     const accessToken = await getAccessTokenSilently({
  //       authorizationParams: {
  //         audience: `https://${domain}/api/v2/`,
  //         scope: "read:current_user",
  //       },
  //     });

  //     console.log(accessToken)
  //     const userName = user.name;
  //     const userEmail = user.email;
  //     // Call your backend API to logout
  //     const response = await fetch('http://localhost:5000/users/logout', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${accessToken}`, // Assuming the JWT is stored on the user object
  //       },
  //       body: JSON.stringify({
  //         user: userName,
  //         email: userEmail
  //       })
  //     });

  //     // Check if the logout was successful
  //     if (response.ok) {
  //       console.log('Logged out from backend successfully');
  //     } else {
  //       console.log('Failed to logout from backend');
  //     }

  //     // Call the Auth0 logout function
  //     logout({
  //       returnTo: window.location.origin, // After logging out, user will be redirected to the homepage of your application
  //     });
  //   } else {
  //     // If the user is not authenticated, redirect them to the login page
  //     loginWithRedirect();
  //   }
  // };

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
            <SearchBar fetchBar={fetchBar} />
          </div>

          <div className="relative">
            <a
              href="#"
              title=""
              className="text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
              onClick={toggleDropdown}
            >
              Your GIF's
            </a>
            {isDropdownOpen && (
              <div className="absolute z-10 mt-2 py-2 bg-white border border-gray-200 rounded-md shadow-md">
                <a
                  href="#"
                  title=""
                  className="block px-4 py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  onClick={(e) => { e.preventDefault(); uploadedGifs(); }}
                >
                  Uploaded
                </a>
                <a
                  href="#"
                  title=""
                  className="block px-4 py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                  onClick={(e) => { e.preventDefault(); likedGifs(); }}>
                  Liked
                </a>

              </div>
            )}
          </div>

          <div className="ml-3">
            <Categories fetchCategories={fetchCategories} />
          </div>

          {isAuthenticated ? (
            <>
              <a href="#" title="" onClick={(e) => {
                e.preventDefault();
                setShowModal(true);
              }} className="items-center justify-center hidden px-4 py-3 ml-4 text-base font-semibold text-white transition-all duration-200 bg-green-600 border border-transparent rounded-md lg:inline-flex hover:bg-green-700 focus:bg-green-700" role="button"> Upload GIF </a>
              <div className="relative">
                <button onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)} className="items-center justify-center hidden px-4 py-3 ml-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md lg:inline-flex hover:bg-blue-700 focus:bg-blue-700" role="button">
                  {user.name}
                </button>
                {isUserDropdownOpen && (
                  <div className="absolute z-10 mt-2 py-2 bg-white border border-gray-200 rounded-md shadow-md">
                    <p className="block px-4 py-2 text-base font-medium text-black">
                      {user.email}
                    </p>
                    <button onClick={logout} className="block w-full px-4 py-2 text-base font-medium text-black transition-all duration-200 hover:bg-red-700 focus:bg-red-700">
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
                  <form onSubmit={handleUpload}>
                    <label className="ml-5">
                      GIF URL:
                      <input className="ml-2" type="text" name="urlLink" required />
                    </label>
                    <label className="ml-5">
                      Description:
                      <input className="ml-2" type="text" name="description" required />
                    </label>
                    <button type="submit" className="px-4 py-2 mt-10 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
                      Submit
                    </button>
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
