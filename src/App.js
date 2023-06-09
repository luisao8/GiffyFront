
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
  const [category, setCategory] = useState([]);
  const limit =120;
  

  const toastConfig = {
    position: toast.POSITION.TOP_CENTER,
    progressStyle: { background: 'blue' },
  };

  const fetchGifs = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/gifs/getGifs`);
    const data = await response.json();
    console.log(process.env.REACT_APP_BASE_URL)
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
  
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHI_API}&q=${category}&limit=${limit}&offset=0&rating=g&lang=en`)
      .then(response => response.json())
      .then(data => {
        const transformedData = transformApi(data.data);
        console.log(transformedData) 
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
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_GIPHI_API}&q=${category}&limit=${limit}&offset=0&rating=g&lang=en`)
      .then(response => response.json())
      .then(data => {
        const transformedData = transformApi(data.data);
        console.log(transformedData) 
        setGifs(transformedData);
      })
      .catch(error => console.error(error));
  }

  const likedGifs = async () => {
    const email = user.email;

    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: `https://${process.env.REACT_APP_DOMAIN}/api/v2/`,
          scope: "read:current_user",
        },
      });

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/getLiked`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`, 
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
    const userName = user.name;
    
    
    try {
      const accessToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: `https://${process.env.REACT_APP_DOMAIN}/api/v2/`,
          scope: "read:current_user",
        },
      });

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/getUploaded`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`, 
        },
        body: JSON.stringify({
          name: userName,
        })
      });

      const data = await response.json();
      console.log(data);
      setGifs(data);
    } catch (error) {
      console.log("SERVER ERROR", error);
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
