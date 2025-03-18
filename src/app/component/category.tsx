import React from 'react'

const category = async() => {
    const response = await fetch('http://localhost:3030/user/signup', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
     
    });
  return (
    <div className='w-full h-fit'>
        <div>asd</div>
    </div>
  )
}

export default category