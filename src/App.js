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
  const [category, setCategory] = useState([]);
  const limit =120;

  const toastConfig = {
    position: toast.POSITION.TOP_CENTER,
    progressStyle: { background: 'blue' },
  };

  const fetchGifs = async () => {
    const response = await fetch('http://localhost:5000/gifs/getGifs');
    const data = await response.json();
    console.log(data);
    setGifs(data);
  };

  useEffect(() => {
    fetchGifs();
  }, []);

  const fetchCategories = async (category) => {
    setCategory(category);
  
    function transformApi(data) {
      return data.map(item => {
        let newUrl = `https://media.giphy.com/media/${item.id}/giphy.gif`;
    
        return {
          title: item.title,
          urlLink: newUrl,
          uploadedBy: item.username
        };
      });
    } 
  
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=dqLjAwvBVnjvUxGpqZWSkic6GlKXNFsw&q=${category}&limit=${limit}&offset=0&rating=g&lang=en`)
      .then(response => response.json())
      .then(data => {
        const transformedData = transformApi(data.data);
        console.log(transformedData) // Assuming data.data is the array
        setGifs(transformedData);
      })
      .catch(error => console.error(error));
  }

  const fetchBar = async (category) => {
    setCategory(category);
  
    function transformApi(data) {
      return data.map(item => {
        let newUrl = `https://media.giphy.com/media/${item.id}/giphy.gif`;
    
        return {
          title: item.title,
          urlLink: newUrl,
          uploadedBy: item.username
        };
      });
    } 
  
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=dqLjAwvBVnjvUxGpqZWSkic6GlKXNFsw&q=${category}&limit=${limit}&offset=0&rating=g&lang=en`)
      .then(response => response.json())
      .then(data => {
        const transformedData = transformApi(data.data);
        console.log(transformedData) // Assuming data.data is the array
        setGifs(transformedData);
      })
      .catch(error => console.error(error));
  }

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
      console.log(data);
      console.log(data.likedGIFS);
      
      setGifs(data.likedGIFS);
    } catch {
      console.log("SERVER ERROR");
    }
  }




  const uploadedGifs = async () => {
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
      console.log(data);
      setGifs(data);
    } catch {
      console.log("SERVER ERROR");
    }
  }

  return (
    <div className="bg-purple-200 text-black min-h-screen">
      <NavBar fetchGifs={fetchGifs} uploadedGifs={uploadedGifs} likedGifs={likedGifs} fetchCategories={fetchCategories} fetchBar={fetchBar}/>
      <GifList gifs={gifs} />
      <Footer />
      <ToastContainer {...toastConfig} />
    </div>
  );
}

export default App;
