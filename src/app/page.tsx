"use client"
import UserButton from '@/components/auth/auth-components/user-button';
import { Button } from '@/components/ui/button'
import { useAuthActions } from "@convex-dev/auth/react";
const page = () => {
  const { signOut } = useAuthActions();
  return (
    <div className='h-full'>
      <p>Logged In !</p>
      <UserButton />
    </div>
  )
}

export default page 