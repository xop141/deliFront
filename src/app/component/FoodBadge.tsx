import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import product from '../img/Food Image.png';
import { CirclePlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'; // Import useSearchParams
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
interface Food {
  _id: string; // Add the _id field here
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

  const [filtered, setFiltered] = useState<Food[]>([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      // Filter foods based on the category (assuming category is a field in your data)
      setFiltered(data.filter((food) => food.category === id));
    } else {
      setFiltered(data); // No filter, so use all the foods
    }
  }, [searchParams, data]); // Add 'data' to the dependencies to recompute if food data changes

  const orderButton = async (id: string) => {

    const token = window.localStorage.getItem('token');


    if (!token) {
      router.push("/login")
      return;
    }

    const order = {
      id: id,//ordered food id
      quantity: 2,
      token: token
    };

    setLoading(true); // Set loading state to true while waiting for the API response

    try {
      const response = await axios.post("http://localhost:3030/order", order);
      console.log('Order placed successfully:', response.data);

      // Optionally, show a success message or do something else (e.g., navigate)
    } catch (err) {
      console.log(err);


    } finally {
      setLoading(false); // Reset loading state after request completes
    }
  };

  return (
    <div >
      {/* {filtered.map((food, index) => (
        <div
          key={index}
          className='h-fit bg-gray-300 p-[16px] w-[390px] flex flex-col gap-[20px] rounded-[20px] opacity-[0.1]'
        >
          <div className='relative'>
            <Image src={product} alt='product img' className='rounded-[20px]' />
            <CirclePlus className='text-white absolute right-[20px] bottom-[20px] w-[44px] h-[44px]' onClick={() => orderButton(food._id)} />
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
      ))}  */}




      <div className='flex gap-[20px] flex-wrap'>
         {filtered.map((food, index) => (
          <Dialog    key={index}>
        <DialogTrigger
       
          className='h-fit bg-gray-300 p-[16px] w-[390px] flex flex-col gap-[20px] rounded-[20px] opacity-[1]'
        >
         
          <div className='relative'>
            <Image src={product} alt='product img' className='rounded-[20px]' />
            <CirclePlus className='text-white absolute right-[20px] bottom-[20px] w-[44px] h-[44px]' onClick={() => orderButton(food._id)} />
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
        
        </DialogTrigger>
        </Dialog>
      ))}
</div>
    </div>

  );
};

export default FoodBadge;
