import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import product from '../img/Food Image.png';
import { CirclePlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'; // Import useSearchParams

interface Food {
  foodName: string;
  price: number;
  ingredients: string;
  category?: string; // Add the optional category field if it's used for filtering
}

interface FoodBadgeProps {
  data: Food[];
}

const FoodBadge: React.FC<FoodBadgeProps> = ({ data }) => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Use useSearchParams to access query parameters

  const [filtered, setFiltered] = useState<Food[]>([]); // Explicitly define the type for the filtered state

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      // Filter foods based on the category (assuming category is a field in your data)
      setFiltered(data.filter((food) => food.category === id));
    } else {
      setFiltered(data); // No filter, so use all the foods
    }
  }, [searchParams, data]); // Add 'data' to the dependencies to recompute if food data changes

  return (
    <div className='flex flex-row justify-between flex-wrap gap-y-[20px]'>
      {filtered.map((food, index) => (
        <div
          key={index}
          className='h-fit bg-gray-300 p-[16px] w-[390px] flex flex-col gap-[20px] rounded-[20px]'
        >
          <div className='relative'>
            <Image src={product} alt='product img' className='rounded-[20px]' />
            <CirclePlus className='text-white absolute right-[20px] bottom-[20px] w-[44px] h-[44px]' />
          </div>
          <div className='flex flex-col'>
            <div className='flex justify-between font-[600]'>
              <p className='text-red-500 text-[24px]'>{food.foodName}</p>
              <p className='text-[18px]'>{food.price} $</p>
            </div>
            <h1 className='h-full w-fit'>
              {food.ingredients}
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodBadge;
