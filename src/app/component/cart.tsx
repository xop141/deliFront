"use client"
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Trash, CircleMinus, CirclePlus } from 'lucide-react';

const Cart = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const token = localStorage.getItem('token');
  const router = useRouter();

  useEffect(() => {
    setData(JSON.parse(localStorage.getItem('cart') || '[]'));
  }, []);

  const orderButton = async () => {
    setIsDisabled(true);

    if (!token) {
      router.push("/login");
      return;
    }

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.length === 0) {
      console.error("Cart is empty");
      setIsDisabled(false);
      return;
    }

    const order = {
      userId: '67ec8fb0fd9cdab04b2d99f5', //replace
      foods: cart.map((item: { id: string; quantity: number }) => ({
        foodId: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      await axios.post("http://localhost:3030/order", order);
      localStorage.removeItem("cart");
      setData([]);
    } catch (error) {
      console.error('Error placing order:', error);
    } finally {
      setIsDisabled(false);
    }
  };

  const updateQuantity = (id: string, action: 'increase' | 'decrease') => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');

    const updatedCart = cart.map(item => {
      if (item.id === id) {
        if (action === 'increase') {
          item.quantity += 1;
        } else if (action === 'decrease' && item.quantity > 1) {
          item.quantity -= 1;
        }
      }
      return item;
    });

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setData(updatedCart);
  };

  const deleteItem = (id: string) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = cart.filter(item => item.id !== id);

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setData(updatedCart);
  };

  return (
    <div className='w-full'>
      {data.length > 0 ? (
        data.map((order, index) => (
          <div key={index} className="p-4 border border-gray-300 my-2 flex justify-between items-center">
            <div>
              <p>{order.foodName}</p>
              <div className='flex items-center gap-2'>
                <CirclePlus
                  className='cursor-pointer hover:text-red-500'
                  onClick={() => updateQuantity(order.id, 'increase')}
                />
                {order.quantity}
                <CircleMinus
                  className='cursor-pointer hover:text-red-500'
                  onClick={() => updateQuantity(order.id, 'decrease')}
                />
              </div>
            </div>
            <div className='flex flex-col justify-between items-center'>
              <Trash
                className='hover:text-red-500 rounded-full cursor-pointer'
                onClick={() => deleteItem(order.id)}
              />
            </div>
          </div>
        ))
      ) : (
        <p>No items in cart</p>
      )}

      <Button 
      className={`${data.length > 0 ? "flex" : "hidden"}`}
        variant={'destructive'} 
        onClick={orderButton} 
        disabled={isDisabled}
      >
        Place Order
      </Button>
    </div>
  );
};

export default Cart;
