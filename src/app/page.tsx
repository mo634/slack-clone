"use client"
import UserButton from '@/components/auth/auth-components/user-button';
import { modalOpenAtom } from '@/components/workspaces/store/modalAtom';
import { useWorkSpaces } from '@/components/workspaces/api/use-get-work-spaces';
import { useAuthActions } from "@convex-dev/auth/react";
import { useAtom } from 'jotai';
import { useEffect, useMemo } from 'react';
import Models from '@/components/models';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();
  const { signOut } = useAuthActions();

  const { data, isLoading } = useWorkSpaces();


  const [isOpen, setIsOpen] = useAtom(modalOpenAtom);



  const workSpaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (workSpaceId) {
      console.log("redirect to work space ")
      router.replace(`/workspaces/${workSpaceId}`);
    }

    // if no workspace created open the create workspace modal 
    else if (!isOpen) {
      setIsOpen(true)
    }

  }, [isLoading, workSpaceId, isOpen, setIsOpen]);

  return (
    <div className='h-full'>

      < Models />
      <p>Logged In !</p>
      <UserButton />
    </div>
  )
}

export default page 