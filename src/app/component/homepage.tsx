"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CategoryList from './category'; // Assuming it's already set up
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton component
import FoodList from './foodList';
// Updated Food interface with _id and ingredients
interface Food {
  _id: string; // Assuming each food item has an '_id' field
  foodName: string;
  price: number;
  ingredients: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const Homepage = () => {
  const [foods, setFoods] = useState<Food[]>([]); // State type is an array of Food objects
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    axios.get("http://localhost:3030/food/getFOOD")
      .then((response) => {
        setFoods(response.data); // Assuming response.data is the array of food objects
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load food data. Please try again later."); // Set error message
      })
      .finally(() => {
        setLoading(false); // Once the data is fetched, set loading to false
      });
  }, []);

  if (error) {
    return (
      <div className="px-[90px] py-[20px]">
        <p className="text-red-500">{error}</p> {/* Display error message */}
      </div>
    );
  }

  return (
    <div className="px-[90px] h-full py-[20px]">
      <CategoryList />
      {loading ? (
        <div className="flex flex-wrap gap-6">
          {[...Array(10)].map((_, index) => (
            <Skeleton key={index} className="bg-white p-6 w-[390px] flex flex-col gap-6 rounded-[25px] shadow-lg h-[300px]" />
          ))}
        </div>
      ) : (
      
<div><FoodList/></div>
        
      )}
    </div>
  );
}

export default Homepage;