"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { jwtDecode } from "jwt-decode"
import { Skeleton } from "@/components/ui/skeleton"

// Define the type for the order response
interface Order {
  foodName: string;
  totalPrice: number;
  quantity: number;
  status: string;
}

const Page = () => {
  const [token, setToken] = useState<string | null>(null); // State to store the token
  const [response, setResponse] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Only fetch the token after the component mounts (client-side)
  useEffect(() => {
    if (typeof window !== "undefined") { // Check if running on the client-side
      const savedToken = window.localStorage.getItem('token');
      setToken(savedToken);
    }
  }, []); // This effect runs once when the component mounts

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode<{ userId: string }>(token);
      const data = decoded.userId;

      if (data) {
        setLoading(true);
        axios
          .post("http://localhost:3030/order/all", { userId: data })
          .then((response) => {
            console.log(response.data); // Check the structure of the response
            setResponse(response.data); // Set response state
          })
          .catch((error) => {
            console.error("Error fetching orders:", error);
          })
          .finally(() => setLoading(false));
      }
    }
  }, [token]); // Re-run effect if token changes

  return (
    <div className=' py-8 h-full'>
      {loading ? (
        <div className="flex gap-4 flex-col">
          <Skeleton className="px-[24px] py-[16px] rounded-[12px] shadow-lg w-full max-w-[600px] mx-auto mb-6 h-[150px]" />
          <Skeleton className="px-[24px] py-[16px] rounded-[12px] shadow-lg w-full max-w-[600px] mx-auto mb-6 h-[150px]" />
          <Skeleton className="px-[24px] py-[16px] rounded-[12px] shadow-lg w-full max-w-[600px] mx-auto mb-6 h-[150px]" />
        </div>
      ) : (
        <div className='flex h-fit flex-col'>
          {response.map((order, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-[20px] bg-white px-[24px] py-[16px] rounded-[12px] shadow-lg w-full max-w-[600px] mx-auto mb-6">
              <div className="flex flex-col md:flex-row gap-4 w-full">
                <div className="flex-1">
                  <p className="font-semibold text-lg text-gray-800">{order.foodName}</p>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-lg text-gray-800">${order.totalPrice.toFixed(2)}</p>
                  <p className="text-gray-600 text-sm">Total Price</p>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-lg text-gray-800">{order.quantity}</p>
                  <p className="text-gray-600 text-sm">Quantity</p>
                </div>
                <div className="flex-1">
                  <p className={`font-semibold text-lg ${order.status === 'delivered' ? 'text-green-500' : order.status === 'pending' ? 'text-yellow-500' : 'text-red-500'}`}>{order.status}</p>
                  <p className="text-gray-600 text-sm">Order Status</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
