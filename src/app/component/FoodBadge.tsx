  import React, { useState, useEffect } from 'react';
  import Image from 'next/image';
  import product from '../img/Food Image.png';
  import { CirclePlus } from 'lucide-react';
  import { useRouter } from 'next/navigation';
  import { useSearchParams } from 'next/navigation';
  import { CircleMinus } from 'lucide-react';
  import { Button } from "@/components/ui/button"
  import axios from 'axios';
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Skeleton } from '@/components/ui/skeleton';
  interface Food {
    _id: string;
    foodName: string;
    price: number;
    ingredients: string;
    category?: string;
  }

  interface FoodBadgeProps {
    data: Food[];
  }

  const FoodBadge: React.FC<FoodBadgeProps> = ({ data }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [count, setCount] = useState(1);
    const [filtered, setFiltered] = useState<Food[]>([]);
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false); // Track button disable state

    useEffect(() => {
      const id = searchParams.get('id');
      if (id) {
        setFiltered(data.filter((food) => food.category === id));
      } else {
        setFiltered(data);
      }
    }, [searchParams, data]);

    const orderButton = async (id: string) => {
      const token = window.localStorage.getItem('token');
      if (!token) {
        router.push("/login");
        return;
      }

      const order = {
        id: id,
        quantity: count,
        token: token,
      };

    
      setIsButtonDisabled(true); // Disable the button when the order is being processed

      try {
        const response = await axios.post("http://localhost:3030/order", order);
        console.log('Order placed successfully:', response.data);
        timer();
      } catch (err) {
        console.log(err);
        setSuccessMessage("Failed to place the order. Please try again.");
      } finally {
        setIsButtonDisabled(false); // Re-enable the button after request is finished
      }
      setCount(1);
    };

    const add = () => {
      setCount(count + 1);
    };

    const minus = () => {
      if (count > 1) {
        setCount(count - 1);
      }
    };

    const timer = () => {
      setSuccessMessage("Order placed successfully!");
      setTimeout(() => {
        setSuccessMessage(""); // Clear the success message after 2 seconds
      }, 2000);
    };

    return (

      <div className="flex gap-6 flex-row flex-wrap ">
        {filtered.map((food, index) => (
          <Dialog key={index}>
            <DialogTrigger
              className="bg-white p-6 w-[390px] flex flex-col gap-6 rounded-[25px] shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <div className="relative">
                <Image src={product} alt="product img" className="rounded-lg w-full h-[250px] object-cover" />
                {/* <CirclePlus className="text-white absolute right-4 bottom-4 w-10 h-10 hover:text-red-700" /> */}
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between items-center font-semibold">
                  <p className="text-red-500 text-xl">{food.foodName}</p>
                  <p className="text-lg">{food.price} $</p>
                </div>
                <p className="text-sm text-gray-600">{food.ingredients}</p>
              </div>
            </DialogTrigger>
    
            <DialogContent>
              <DialogTitle className="text-3xl text-red-500 font-bold">
                {food.foodName}
                <div className="text-gray-800 font-normal text-xl mt-2">{food.ingredients}</div>
              </DialogTitle>
    
              <DialogDescription className="text-gray-800 font-normal text-lg mt-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-600">Total price :</div>
                    <p className="text-xl text-red-500">${food.price}</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <button
                      disabled={count === 1}
                      onClick={minus}
                      className="bg-gray-300 text-gray-700 p-2 rounded-full hover:bg-gray-400 transition-colors duration-200"
                    >
                      <CircleMinus />
                    </button>
                    <p className="text-lg font-semibold">{count}</p>
                    <button
                      onClick={add}
                      className="bg-gray-300 text-gray-700 p-2 rounded-full hover:bg-gray-400 transition-colors duration-200"
                    >
                      <CirclePlus />
                    </button>
                  </div>
                </div>
    
                <Button
                  className="w-full bg-red-500 text-white font-semibold py-3 rounded-lg hover:bg-red-600 transition-all duration-300"
                  onClick={() => orderButton(food._id)}
                  disabled={isButtonDisabled} // Disable button when processing
                >
                  Place order
                </Button>
    
                {successMessage && (
                  <p className="text-green-600 mt-3 text-sm">{successMessage}</p>
                )}
              </DialogDescription>
            </DialogContent>
          </Dialog>
        ))}
      </div>

    
    );
  };

  export default FoodBadge;
