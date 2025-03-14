"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation"; 
import { EyeOff } from 'lucide-react';
import { Eye } from 'lucide-react';
import Image from "next/image";

const loginpage = () => {
  const router = useRouter();

  const signUp = () => {
    router.push('/signUp');
  };

  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [background, setBackground] = useState(false);
const [isShow, setIsshow] = useState(true)
  const handleEmailChange = (e:any) => {
    setEmail(e.target.value);  
  };
  const handlePasswordChange = (e:any) => {
    setPassword(e.target.value);  
  };


  const track = () => {
    if (email.length && password.length) {
        setBackground(true);
    } else {
        setBackground(false);
    }
  };

 
  React.useEffect(() => {
    track();
  }, [email, password]);


  const showimg = ()=>{
    if (isShow === true) {
      setIsshow(false)
    } else{
      setIsshow(true)
    }

  }
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

          {/* Email input */}
          <div className="w-full mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border-b-2 border-white bg-transparent text-white focus:outline-none focus:border-white"
              value={email} // bind value to the email state
              onChange={handleEmailChange} // update state on change
            />
  

          </div>

          {/* Password input */}
          <div className="w-full mb-4 flex items-center border-b-2 border-white ">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2  bg-transparent text-white focus:outline-none focus:border-white"
              value={password} // bind value to the password state
              onChange={handlePasswordChange} // update state on change
            />
            <div className="px-4 py-2 bg-transparent" onClick={showimg}>
              

            {isShow ? <Eye className="text-white"/> : <EyeOff className="text-white"/>}
            </div>
          </div>

          {/* Sign Up link */}
          <div className="text-sm text-white mb-6">
            or <span className="font-bold cursor-pointer" onClick={signUp}>Sign up</span>
          </div>

          {/* Create Account button */}
          <button
            className={`w-full py-2 border-2 border-white text-white rounded-full hover:bg-white hover:text-gray-800 transition duration-300 ${background ? 'bg-black' : ''}`}
            onClick={() => console.log("Account Created")} // Just a placeholder for actual account creation logic
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default loginpage;
