import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import product from '@/app/img/Food Image.png'
interface Food {
  _id: string;
  foodName: string;
  price: number;
  ingredients: string;
  category?: string;
}
import Image from 'next/image';
interface AllFoodsProps {
  data: Food[];
}

const AllFoods: React.FC<AllFoodsProps> = ({ data }) => {
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
    setFoods(data);
    console.log(data);
    
  }, [data]); // Add data as a dependency, in case it changes

  return (
    <div className='flex gap-[20px] flex-row h-full flex-wrap px-[50px]'>
      {foods.map((food) => (
        <Dialog key={food._id}>
          {/* This is the trigger for the dialog */}
          <DialogTrigger className="bg-white p-6 w-[390px] flex flex-col gap-6 rounded-[25px] shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
            <div className="relative">
              {/* You can add an image here or any other content */}
              <Image src={product} alt={food.foodName} className="rounded-lg w-full h-[250px] object-cover" />
            </div>
            <div className="flex flex-col">
              <div className="flex justify-between items-center font-semibold">
                <p className="text-red-500 text-xl">{food.foodName}</p>
                <p className="text-lg">{food.price} $</p>
              </div>
              <p className="text-sm text-gray-600">{food.category}</p>
            </div>
          </DialogTrigger>

          {/* This is the content inside the dialog */}
          <DialogContent>
            <DialogTitle className="text-3xl text-red-500 font-bold">
              {food.foodName}
            </DialogTitle>
            <DialogDescription className="text-gray-800 font-normal text-xl mt-2">
              {food.ingredients}
            </DialogDescription>

            <div className="flex flex-col mt-4">
              <p className="text-sm text-gray-600">Price: ${food.price}</p>
              {food.category && <p className="text-sm text-gray-600">Category: {food.category}</p>}
            </div>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};

export default AllFoods;
