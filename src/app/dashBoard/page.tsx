"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const Page = () => {
  const route = useRouter()
  
  const logout = () => {
    localStorage.removeItem('token');
    route.push('/')
  }

  return (
    <div className='flex justify-center'>
      <Button variant='destructive' onClick={logout}>Log out</Button>
    </div>
  )
}

export default Page
