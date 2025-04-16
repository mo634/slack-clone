import { Button } from '@/components/ui/button'
import { useGetWorkspaceId } from '@/components/workspaces/hooks/use-get-workspace-id'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import React, { use } from 'react'
import { IconType } from 'react-icons/lib'

interface SidebarItmesProps {
    label: string,
    icon: LucideIcon | IconType,
    id: string
    isActive?: boolean
}
const SidebarItmes = (
    {
        label,
        icon: Icon,
        id,
        isActive
    }: SidebarItmesProps
) => {
    const workspaceId = useGetWorkspaceId()


    return (

        <Button className={cn(" ml-2 mt-3 w-[80%] flex justify-start ", isActive && "bg-[#2196f3] text-white")}
            variant={null}
        >

            <Link href={`/workspaces/${workspaceId}/channel/${id}`}
                className='flex  items-center gap-2'
            >

                <Icon size={15} />

                <span className=''>{label}</span>

            </Link>

        </Button>
    )
}

export default SidebarItmes