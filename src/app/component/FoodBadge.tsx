import React from 'react'
import Image from 'next/image'
import product from '../img/Food Image.png'
import { CirclePlus } from 'lucide-react';

const FoodBadge = () => {
  return (
    <div className='flex justify-center'>
      <div className=' h-fit bg-gray-300 p-[16px] w-[390px] flex flex-col gap-[20px] rounded-[20px]'>
        <div className='relative'>
      <Image src={product} alt='product img' className='rounded-[20px] '/>
      <CirclePlus className='text-white absolute right-[20px] bottom-[20px] size-[44px]'/>
      </div>
        <div className='flex flex-col'>
          <div className='flex justify-between font-[600]'>
            <p className='text-red-500 text-[24px]'>food name</p>
            <p className='text-[18px]'>12$ </p>
          </div>
          <h1 className='h-full w-fit'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, ut!
          </h1>

        </div>

      </div>
    </div>
  )
}

export default FoodBadge
