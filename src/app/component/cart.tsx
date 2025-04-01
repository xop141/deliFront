"use client"
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Trash, CircleMinus, CirclePlus } from 'lucide-react';

const Cart = () => {
    const [isDisabled, setIsDisabled] = useState(false)
    const router = useRouter();
    const [data, setData] = useState<any[]>([]);
    const token = localStorage.getItem('token');

    // ✅ Load cart data from localStorage on initial render
    useEffect(() => {
        const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
        setData(cartData);
    }, []);

    // Place order function
    const orderButton = async () => {
        setIsDisabled(true)
        if (!token) {
            router.push("/login");
            return;
        }

        // Get cart data from localStorage
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');

        if (cart.length === 0) {
            console.error("Cart is empty");
            return;
        }

        const order = {
            userId: '67ead8a661d90242e22374b7',
            foods: cart.map((item: { id: string; quantity: number }) => ({
                foodId: item.id,
                quantity: item.quantity,
            })),
        };

        try {
            const response = await axios.post("http://localhost:3030/order", order);

            // Clear cart from localStorage & UI immediately after placing order
            localStorage.removeItem("cart");
            setData([]); // Clear UI without refreshing

        } catch (error) {
            console.error('Error placing order:', error);
        } finally{
            setIsDisabled(false)
        }
    };

    // Update cart item quantity
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

        // Save the updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(updatedCart));

        // Update the state to reflect changes in the UI
        setData(updatedCart);
    };

    // Delete item from cart
    const Delete = (id: string) => {
        const cart = localStorage.getItem('cart');

        if (cart) {
            // Parse the cart string into an array
            const parsedCart = JSON.parse(cart);

            // Filter out the item with the matching id
            const updatedCart = parsedCart.filter(item => item.id !== id);

            // Save the updated cart back to localStorage
            localStorage.setItem('cart', JSON.stringify(updatedCart));

            // Update the state to reflect changes in the UI
            setData(updatedCart);

            console.log(updatedCart); // Optionally log the updated cart
        } else {
            console.log('No cart found in localStorage');
        }
    };

    return (
        <div>
            {data.length > 0 ? (
                data.map((order, index) => (
                    <div key={index} className="p-4 border border-gray-300 my-2 flex justify-between items-center">
                        <div>
                            <p> {order.foodName}</p>
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
                                onClick={() => Delete(order.id)}
                            />
                           
                        </div>
                    </div>
                ))
            ) : (
                <p>No items in cart</p>
            )}

            <Button variant={'destructive'} onClick={orderButton} disabled={isDisabled}>Place Order</Button>
        </div>
    );
};

export default Cart;
