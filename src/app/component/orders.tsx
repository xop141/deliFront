"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'

// Define types for food and order, including quantity and price
interface Food {
  foodName: string
  quantity: number  // Quantity of the food item
  price: number     // Price of the food item
}

interface Order {
  _id: string
  userId: string
  foods: Food[]
  createdAt: string
  updatedAt: string
}

const Orders: React.FC = () => {
  const [data, setData] = useState<Order[]>([])

  let cart = localStorage.getItem('cart')

  // Fetch orders function
  const getOrder = async () => {
    const token = localStorage.getItem("token")
    try {
      const response = await axios.post(
        'http://localhost:3030/order/all',
        { token } // Send token as body
      )
      setData(response.data)  // Set the response data
    } catch (error) {
      console.error("Error fetching orders:", error)
    }
  }

  // Re-fetch orders when cart changes
  useEffect(() => {
    getOrder()
  }, [cart])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Orders</h1>

      {/* Render the list of orders */}
      {data.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div>
          {data.map((order) => {
            // Calculate total price for this order
            const totalOrderPrice = order.foods.reduce(
              (total, food) => total + food.price * food.quantity, 0
            );

            return (
              <div key={order._id} className="mb-6 p-4 border border-gray-300 rounded-lg">
                <h2 className="text-xl font-semibold mb-2">Order #{order._id}</h2>
                <p className="text-sm text-gray-500 mb-2">Created at: {new Date(order.createdAt).toLocaleString()}</p>
                
                {/* List the food items in the order */}
                <div>
                  {order.foods && order.foods.length > 0 ? (
                    <ul className="space-y-2">
                      {order.foods.map((food, foodIndex) => (
                        <li key={foodIndex} className="p-2 border-b border-gray-200">
                          <div>
                            <strong className="text-lg">{food.foodName}</strong> <br />
                            <span>Quantity: {food.quantity}</span> <br />
                            <span>Price: ${food.price.toFixed(2)}</span> <br />
                            <span>Total: ${(food.price * food.quantity).toFixed(2)}</span> {/* Display total for each food item */}
                          </div>
                        </li>
                      ))}
                      <li className="font-semibold mt-2">
                        <span>Total Order Price: ${totalOrderPrice.toFixed(2)}</span> {/* Display total price for the order */}
                      </li>
                    </ul>
                  ) : (
                    <p>No food available</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  )
}

export default Orders
