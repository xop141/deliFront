import React from 'react'
import Image from 'next/image'
import product from '../img/Food Image.png'
import { CirclePlus } from 'lucide-react'

interface Food {
  foodName: string
  price: number
  ingredients: string 
}
interface FoodBadgeProps {
  data: Food[]
}


const FoodBadge: React.FC<FoodBadgeProps> = ({ data }) => {
 
  
  return (
    <div className='flex flex-row justify-between flex-wrap px-[90px] gap-y-[20px]'>
      {data.map((food, index) => (
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
  )
}

export default FoodBadge
