import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Cart = () => {
    const router = useRouter();
    const [data, setData] = useState<any[]>([]);
    const token = localStorage.getItem('token');

    // ✅ Load cart data from localStorage on initial render
    useEffect(() => {
        const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
        setData(cartData);
    }, []);

    const orderButton = async () => {
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
        }
    };

    return (
        <div>
            <h2>Your Cart</h2>
            {data.length > 0 ? (
                data.map((order, index) => (
                    <div key={index} className="p-4 border border-gray-300 my-2">
                        <p><strong>Food ID:</strong> {order.id}</p>
                        <p><strong>Quantity:</strong> {order.quantity}</p>
                    </div>
                ))
            ) : (
                <p>No items in cart</p>
            )}

            <Button variant={'destructive'} onClick={orderButton}>Place Order</Button>
        </div>
    );
};

export default Cart;
