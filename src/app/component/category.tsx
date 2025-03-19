"use client"
import React, { useState, useEffect } from 'react';

// Define the type for category
type Category = {
  _id: string;
  categoryName: string;
};

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null); // Track the selected category

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('http://localhost:3030/category');
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  // Handle color change when a category is clicked
  const handleColorChange = (id: string) => {
    setSelectedCategoryId(id); // Set the clicked category id
  };

  return (
    <div className='px-[48px] py-[32px] flex flex-col gap-[32px]'>
      <h1 className='text-[36px] font-[600] text-white'>Categories</h1>
      <div className='flex gap-[10px]'>
      {categories.map((category) => (
        <div
          key={category._id}
          className={`h-[36px] rounded-[12px] flex justify-center items-center p-[10px] 
            ${selectedCategoryId === category._id ? 'bg-red-500 text-white' : 'bg-gray-200'}`} // Only change the background color
          onClick={() => handleColorChange(category._id)} // Change color on click
        >
          {category.categoryName}
        </div>
      

      ))}
    </div>
    </div>
  );
};

export default CategoryList;
