"use client"
import { Button } from '@/components/ui/button'
import { useAuthActions } from "@convex-dev/auth/react";
const page = () => {
  const { signOut } = useAuthActions();
  return (
    <div className='h-full'>
      <p>Home Page </p>
      <Button onClick={() => signOut()}>signOut</Button>
    </div>
  )
}

export default page 