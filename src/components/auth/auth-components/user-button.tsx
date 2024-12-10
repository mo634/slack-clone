"use client"
import React, { useState } from 'react'
import { useUserInfo } from '../api/use-current-user'
import { Loader, LogOut } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuthActions } from '@convex-dev/auth/react'

const UserButton = () => {
    const { data, isLoading } = useUserInfo()
    const [isSigningOut, setIsSigningOut] = useState(false);

    const { signOut } = useAuthActions()

    const handleSignOut = async () => {
        setIsSigningOut(true);
        try {
            await signOut();
            setTimeout(() => {
                window.location.href = "/auth";
            }, 0);
        } catch (error) {
            console.error("Error during sign out:", error);
        } finally {
            setIsSigningOut(false);
        }
    };


    if (isLoading) {
        return <Loader className=' animate-spin size-2xl text-blue-700' />
    }

    if (!data) {
        return <div>no data </div>
    }


    const { image, name, email } = data

    const avatarNameFullback = name.charAt(0).toUpperCase()

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage alt={name} src={image} />
                    <AvatarFallback>{avatarNameFullback}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent >

                <DropdownMenuItem className=' text-lg'>
                    {name}
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleSignOut} disabled={isSigningOut}>
                    <div className="flex cursor-pointer">
                        <LogOut className="mr-2 text-blue-700 text-lg" /> SignOut
                    </div>
                </DropdownMenuItem>


            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserButton