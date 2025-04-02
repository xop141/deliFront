"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FoodBadge from './FoodBadge';
import axios from 'axios';

type Category = {
  _id: string;
  categoryName: string;
};
interface Food {
  _id: string;
  foodName: string;
  price: number;
  ingredients: string;
  category?: string; // category could be optional or required based on your data
}

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [data, setData] = useState<Food[]>([]); // To store the food data
  const router = useRouter();

  // Fetch categories from the API using axios
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3030/category');
        setCategories(response.data); // Set the fetched categories to the state
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch food data for the selected category
  const fetchData = async (categoryName: string) => {
    try {
      const res = await axios.post("http://localhost:3030/food/list", { categoryName });
      setData(res.data); // Set the fetched food data to the state
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  // Handle category selection
  const handleCategorySelection = (categoryName: string) => {
    setSelectedCategoryId(categoryName); // Update the selected category
    router.push(`?id=${categoryName}`); // Update the URL with the selected category
    fetchData(categoryName); // Fetch food data based on the selected category
  };

  return (
    <div className="py-[32px] flex flex-col gap-[32px] items-center">
      <h1 className="text-[36px] font-[600] text-white">Categories</h1>
      <div className="flex gap-[10px]">
        {categories.map((category) => (
          <div
            key={category._id}
            className={`h-[36px] rounded-[12px] flex justify-center items-center p-[10px] 
              ${selectedCategoryId === category.categoryName ? 'bg-red-500 text-white' : 'bg-gray-200'} cursor-pointer`}
            onClick={() => handleCategorySelection(category.categoryName)}
          >
            {category.categoryName}
          </div>
        ))}
      </div>

      {/* Render the FoodBadge component only if data is available */}
      {data.length > 0 ? (
        <FoodBadge data={data} />
      ) : (
        <div className="text-center text-white">Select a category to view foods</div>
      )}
    </div>
  );
};

export default CategoryList;
