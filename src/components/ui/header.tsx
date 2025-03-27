"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import logo from '../../app/img/logo.png'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { ShoppingCart } from 'lucide-react';


const Header = () => {
  const [token, setToken] = useState<string | null>(null); // State to store the token
  const router = useRouter();

  useEffect(() => {
    // Check if we're on the client-side, then access localStorage
    if (typeof window !== "undefined") {
      const storedToken = window.localStorage.getItem('token');
      setToken(storedToken); // Set the token to state
    }
  }, []); // Empty dependency array ensures it only runs on the client-side

  const login = () => {
    router.push('/login');
  };

  const signup = () => {
    router.push('/signUp');
  };

  const homepage = () => {
    router.push('/');
  };

  const orderBoard = () => {
    router.push('/orderBoard')
  };

  // const dashBoard = () => {
  //   router.push('/dashBoard')
  // };

  const logout = () => {
    // Remove token from localStorage and update state
    window.localStorage.removeItem('token');
    setToken(null);
    router.push('/');  // Redirect to homepage after logout
    window.location.reload();
  }

  return (
    <div className='bg-[#18181B] w-full px-[88px] py-[18px] flex justify-between items-center'>
      <div className='flex gap-[12px]' onClick={homepage}>
        <Image src={logo} alt='logo' width={46} />
        <div className='font-[600] text-[20px] text-white'>
          <h1 className='flex'>Nom
            <p className='text-red-500'>Nom</p></h1>
          <h1 className='text-[12px] font-[400]'>swift Delivery</h1>
        </div>
      </div>

      <div className='flex gap-[15px]'>
        {/* Conditionally render based on token */}
        {!token ? (
          <>
            <Button variant="secondary" onClick={login}>Login</Button>
            <Button variant="destructive" onClick={signup}>Sign up</Button>
          </>
        ) : (
          <div className='flex gap-[12px]'>

            <Button className='text-white flex gap-[15px] rounded-full p-[20px] bg-gray-700 hover:bg-red-700' onClick={orderBoard}>
              <ShoppingCart />
            </Button>

            {/* <Button className='text-white flex gap-[15px] rounded-full p-[20px] bg-gray-700 hover:bg-red-700' onClick={dashBoard}>
              <CircleUserRound />
            </Button> */}

            {/* Add a logout button when user is logged in */}
            <Button className='text-white flex gap-[15px] rounded-full p-[20px] bg-gray-700 hover:bg-red-700' onClick={logout}>
              Logout
            </Button>

          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
