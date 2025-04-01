
"use client"

import CategoryList from "./component/category";
import FoodList from "./component/foodList";

export default function Home() {
  return (
   <div className="bg-[#404040] px-[30px]">
    
<CategoryList/>
 <FoodList/>


   </div>
  );
}
