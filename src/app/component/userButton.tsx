import React from 'react'
import { useState } from 'react'
import { Dialog,DialogTrigger,DialogContent,DialogTitle} from '@radix-ui/react-dialog'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import Orders from './orders'
import Cart from './cart'
import { useRouter } from 'next/navigation'
const userButton = () => {
    const token = localStorage.getItem('token')
    const router = useRouter()
    const login = () => {
        router.push('/login');
      };
      const signup = () => {
        router.push('/signUp');
      };
      const [test, setTest] = useState('order')
        const isClicked = (name: string) => {
          setTest(name)
        }
        const logout = () => {
            window.localStorage.removeItem('token');
            
            router.push('/');
          }
  return (
  
       <div className='flex gap-[15px]'>
           {!token ? (
             <div className={`gap-[20px] flex `}>
               <Button variant="secondary" onClick={login}>Login</Button>
               <Button variant="destructive" onClick={signup}>Sign up</Button>
             </div>
           ) : (
             <div className='flex gap-[20px]'>
                
               <Dialog>
                 <DialogTrigger className=''>
                   <Button className='text-white flex gap-[15px] rounded-full p-[20px] bg-gray-700 hover:bg-red-700 relative' >
                     <ShoppingCart />
                     <div className='absolute top-[-7px] right-[-7px] font-[700] text-[20px]'>13</div>
                   </Button>
                 </DialogTrigger>
                 <DialogContent>
                   <div className='flex gap-[30px]'>
                     <DialogTitle onClick={() => isClicked('cart')} className={`rounded-[10px] p-[5px] ${test === 'cart' ? "bg-red-500 " : ""}`}>Cart</DialogTitle>
                     <DialogTitle onClick={() => isClicked('order')} className={`rounded-[10px] p-[5px] ${test === 'order' ? "bg-red-500" : ""}`}>Order</DialogTitle>
                   </div>
                   <div className={`${test === 'cart' ? "hidden" : "flex"}`}>
                     <Orders />
                   </div>
                   <div className={`${test === 'order' ? "hidden" : "flex"}`}>
                     <Cart />
                   </div>
                 </DialogContent>
                 
               </Dialog>
               
               <Button className='text-white flex gap-[15px] rounded-full p-[20px] bg-gray-700 hover:bg-red-700' onClick={logout}>
                 Logout
               </Button>
             </div>
           )}
         </div>
  )
}

export default userButton