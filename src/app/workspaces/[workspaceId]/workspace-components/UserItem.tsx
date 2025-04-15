import React from 'react'
import { Id } from '../../../../../convex/_generated/dataModel'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useGetWorkspaceId } from '@/components/workspaces/hooks/use-get-workspace-id'
interface userItemsProps {
    id: Id<"member">,
    label?: string,
    image?: string
}
const UserItem = (
    {
        id,
        label,
        image
    }: userItemsProps
) => {
    const workspaceId = useGetWorkspaceId()
    const avatartFallback = label?.charAt(0).toUpperCase()
    return (
        <Button
            asChild
            variant={null}
            className='mt-4 w-full flex justify-start '
        >
            <Link href={`/workspace/${workspaceId}/member/${id}`}
                className=' flex items-center gap-2'
            >

                <Avatar>
                    <AvatarImage src={image} />
                    <AvatarFallback>{avatartFallback}</AvatarFallback>
                </Avatar>

                <span className=' text-muted-foreground'>{label}</span>

            </Link>
        </Button>
    )
}

export default UserItem