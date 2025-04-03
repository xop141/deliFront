"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import logo from '../../app/img/logo.png'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { ShoppingCart } from 'lucide-react'
import Cart from '@/app/component/cart'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import Orders from '@/app/component/orders'

const Header = () => {
  const [token, setToken] = useState<string | null>(null); // State to store the token
  const router = useRouter();
const [cart, setCart ] = useState([])
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = window.localStorage.getItem('token');
      setToken(storedToken);
    }
  
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCart(storedCart);
    
  }, []);

  const login = () => router.push('/login');
  const signup = () => router.push('/signUp');
  const homepage = () => router.push('/');

  const logout = () => {
    window.localStorage.removeItem('token');
    setToken(null);
    router.push('/');
  }

  const [activeTab, setActiveTab] = useState<'cart' | 'order'>('order'); // state for tab toggle

  const handleTabClick = (tab: 'cart' | 'order') => {
    setActiveTab(tab);
  }

  return (
    <div className="bg-[#18181B] w-full px-[88px] py-[18px] flex justify-between items-center">
      <div className="flex gap-[12px]" onClick={homepage}>
        <Image src={logo} alt="logo" width={46} />
        <div className="font-[600] text-[20px] text-white">
          <h1 className="flex">
            Nom <p className="text-red-500">Nom</p>
          </h1>
          <h1 className="text-[12px] font-[400]">swift Delivery</h1>
        </div>
      </div>

      <div className="flex gap-[15px]">
        {!token ? (
          <div className="gap-[20px] flex">
            <Button variant="secondary" onClick={login}>Login</Button>
            <Button variant="destructive" onClick={signup}>Sign up</Button>
          </div>
        ) : (
          <div className="flex gap-[12px]">
      
            <Dialog>
              <DialogTrigger>
                <Button className="text-white flex gap-[15px] rounded-full p-[20px] bg-gray-700 hover:bg-red-700 relative">
                  <ShoppingCart />
                  <div className="absolute top-[-7px] right-[-7px] font-[700] text-[20px]">{cart.length}</div>
                </Button>
              </DialogTrigger>

              <DialogContent className='overflow-hidden' >
                <div className="flex gap-[30px] mb-4">
                
                  <DialogTitle
                    onClick={() => handleTabClick('cart')}
                    className={`cursor-pointer rounded-[10px] p-[10px] ${activeTab === 'cart' ? "bg-red-500" : ""}`}
                  >
                    Cart
                  </DialogTitle>
                  <DialogTitle
                    onClick={() => handleTabClick('order')}
                    className={`cursor-pointer rounded-[10px] p-[10px] ${activeTab === 'order' ? "bg-red-500" : ""}`}
                  >
                    Order
                  </DialogTitle>
                </div>

              <div>
                <div className={`${activeTab === 'cart' ? "flex" : "hidden"} `}>
                  <Cart />
                </div>

                <div className={`${activeTab === 'order' ? "flex" : "hidden"}`}>
                  <Orders />
                </div>
                </div>
              </DialogContent>
            </Dialog>

            <div className="flex gap-[15px]">
              <Button className="text-white flex gap-[15px] rounded-full p-[20px] bg-gray-700 hover:bg-red-700" onClick={logout}>
                Logout
              </Button>
            
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
