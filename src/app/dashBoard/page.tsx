"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
const page = () => {
const route = useRouter()
    const logout = ()=>{
        localStorage.removeItem('token');
        route.push('/')

    }
      return (
    <div className='flex justify-center'>
<Button variant='destructive' onClick={logout}>log out</Button>

    </div>
  )
}

export default page