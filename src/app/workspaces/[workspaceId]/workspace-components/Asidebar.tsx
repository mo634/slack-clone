import UserButton from '@/components/auth/auth-components/user-button'
import React from 'react'
import WorkSpaceSwitcher from './WorkSpaceSwitcher.jsx'
import SidebarIcons from './SidebarIcons'
import { Bell, Home, MessageSquare, MoreHorizontal } from 'lucide-react'


const Asidebar = () => {
    return (
        <aside className=' h-full bg-secondaryColor text-white p-3'>
            <div className=" flex flex-col  h-full justify-between items-center">
                <div className="">
                    <div className="">
                        <WorkSpaceSwitcher />
                    </div>

                    <SidebarIcons icon={Home} label="Home" isActive={true} />
                    <SidebarIcons icon={MessageSquare} label="DMs" isActive={false} />
                    <SidebarIcons icon={Bell} label="Activity" isActive={false} />
                    <SidebarIcons icon={MoreHorizontal} label="More" isActive={false} />
                    
                </div>

                <div className="">
                    <UserButton />
                </div>

            </div>
        </aside>
    )
}

export default Asidebar