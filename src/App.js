import 'tailwindcss/tailwind.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import GifList from './components/GifList';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useAuth0 } from "@auth0/auth0-react";





function App() {
  const [gifs, setGifs] = useState([]);
  const { user, isAuthenticated, logout, loginWithRedirect, getAccessTokenSilently } = useAuth0();
  const domain = "dev-sb6ntunibpcdilyy.eu.auth0.com";

  const toastConfig = {
    position: toast.POSITION.TOP_CENTER,
    progressStyle: { background: 'blue' },
  };



  const fetchGifs = async () => {
    const response = await fetch('http://localhost:5000/gifs/getGifs');
    const data = await response.json();
    console.log(data)
    setGifs(data);
  };
  useEffect(() => {
    fetchGifs();
  }, []);





  const likedGifs = async () => {
    const email = user.email;

    try {
    const accessToken = await getAccessTokenSilently({
      authorizationParams: {
        audience: `https://${domain}/api/v2/`,
        scope: "read:current_user",
      },
    });

    const response = await fetch('http://localhost:5000/users/getLiked', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`, // Assuming the JWT is stored on the user object
      },
      body: JSON.stringify({
        email: email,
      })
      
    });
    const data = await response.json();
    console.log(data)
    setGifs(data.likedGIFS);
  } catch {
    console.log("SERVER ERROR")
  }}
  
  



  const UploadedGifs = async () => {
    const email = user.email;
    try {
    const accessToken = await getAccessTokenSilently({
      authorizationParams: {
        audience: `https://${domain}/api/v2/`,
        scope: "read:current_user",
      },
    });

    const response = await fetch('http://localhost:5000/users/getUploaded', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`, // Assuming the JWT is stored on the user object
      },
      body: JSON.stringify({
        email: email,
      })
    });
    const data = await response.json();
    console.log(data)
    setGifs(data);
  } catch {
    console.log("SERVER ERROR")
  }}

  

  return (
    <div className="bg-purple-200 text-black min-h-screen">
      <NavBar fetchGifs={fetchGifs} UploadedGifs={UploadedGifs} likedGifs={likedGifs}/>
       <GifList gifs={gifs} />
      <Footer/>
      <ToastContainer {...toastConfig} />
    </div>
  );
}

export default App;

