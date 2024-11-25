import React from 'react'
import { useUserInfo } from '../hooks/use-current-user'
import { Loader, LogOut } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuthActions } from '@convex-dev/auth/react'

const UserButton = () => {
    const { data, isLoading } = useUserInfo()

    const { signOut } = useAuthActions()

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
            <DropdownMenuContent onClick={() => signOut()}>

                <DropdownMenuItem className=' text-lg'>
                    {name}
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem>
                    <div className=" flex cursor-pointer">
                        <LogOut className=' mr-2 text-blue-700 text-lg' /> SignOut
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserButton