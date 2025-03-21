"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type Category = {
  _id: string;
  categoryName: string;
};

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('http://localhost:3030/category');
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleColorChange = (name: string) => {
    setSelectedCategoryId(name);
    router.push(`?id=${name}`);
  };

  return (
    <div className='py-[32px] flex flex-col gap-[32px]'>
      <h1 className='text-[36px] font-[600] text-white'>Categories</h1>
      <div className='flex gap-[10px]'>
        {categories.map((category) => (
          <div
            key={category._id}
            className={`h-[36px] rounded-[12px] flex justify-center items-center p-[10px] 
              ${selectedCategoryId === category.categoryName ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
            onClick={() => handleColorChange(category.categoryName)}
          >
            {category.categoryName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
