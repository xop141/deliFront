
"use client"

import CategoryList from "./component/category";
import FoodList from "./component/foodList";
import Cart from "./component/cart";
export default function Home() {
  return (
   <div className="bg-[#404040] px-[30px]">
    <Cart/>
<CategoryList/>
 <FoodList/>


   </div>
  );
}
