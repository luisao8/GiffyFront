import React from "react";
import 'tailwindcss/tailwind.css';
import Gif from './Gif';





  

function GifList({ gifs }) {
    return (
        <div className="gif-list flex flex-wrap justify-center">
        {gifs.map((gif) => (
          <Gif key={gif.url} gif={gif} />
        ))}
      </div>
    );
  }

export default GifList;