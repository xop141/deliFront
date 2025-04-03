import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import product from '../img/Food Image.png';  // Placeholder image
import { CirclePlus, CircleMinus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import axios from 'axios';



interface Food {
  _id: string;
  foodName: string;
  price: number;
  ingredients: string;
  category: string;
}


interface Category {
  categoryName: string;
  foods: Food[];
}


interface FoodListProps {
  data: Category[];
}
const FoodList: React.FC<FoodListProps> = ({ data }) => {
  const [count, setCount] = useState<number>(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<string | null>(null);
  const router = useRouter();
  const seeALL = (id: any) => {
    router.push(`/allCategory/${id}`);
  }
  const orderButton = async (foodId: string, foodName: string, closeDialog: () => void) => {
    const token = window.localStorage.getItem('token');
    if (!token) {
      router.push("/login");
      return;
    }
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItemIndex = cart.findIndex((item: { id: string }) => item.id === foodId);
    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += count;
    } else {
      cart.push({ id: foodId, foodName: foodName, quantity: count });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    closeDialog();
    setCount(1);
    setIsButtonDisabled(false);
  };
  const add = () => setCount(count + 1);
  const minus = () => count > 1 && setCount(count - 1);
  
  return (
    <div className="flex flex-wrap py-[40px] w-full">
      {data.map((category, categoryIndex) => (
        <div key={categoryIndex} className="flex flex-col flex-wrap justify-between w-full py-[50px]">
          <div className='flex justify-between'>
            <h2 className="text-3xl font-bold text-white mb-4">{category.categoryName}</h2>
            <Button onClick={() => seeALL(category.categoryName)} className={`${data[0].foods.length > 6 ? "hidden" : "flex"}`}> See All </Button>
          </div>
          <div className="flex flex-row gap-[50px] flex-wrap">
            {category.foods.map((food, foodIndex) => (
              <Dialog key={foodIndex} open={openDialog === food._id} onOpenChange={(isOpen) => setOpenDialog(isOpen ? food._id : null)}>
                <DialogTrigger className="bg-white p-6 w-[390px] flex flex-col gap-6 rounded-[25px] shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                  <div className="relative">
          
                    <Image src={product} alt="product img" className="rounded-lg w-full h-[250px] object-cover" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center font-semibold">
                      <p className="text-red-500 text-xl">{food.foodName}</p>
                      <p className="text-lg">{food.price} $</p>
                    </div>
                    <p className="text-sm text-gray-600">{food.category}</p>
                    

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
                        <div className="text-sm text-gray-600">Total price:</div>
                        <p className="text-xl text-red-500">${food.price}</p>
                
                      </div>
                  
                    </div>
                    <div className="flex gap-4 items-center mb-4">
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
                    <Button
                      className="w-full bg-red-500 text-white font-semibold py-3 rounded-lg hover:bg-red-600 transition-all duration-300"
                      onClick={() => orderButton(food._id, food.foodName, () => setOpenDialog(null))}
                      disabled={isButtonDisabled}
                    >
                      Add to Cart
                    </Button>
                  </DialogDescription>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodList;
