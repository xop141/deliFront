"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface Food {
  foodName: string
  quantity: number  
  price: number     
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

  useEffect(() => {
    const getOrder = async () => {
      const token = localStorage.getItem("token")
      try {
        const response = await axios.post(
          'http://localhost:3030/order/all',
          { token }
        )
        setData(response.data) 
      } catch (error) {
        console.error("Error fetching orders:", error)
      }
    }

    getOrder()
  }, [])

  return (
    <div >
      

      {data.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <Carousel className=' w-min'>
          <CarouselContent>
            {data.map((order) => {
              const totalOrderPrice = order.foods.reduce(
                (total, food) => total + food.price * food.quantity, 0
              );

              return (
                <CarouselItem key={order._id} className='flex items-end' >
                  <div className="mb-6 p-4 border border-gray-300 rounded-lg w-fit">
                    <p className="text-sm text-gray-500 mb-2">Created at: {new Date(order.createdAt).toLocaleString()}</p>

                    <div>
                      {order.foods && order.foods.length > 0 ? (
                        <ul className="w-fit">
                          {order.foods.map((food, foodIndex) => (
                            <li key={foodIndex} className="p-2 border-b border-gray-200">
                              <div>
                                <strong className="text-lg">{food.foodName}</strong> <br />
                                <span>Quantity: {food.quantity}</span> <br />
                                <span>Price: ${food.price.toFixed(2)}</span> <br />
                                <span>Total: ${(food.price * food.quantity).toFixed(2)}</span>
                              </div>
                            </li>
                          ))}
                          <li className="font-semibold mt-2">
                            <span>Total Order Price: ${totalOrderPrice.toFixed(2)}</span>
                          </li>
                        </ul>
                      ) : (
                        <p>No food available</p>
                      )}
                    </div>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <div className="flex justify-between mt-4">
         
          </div>
        </Carousel>
      )}
    </div>
  )
}

export default Orders
