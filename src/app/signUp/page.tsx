"use client"

import { useState, useEffect } from 'react';
import React from 'react'
import { useRouter } from 'next/navigation';
import { Progress } from "@/components/ui/progress"

const SignUp = () => {
    const router = useRouter();
    const [msg, setMsg] = useState<string | null>(null);

    const signUp = () => {
        router.push('/login');
    };

    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
        progress: 0,
        phoneNumber: "0"
    });

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser(prevState => ({
            ...prevState,
            email: e.target.value
        }));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser(prevState => ({
            ...prevState,
            password: e.target.value
        }));
    };

    const handlePassword2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser(prevState => ({
            ...prevState,
            password2: e.target.value
        }));
    };

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser(prevState => ({
            ...prevState,
            name: e.target.value
        }));
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUser(prevState => ({
            ...prevState,
            phoneNumber: e.target.value
        }));
    };


    const validateEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };


    const trackProgress = () => {
        let progressValue = 0;

        if (validateEmail(newUser.email)) {
            progressValue += 25;
        }

        if (newUser.password.length >= 8 && newUser.password === newUser.password2) {
            progressValue += 25;
        }

        if (newUser.name.length > 2) {
            progressValue += 25;
        }

        // Check if phone number is filled
        if (newUser.phoneNumber.length === 8) {
            progressValue += 25;
        }

        // Set progress value
        setNewUser(prevState => ({
            ...prevState,
            progress: progressValue // Update progress field with the new value
        }));
    };

    // Update progress when email, password, password2, username, or number changes
    useEffect(() => {
        trackProgress();
    }, [newUser.email, newUser.password, newUser.password2, newUser.name, newUser.phoneNumber]);

    // Send data to backend and jump back to homepage
    const createAccount = async () => {
        const data = {
            username: newUser.name,
            email: newUser.email,
            password: newUser.password,
            password2: newUser.password2,
            progress: newUser.progress,
            phoneNumber: newUser.phoneNumber,
        };

        try {
            const response = await fetch('http://localhost:3030/user/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Account created successfully:', result);
                // You could navigate to another page, or display a success message here
            } else {
                const errorData = await response.json();
             
                console.log(errorData.message);
                
               alert(errorData.message)
                setMsg(errorData.message);  // Set the formatted error message
                return;
            }
        } catch (error) {
            console.error('Error during fetch:', error);
        } finally {
            console.log("done");
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
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-purple-500 opacity-85"></div>

                <div className="relative z-10 p-6 flex flex-col items-center">
                    {/* Progress bar */}
                    <Progress value={newUser.progress} color="bg-white" />
                    <div className="text-4xl font-thin text-white mt-24 mb-4">Sign up</div>

                    <div className="w-full mb-4">
                        <input
                            type="text"
                            placeholder="Username"
                            className={`w-full px-4 py-2 border-b-2 border-white bg-transparent text-white focus:outline-none focus:border-white`}
                            value={newUser.name}
                            onChange={handleUsernameChange}
                        />
                    </div>

                    <div className="w-full mb-4">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full px-4 py-2 border-b-2 border-white bg-transparent text-white focus:outline-none focus:border-white"
                            value={newUser.email}
                            onChange={handleEmailChange}
                        />
                    </div>

                    <div className="w-full mb-4">
                        <input
                            type="text"
                            placeholder="Phone number"
                            className="w-full px-4 py-2 border-b-2 border-white bg-transparent text-white focus:outline-none focus:border-white"
                            value={newUser.phoneNumber}
                            onChange={handlePhoneChange}
                        />
                    </div>

                    <div className="w-full mb-4">
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 border-b-2 border-white bg-transparent text-white focus:outline-none focus:border-white"
                            value={newUser.password}
                            onChange={handlePasswordChange}
                        />
                    </div>

                    <div className="w-full mb-4">
                        <input
                            type="password"
                            placeholder="Repeat password"
                            className="w-full px-4 py-2 border-b-2 border-white bg-transparent text-white focus:outline-none focus:border-white"
                            value={newUser.password2}
                            onChange={handlePassword2Change}
                        />
                    </div>


                    <div className="text-sm text-white mb-6">
                        or <span className="font-bold cursor-pointer" onClick={signUp}>already have an account</span>
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
