import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import product from '../img/Food Image.png';
import { CirclePlus, CircleMinus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Define Food interface to match your data structure
interface Food {
  _id: string;
  foodName: string;
  price: number;
  ingredients: string;
  category?: string;
}

interface Category {
  categoryName: string;
}

interface FoodBadgeProps {
  data: Food[];
}

const FoodBadge: React.FC<FoodBadgeProps> = ({ data }) => {
  const router = useRouter();
  const [count, setCount] = useState(1);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  
  // State to store categories fetched from API
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3030/category");
        setCategories(res.data);  // Assuming res.data is an array of categories with categoryName
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array ensures it runs once when the component mounts

  // Group food data by category
  const groupedFoods = categories.reduce((acc, category) => {
    const foodsInCategory = data.filter((food) => food.category === category.categoryName);
    if (foodsInCategory.length > 0) {
      acc.push({
        categoryName: category.categoryName,
        foods: foodsInCategory,
      });
    }
    return acc;
  }, [] as { categoryName: string, foods: Food[] }[]);
//jump to see all
const seeAll = (id : string)=>{
  console.log(id);
  router.push(`allCategory/${id}`)
  
}
  // Function to handle the order button click
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
    setCount(1);  // Reset count after placing order
  };

  // Increase or decrease quantity
  const add = () => setCount(count + 1);
  const minus = () => count > 1 && setCount(count - 1);


  return (
    <div className="flex flex-col gap-8">
      {groupedFoods.map((group, index) => (
        <div key={index}>
          <h2 className="text-2xl font-bold text-white mb-4 flex justify-between">{group.categoryName}
            <Button variant={'destructive'} onClick={()=>seeAll(group.categoryName)}>See all</Button>
          </h2>
          <div className="flex gap-6 flex-row flex-wrap">
            {group.foods.slice(0, 5).map((food) => (  
              <Dialog key={food._id}>
                <DialogTrigger
                  className="bg-white p-6 w-[390px] flex flex-col gap-6 rounded-[25px] shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                >
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
                      disabled={isButtonDisabled}
                    >
                      {isButtonDisabled ? "Placing Order..." : "Place order"}
                    </Button>

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

export default FoodBadge;
