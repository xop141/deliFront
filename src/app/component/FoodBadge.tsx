import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import product from '../img/Food Image.png';  // Placeholder image
import { CirclePlus, CircleMinus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import axios from 'axios';

// Define Food interface
interface Food {
  _id: string;
  foodName: string;
  price: number;
  ingredients: string;
  category: string;
}

// Define Category interface
interface Category {
  categoryName: string;
  foods: Food[];
}

// Define Props for the FoodList component
interface FoodListProps {
  data: Category[];
}

const FoodList: React.FC<FoodListProps> = ({ data }) => {
  console.log("asd");
  

  
  const [count, setCount] = useState<number>(1);
  const [successMessage, setSuccessMessage] = useState<string>(''); 
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false); 
  const router = useRouter();
const seeALL = (id)=>{
  router.push(`/allCategory/${id}`)
  
}
  // Function to handle order placement
  const orderButton = async (id: string) => {
    const token = window.localStorage.getItem('token');
    if (!token) {
      router.push("/login");
      return;
    }

    const order = { id, quantity: count, token };
    setIsButtonDisabled(true);

    try {
      const response = await axios.post("http://localhost:3030/order", order);
      setSuccessMessage("Order placed successfully!");
      setTimeout(() => setSuccessMessage(""), 2000);
    } catch (err) {
      console.log(err);
      setSuccessMessage("Failed to place the order. Please try again.");
    } finally {
      setIsButtonDisabled(false);
    }
    setCount(1); // Reset the quantity after order
  };

  // Functions for adjusting quantity
  const add = () => setCount(count + 1);
  const minus = () => count > 1 && setCount(count - 1);

  return (
    <div className="flex flex-col gap-2 px-[40px] py-[20px] w-full">
      {/* Loop through each category */}
      {data.map((category, categoryIndex) => (
        <div key={categoryIndex} className="flex flex-row flex-wrap justify-between w-full">
       
          <h2 className="text-3xl font-bold text-white mb-4">{category.categoryName}</h2>
<Button onClick={()=>seeALL(category.categoryName)} className={`${data[0].foods.length > 6 ? "hidden" :"flex"}`}> See All </Button>
          {/* Loop through each food in this category */}
          <div className="flex flex-row gap-5 flex-wrap">
            {category.foods.map((food, foodIndex) => (
              <Dialog key={foodIndex}>
                {/* Card Trigger (clickable to open modal) */}
                <DialogTrigger className="bg-white p-6 w-[390px] flex flex-col gap-6 rounded-[25px] shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                  {/* Image Section */}
                  <div className="relative">
                    <Image src={product} alt="product img" className="rounded-lg w-full h-[250px] object-cover" />
                  </div>

                  {/* Food Details */}
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center font-semibold">
                      <p className="text-red-500 text-xl">{food.foodName}</p>
                      <p className="text-lg">{food.price} $</p>
                    </div>
                    <p className="text-sm text-gray-600">{food.category}</p>
                  </div>
                </DialogTrigger>

                {/* Food Dialog Content (when clicked, opens modal) */}
                <DialogContent>
                  <DialogTitle className="text-3xl text-red-500 font-bold">
                    {food.foodName}
                    <div className="text-gray-800 font-normal text-xl mt-2">{food.ingredients}</div>
                  </DialogTitle>

                  <DialogDescription className="text-gray-800 font-normal text-lg mt-4">
                    {/* Total Price and Order Section */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-sm text-gray-600">Total price:</div>
                        <p className="text-xl text-red-500">${food.price}</p>
                      </div>
                    </div>

                    {/* Quantity Adjustments */}
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

                    {/* Place Order Button */}
                    <Button
                      className="w-full bg-red-500 text-white font-semibold py-3 rounded-lg hover:bg-red-600 transition-all duration-300"
                      onClick={() => orderButton(food._id)}
                      disabled={isButtonDisabled}
                    >
                      {isButtonDisabled ? "Placing Order..." : "Place order"}
                    </Button>

                    {/* Success or Error Message */}
                    {successMessage && (
                      <p className="text-green-600 mt-3 text-sm">{successMessage}</p>
                    )}
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
