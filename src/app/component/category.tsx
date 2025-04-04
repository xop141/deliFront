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
  category?: string; 
}

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [data, setData] = useState<Food[]>([]);
  const router = useRouter();


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3030/category');
        setCategories(response.data);
       
        
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);
  const fetchData = async (categoryName: string) => {
    try {
      const res = await axios.post("http://localhost:3030/food/list", { categoryName });
      setData(res.data); 
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  }
  const handleCategorySelection = (categoryName: string) => {
    setSelectedCategoryId(categoryName); 
    router.push(`?id=${categoryName}`);
    fetchData(categoryName); 
  };
  return (
    <div className="py-[32px] flex flex-col gap-[32px] items-center">
      
      <div className="flex gap-[10px]">
        {categories.map((category) => (
          <div
            key={category._id}
            className={`h-[36px] rounded-[12px] flex justify-center items-center p-[10px] text-black font-[700] bg-gray-300 
              ${selectedCategoryId === category.categoryName ? 'bg-red-500 text-white' : 'bg-gray-200'} cursor-pointer`}
            onClick={() => handleCategorySelection(category.categoryName)}
          >
            {category.categoryName}
          </div>
        ))}
      </div>
      {data.length > 0 ? (
        <FoodBadge data={data} />
      ) : (
        <div className="text-center text-black">Select a category to view foods</div>
      )}
    </div>
  );
};
export default CategoryList;
