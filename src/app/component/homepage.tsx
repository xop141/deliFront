"use client"
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FoodBadge from './FoodBadge'
import CategoryList from './category'

interface Food {
    foodName: string;
    price: number;
}

const Homepage = () => {
    const [foods, setFoods] = useState<Food[]>([]) // State type is an array of Food objects

    useEffect(() => {

       axios.get("http://localhost:3030/food/getFOOD")
            .then(function (response) {
                // Assuming response.data.data is the array of food objects
                setFoods(response.data) // Update the foods state with the array
                console.log(response.data);
                
            })
            .catch((error) => {
                console.error("Error fetching data:", error)
            })
    }, [])

    return (
        <div className=' px-[90px]'>
            <CategoryList/>
            {foods.length > 0 ? (
                <FoodBadge data={foods} />
            ) : (
                <p>Loading...</p> 
            )}
         
        </div>
    )
}

export default Homepage
