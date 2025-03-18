"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { EyeOff, Eye } from "lucide-react";

const LoginPage = () => {
  const router = useRouter();

  const signUp = () => {
    router.push('/signUp');
  };

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const [background, setBackground] = useState(false);
  const [isShow, setIsshow] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string[]>([]); // State to store error messages

  const handleEmailChange = (e: any) => {
    setUser(prevState => ({
      ...prevState,
      email: e.target.value
    }));
  };

  const handlePasswordChange = (e: any) => {
    setUser(prevState => ({
      ...prevState,
      password: e.target.value
    }));
  };

  const track = () => {
    if (user.email.length && user.password.length) {
      setBackground(true);
    } else {
      setBackground(false);
    }
  };

  useEffect(() => {
    track();
  }, [user.email, user.password]);

  const showimg = () => {
    setIsshow(prevState => !prevState);
  };

  const login = async () => {
    const data = {
      email: user.email,
      password: user.password,
    };

    console.log('Data being sent to backend:', data);

    try {
      const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST', // Use POST for login
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Send the user credentials
      });

      const result = await response.json(); // Parse the response body

      if (!response.ok) {
        // If the response isn't OK, display the message from the backend
        setErrorMessages([result.message || 'An error occurred.']);
        return;
      }

      console.log(result); // Log the result (e.g., token, user data, etc.)

      // Clear error messages if login is successful
      setErrorMessages([]);

      // Handle successful login (you can redirect or save tokens here)
      router.push('/dashboard'); // Redirect user after login
    } catch (error) {
      console.error('Error during fetch:', error);
      setErrorMessages(['An error occurred during login. Please try again.']); // Handle network errors
    }
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

          {/* Email input */}
          <div className="w-full mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border-b-2 border-white bg-transparent text-white focus:outline-none focus:border-white"
              value={user.email}
              onChange={handleEmailChange}
            />
          </div>

          {/* Password input */}
          <div className="w-full mb-4 flex items-center border-b-2 border-white">
            <input
              type={isShow ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 bg-transparent text-white focus:outline-none focus:border-white"
              value={user.password}
              onChange={handlePasswordChange}
            />
            <div className="px-4 py-2 bg-transparent cursor-pointer" onClick={showimg}>
              {isShow ? <Eye className="text-white" /> : <EyeOff className="text-white" />}
            </div>
          </div>

          {/* Sign Up link */}
          <div className="text-sm text-white mb-6">
            or <span className="font-bold cursor-pointer" onClick={signUp}>Sign up</span>
          </div>

          {/* Login button */}
          <button
            className={`w-full py-2 border-2 border-white text-white rounded-full hover:bg-white hover:text-gray-800 transition duration-300 ${background ? 'bg-black' : ''}`}
            onClick={login}  // onClick triggers login function
          >
            Log in
          </button>

          {/* Error messages */}
          {errorMessages.length > 0 && (
            <div className="mt-4 text-red-500">
              {errorMessages.map((msg, index) => (
                <p key={index}>{msg}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
