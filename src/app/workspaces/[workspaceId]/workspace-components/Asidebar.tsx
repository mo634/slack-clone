import UserButton from '@/components/auth/auth-components/user-button'
import React from 'react'
import WorkSpaceSwitcher from './WorkSpaceSwitcher.jsx'


const Asidebar = () => {
    return (
        <aside className=' h-full bg-[#481349] text-white p-3'>
            <div className=" flex flex-col  h-full justify-between items-center">

                <div className="">
                    <WorkSpaceSwitcher />
                </div>

                <div className="">
                    <UserButton />
                </div>

            </div>
        </aside>
    )
}

export default Asidebar