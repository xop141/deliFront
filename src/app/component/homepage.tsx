"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FoodBadge from './FoodBadge'; // Assuming it's already set up
import CategoryList from './category'; // Assuming it's already set up
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton component

// Updated Food interface with _id and ingredients
interface Food {
  foodName: string;
  price: number;
  _id: string; // Add the _id field
  ingredients: string[]; // Add the ingredients field (assuming it's an array of strings)
}

const Homepage = () => {
  const [foods, setFoods] = useState<Food[]>([]); // State type is an array of Food objects
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    axios.get("http://localhost:3030/food/getFOOD")
      .then((response) => {
        setFoods(response.data); // Assuming response.data is the array of food objects
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false); // Once the data is fetched, set loading to false
      });
  }, []);

  return (
    <div className='px-[90px] h-full py-[20px]'>
      <CategoryList />
      {loading ? (
        <div className="flex flex-wrap gap-6">
          {[...Array(10)].map((_, index) => (
            <Skeleton key={index} className="bg-white p-6 w-[390px] flex flex-col gap-6 rounded-[25px] shadow-lg h-[300px]"/>
          ))}
        </div>
      ) : (
        <FoodBadge data={foods} />
      )}
    </div>
  );
}

export default Homepage;
