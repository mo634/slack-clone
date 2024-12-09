
import { getWorkspace } from '@/components/workspaces/api/use-get-workspace'
import { useGetWorkspaceId } from '@/components/workspaces/hooks/use-get-workspace-id'
import { Info, Search } from 'lucide-react'
import React from 'react'

const Toolbar = () => {
    const workSpaceId = useGetWorkspaceId()
    const { data, isLoading } = getWorkspace({ id: workSpaceId })
    return (
        <nav className='bg-[#481349] text-white flex py-4'>
            <div className="h-8 w-full  flex items-center justify-center px-4 ">

                <div className='ml-[30%] bg-accent/20 w-[50%] rounded-md p-3'>
                    <div className="flex items-center ">
                        <Search className='mr-2' />
                        <span className='capitalize line-clamp-1'>Search Code </span>
                        <span className=''>{data?.name}</span>
                    </div>
                </div>

                <Info className='ml-auto' />
            </div>
        </nav>
    )
}

export default Toolbar