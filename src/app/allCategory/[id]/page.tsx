"use client"

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import FoodBadge from '@/app/component/FoodBadge'
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
  const category = param.id // Get the 'id' parameter from the URL

  const [data, setData] = useState<Food[] | null>(null) // State to store food data

  // Fetch data when the `id` parameter is available
  useEffect(() => {
    if (category) {
      const fetchData = async () => {
        try {
          const res = await axios.post("http://localhost:3030/category/search", { category });
          console.log(res.data);
          setData(res.data); // Set the fetched data to the state
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
      fetchData();
    }
  }, [category]); // Only re-run when `category` changes

  return (
    <div>
      {data ? (
       <FoodBadge data={data}/>
      ) : (
        <div>No data available</div>
      )}
    </div>
  )
}

export default Page
