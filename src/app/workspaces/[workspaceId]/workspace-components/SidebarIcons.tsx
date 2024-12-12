import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import React from 'react'
import { IconType } from 'react-icons/lib'

interface SidebarIconsProps {
    icon: LucideIcon | IconType,
    label: string,
    isActive?: boolean
}
const SidebarIcons = ({ icon: Icon, label, isActive }: SidebarIconsProps) => {
    return (
        <div className=' mt-4 flex-col '>

            <div
                className={cn(
                    "px-2 rounded-md p-2 flex items-center justify-center cursor-pointer  hover:scale-110 transition-all",
                    isActive ?
                        "bg-background text-secondaryColor "
                        :
                        ""
                )

                }
            >
                <Icon />
            </div>

            <div className='text-center mt-1'>{label}</div>

        </div>
    )
}

export default SidebarIcons