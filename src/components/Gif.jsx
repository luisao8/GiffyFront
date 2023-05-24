import React from "react";
import 'tailwindcss/tailwind.css';
import { AiFillHeart } from 'react-icons/ai';
import { RiShareForwardFill } from 'react-icons/ri';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth0 } from "@auth0/auth0-react";






  

function Gif({ gif }) {

    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    const shareGif = () => {
        navigator.clipboard.writeText(gif.urlLink).then(() => {
          toast("Successfully copied Gif link to Clipboard!")
        }, (error) => {
          toast("Could not copy gif link!", error)
          
        });
    }; 

    const likeGif = async () => {
        if (isAuthenticated) {
            const domain = "dev-sb6ntunibpcdilyy.eu.auth0.com";
            const gifID = gif._id;
            const userID = gif.user;
            const userName = user.name;
            const userEmail = user.email;
            console.log(gifID)
            console.log(userID)
            
            
            const accessToken = await getAccessTokenSilently({
              authorizationParams: {
                audience: `https://${domain}/api/v2/`,
                scope: "read:current_user",
              },
            });
            
            
            // Call your backend API to logout
            const response = await fetch('http://localhost:5000/users/like', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`, // Assuming the JWT is stored on the user object
              },
              body: JSON.stringify({
                gifID: gifID,
                userID: userID,
                name: userName,
                email: userEmail,

              })
            });
        
            // Check if the logout was successful
            if (response.ok) {
              console.log('GIF succesfully liked.');
            } else {
              console.log('Failed to like GIF.');
            }
        };

    };
    
    
  
    return (
        <div className="flex flex-wrap justify-around items-stretch p-4">
          <div className="max-w-sm rounded overflow-hidden shadow-lg m-2 bg-white">
            <img className="w-full" src={gif.urlLink} alt={gif.title} />
            <div className="px-6 py-4 flex justify-between items-center">
              <div>
                <div className="font-bold text-xl mb-2">{gif.uploadedBy}</div>
                <p className="text-gray-700 text-base">
                  {gif.description}
                </p>
              </div>
              <div>
                <button className="mr-2 px-4 p-2 rounded bg-blue-500 text-white hover:bg-blue-700" onClick={likeGif}><AiFillHeart size={24}/></button>
                <button className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-700" onClick={shareGif}><RiShareForwardFill size={24}/></button>
              </div>
            </div>
          </div>
        </div>
      );}

export default Gif;
