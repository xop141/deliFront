"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FoodBadge from './FoodBadge';
import CategoryList from './category';
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton component

interface Food {
  foodName: string;
  price: number;
}

const Homepage = () => {
  const [foods, setFoods] = useState<Food[]>([]); // State type is an array of Food objects
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    axios.get("http://localhost:3030/food/getFOOD")
      .then(function (response) {
        // Assuming response.data is the array of food objects
        setFoods(response.data); // Update the foods state with the array
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
        // Show skeletons while loading
        <div className="flex flex-wrap gap-6">
          {[...Array(10)].map((_, index) => (
                   <Skeleton key={index} className="bg-white p-6 w-[390px] flex flex-col gap-6 rounded-[25px] shadow-lg h-[300px]"/>
            // <div key={index} className="bg-white p-6 w-[390px] flex flex-col gap-6 rounded-[25px] shadow-lg">
            //   <Skeleton className="w-full h-[250px] rounded-lg" />
            //   <div className="flex flex-col">
            //     <Skeleton className="w-2/3 h-[20px] mb-2" />
            //     <Skeleton className="w-1/3 h-[20px]" />
            //     <Skeleton className="w-full h-[15px]" />
            //   </div>
            // </div>
          ))}
        </div>
      ) : (

    
    
        <FoodBadge data={foods}  />

      )}
    </div>
  );
}

export default Homepage;
