"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FoodBadge from './FoodBadge';
const FoodList = () => {
  const [categoriesWithFoods, setCategoriesWithFoods] = useState([]);  

  useEffect(() => {

    const fetchCategoriesAndFoods = async () => {
      try {
        const response = await axios.post('http://localhost:3030/food/list');
        setCategoriesWithFoods(response.data);
  
 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCategoriesAndFoods();  
  }, []);

  return (

    <div className='flex  flex-col w-full'><FoodBadge data={categoriesWithFoods}/></div>
  );
};

export default FoodList;
