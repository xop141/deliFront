"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FoodBadge from './FoodBadge';
const FoodList = () => {
  const [categoriesWithFoods, setCategoriesWithFoods] = useState([]);  // State to hold categories and their foods

  useEffect(() => {
    // Fetch all categories and their first 5 foods
    const fetchCategoriesAndFoods = async () => {
      try {
        const response = await axios.post('http://localhost:3030/food/list');
        setCategoriesWithFoods(response.data);
  
          // Set the response data (categories with foods)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCategoriesAndFoods();  // Fetch data when the component mounts
  }, []);

  return (

    <div className='flex  flex-col w-full'><FoodBadge data={categoriesWithFoods}/></div>
  );
};

export default FoodList;
