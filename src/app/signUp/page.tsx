"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Progress } from "@/components/ui/progress";
import axios from 'axios';

interface User {
  name: string;
  email: string;
  password: string;
  password2: string;
  phoneNumber: string;
  progress: number;
}

interface ErrorResponse {
  message: string[] | string;
}

const SignUp = () => {
  const router = useRouter();
  const [msg, setMsg] = useState<string | null>(null);
  const [newUser, setNewUser] = useState<User>({
    name: '',
    email: '',
    password: '',
    password2: '',
    phoneNumber: '',
    progress: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof User) => {
    setNewUser({
      ...newUser,
      [field]: e.target.value,
    });
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const trackProgress = () => {
    let progressValue = 0;

    if (validateEmail(newUser.email)) progressValue += 25;
    if (newUser.password.length >= 8 && newUser.password === newUser.password2) progressValue += 25;
    if (newUser.name.length > 2) progressValue += 25;
    if (newUser.phoneNumber.length === 8) progressValue += 25;

    setNewUser({
      ...newUser,
      progress: progressValue,
    });
  };

  useEffect(() => {
    trackProgress();
  }, [newUser.email, newUser.password, newUser.password2, newUser.name, newUser.phoneNumber]);

  const createAccount = async () => {
    const data = {
      username: newUser.name,
      email: newUser.email,
      password: newUser.password,
      password2: newUser.password2,
      phoneNumber: newUser.phoneNumber,
    };

    try {
      const response = await axios.post('http://localhost:3030/user/signup', data);
      console.log('User created successfully:', response.data);
      router.push('/login');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const errorResponse = error.response.data as ErrorResponse;
        setMsg(errorResponse.message instanceof Array ? errorResponse.message.join(', ') : errorResponse.message);
      } else {
        console.error('Unexpected error:', error);
        setMsg('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-200">
      <div
        className="relative w-96 h-140 bg-cover bg-center rounded-lg shadow-xl overflow-hidden"
        style={{
          backgroundImage:
            "url('https://pexels.imgix.net/photos/27718/pexels-photo-27718.jpg?fit=crop&w=1280&h=823')",
        }}
      >
<div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 opacity-90"></div>


        <div className="relative z-10 p-6 flex flex-col items-center">
          {/* Progress bar */}
          <Progress value={newUser.progress} color="bg-white" />
          <div className="text-4xl font-thin text-white mt-24 mb-4">Sign up</div>

          <div className="w-full mb-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 border-b-2 border-white bg-transparent text-white focus:outline-none focus:border-white"
              value={newUser.name}
              onChange={(e) => handleChange(e, 'name')}
            />
          </div>

          <div className="w-full mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border-b-2 border-white bg-transparent text-white focus:outline-none focus:border-white"
              value={newUser.email}
              onChange={(e) => handleChange(e, 'email')}
            />
          </div>

          <div className="w-full mb-4">
            <input
              type="text"
              placeholder="Phone number"
              className="w-full px-4 py-2 border-b-2 border-white bg-transparent text-white focus:outline-none focus:border-white"
              value={newUser.phoneNumber}
              onChange={(e) => handleChange(e, 'phoneNumber')}
            />
          </div>

          <div className="w-full mb-4">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border-b-2 border-white bg-transparent text-white focus:outline-none focus:border-white"
              value={newUser.password}
              onChange={(e) => handleChange(e, 'password')}
            />
          </div>

          <div className="w-full mb-4">
            <input
              type="password"
              placeholder="Repeat password"
              className="w-full px-4 py-2 border-b-2 border-white bg-transparent text-white focus:outline-none focus:border-white"
              value={newUser.password2}
              onChange={(e) => handleChange(e, 'password2')}
            />
          </div>

          {msg && <div className="text-red-500 text-sm">{msg}</div>}

          <div className="text-sm text-white mb-6">
            or <span className="font-bold cursor-pointer" onClick={() => router.push('/login')}>already have an account</span>
          </div>

          <button
            className={`w-full py-2 border-2 border-white text-white rounded-full transition duration-300 
              ${newUser.progress === 100 ? 'bg-black hover:bg-white hover:text-gray-800' : 'cursor-not-allowed'}`}
            disabled={newUser.progress !== 100} 
            onClick={createAccount}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
