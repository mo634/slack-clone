import { Button } from '@/components/ui/button'
import { useGetWorkspaceId } from '@/components/workspaces/hooks/use-get-workspace-id'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { IconType } from 'react-icons/lib'

interface SidebarItmesProps {
    label: string,
    icon: LucideIcon | IconType,
    id: string
}
const SidebarItmes = (
    { label,
        icon: Icon,
        id
    }: SidebarItmesProps
) => {
    const workspaceId = useGetWorkspaceId()
    return (

        <Button className=' mt-3 w-full flex justify-start '
            variant={null}
        >

            <Link href={`/workspace/${workspaceId}/channel/${id}`}
                className='flex  items-center gap-2'
            >

                <Icon size={15} />

                <span className=''>{label}</span>

            </Link>

        </Button>
    )
}

export default SidebarItmes