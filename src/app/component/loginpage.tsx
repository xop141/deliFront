"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";  // Correct import for the App directory in Next.js 13

const loginpage = () => {
  const router = useRouter();

  const signUp = () => {
    router.push('/signUp');

  };
  return (
    <div className="h-screen flex items-center justify-center bg-gray-200">
      <div className="relative w-96 h-140 bg-cover bg-center rounded-lg shadow-xl overflow-hidden"
        style={{ backgroundImage: "url('https://pexels.imgix.net/photos/27718/pexels-photo-27718.jpg?fit=crop&w=1280&h=823')" }}>

        <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-purple-500 opacity-85"></div>

        <div className="relative z-10 p-6 flex flex-col items-center">
          <div className="text-4xl font-thin text-white mt-24 mb-4">Hello There!</div>
          <div className="text-white text-sm font-light text-center mb-6">
            Log in to enjoy your favorite dishes.
          </div>

          {/* <div className="w-full mb-4">
            <input type="text" placeholder="Username" className="w-full px-4 py-2 border-b-2 border-white bg-transparent text-white focus:outline-none focus:border-white" />
          </div> */}

          <div className="w-full mb-4">
            <input type="email" placeholder="Email" className="w-full px-4 py-2 border-b-2 border-white bg-transparent text-white focus:outline-none focus:border-white" />
          </div>

          <div className="w-full mb-4">
            <input type="password" placeholder="Password" className="w-full px-4 py-2 border-b-2 border-white bg-transparent text-white focus:outline-none focus:border-white" />
          </div>

          <div className="text-sm text-white mb-6">or <span className="font-bold cursor-pointer" onClick={signUp}>Sign up</span></div>

          <button className="w-full py-2 border-2 border-white text-white rounded-full hover:bg-white hover:text-gray-800 transition duration-300">
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default loginpage;
