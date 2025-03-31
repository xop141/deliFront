"use client"

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import FoodBadge from '@/app/component/FoodBadge'
import CategoryList from '@/app/component/category'
// Define the type for the data returned from the API (Food in this case)
interface Food {
  _id: string;
  foodName: string;
  price: number;
  ingredients: string;
  category?: string;
}

const Page = () => {
  const param = useParams()
  const category = param.id 

  const [data, setData] = useState<Food[] | null>(null) // State to store food data
  useEffect(() => {
    // Fetch all categories and their first 5 foods
    const fetchCategoriesAndFoods = async () => {
      try {
        const response = await axios.post('http://localhost:3030/food/list', {categoryName: category});
        setData(response.data);
        console.log(response.data);
       
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCategoriesAndFoods();  // Fetch data when the component mounts
  }, []);
 
  return (
    <div className='bg-black w-full'>
      {data ? (

       <FoodBadge data={data}  />

      ) : (
        <div>No data available</div>
      )}
    </div>
  )
}

export default Page
