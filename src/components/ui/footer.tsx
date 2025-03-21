import React from 'react'
import FooterBOTTOM from './footerBOTTOM'
import Marquee from 'react-fast-marquee'
const footer = () => {
  return (
    <div className='bg-[#18181B]'>
  
      <Marquee className='text-white bg-[#EF4444] text-[30px] font-[600] py-[28px] flex gap-[40px]' autoFill speed={0}>

<p className='px-[40px]'>FAST AS FUCK</p>

</Marquee>
 
      <FooterBOTTOM/>
    </div>
  )
}

export default footer