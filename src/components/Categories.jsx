import React from "react";
import 'tailwindcss/tailwind.css';
import { useState } from "react";

function Categories({ fetchCategories }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleCategoryClick = (category) => (e) => {
        e.preventDefault();
        fetchCategories(category);
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
                        onClick={handleCategoryClick('Animals')}
                    >
                        Animals
                    </a>
                    <a
                        href="#"
                        title=""
                        className="block px-4 py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                        onClick={handleCategoryClick('Actions')}
                    >
                        Actions
                    </a>
                    <a
                        href="#"
                        title=""
                        className="block px-4 py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                        onClick={handleCategoryClick('Anime')}
                        >
                        Anime
                        </a>
                        <a
                        href="#"
                        title=""
                        className="block px-4 py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                        onClick={handleCategoryClick('Cartoons')}
                        >
                        Cartoons
                        </a>
                        <a
                        href="#"
                        title=""
                        className="block px-4 py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                        onClick={handleCategoryClick('Emotions')}
                        >
                        Emotions
                        </a>
                        <a
                        href="#"
                        title=""
                        className="block px-4 py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                        onClick={handleCategoryClick('Food/Drink')}
                        >
                        Food/Drink
                        </a>
                        <a
                        href="#"
                        title=""
                        className="block px-4 py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                        onClick={handleCategoryClick('Gaming')}
                        >
                        Gaming
                        </a>
                        <a
                        href="#"
                        title=""
                        className="block px-4 py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                        onClick={handleCategoryClick('Holidays/Greetings')}
                        >
                        Holidays/Greetings
                        </a>
                        <a
                        href="#"
                        title=""
                        className="block px-4 py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                        onClick={handleCategoryClick('Memes')}
                        >
                        Memes
                        </a>
                        <a
                        href="#"
                        title=""
                        className="block px-4 py-2 text-base font-medium text-black transition-all duration-200 hover:text-blue-600 focus:text-blue-600"
                        onClick={handleCategoryClick('Clips')}
                        >
                        Clips
                        </a>

                </div>
            )}
        </div>
    );
}

export default Categories;

// 1
// : 
// analytics
// : 
// {onload: {…}, onclick: {…}, onsent: {…}}
// analytics_response_payload
// : 
// "e=Z2lmX2lkPTJJdWRVSGRJMDc1SEwwMlBrayZldmVudF90eXBlPUdJRl9TRUFSQ0gmY2lkPTM4YzI0YzI0NnBndHZtc2E0Znk0NnJwNDQ2bnVkNzB0MWR1azgzMGVkcHdhZWN5OSZjdD1n"
// bitly_gif_url
// : 
// "https://gph.is/g/ZlPq0MM"
// bitly_url
// : 
// "https://gph.is/g/ZlPq0MM"
// content_url
// : 
// ""
// embed_url
// : 
// "https://giphy.com/embed/2IudUHdI075HL02Pkk"
// id
// : 
// "2IudUHdI075HL02Pkk"
// images
// : 
// {original: {…}, downsized: {…}, downsized_large: {…}, downsized_medium: {…}, downsized_small: {…}, …}
// import_datetime
// : 
// "2023-01-25 23:15:22"
// is_sticker
// : 
// 0
// rating
// : 
// "g"
// slug
// : 
// "pudgypenguins-data-code-coding-2IudUHdI075HL02Pkk"
// source
// : 
// ""
// source_post_url
// : 
// ""
// source_tld
// : 
// ""
// title
// : 
// "Data Coding GIF by Pudgy Penguins"
// trending_datetime
// : 
// "0000-00-00 00:00:00"
// type
// : 
// "gif"
// url
// : 

// "https://giphy.com/gifs/pudgypenguins-data-code-coding-2IudUHdI075HL02Pkk"
// user
// : 
// {avatar_url: 'https://media4.giphy.com/avatars/pudgypenguins/R2B3rW5AF4rb.jpg', banner_image: 'https://media4.giphy.com/channel_assets/pudgypenguins/6l4hlTSrpMxk.png', banner_url: 'https://media4.giphy.com/channel_assets/pudgypenguins/6l4hlTSrpMxk.png', profile_url: 'https://giphy.com/pudgypenguins/', username: 'pudgypenguins', …}
// username
// : 
// "pudgypenguins"