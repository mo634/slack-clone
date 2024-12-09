import { DropdownMenu, DropdownMenuContent } from '@/components/ui/dropdown-menu'
import { useWorkSpaces } from '@/components/workspaces/api/use-get-work-spaces'
import CreateWorkSpacesModal from '@/components/workspaces/components/create-work-spaces-modal'
import { useGetWorkspaceId } from '@/components/workspaces/hooks/use-get-workspace-id'
import { DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import React from 'react'
import { modalOpenAtom } from '@/components/workspaces/store/modalAtom'
import { useAtom } from 'jotai'
import { Loader, Plus } from 'lucide-react'
import { getWorkspace } from '@/components/workspaces/api/use-get-workspace'
import { useRouter } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
const WorkSpaceSwitcher = () => {
    const router = useRouter()
    const workSpaceId = useGetWorkspaceId()
    const [_isOpen, setIsOpen] = useAtom(modalOpenAtom)
    const { data: workSpaces, isLoading: workSpacesLoading } = useWorkSpaces()
    const { data: workSpace, isLoading: workSpaceLoading } = getWorkspace({ id: workSpaceId })


    const filteredWorkSpaces = workSpaces?.filter(
        (workSpace) => workSpace?._id !== workSpaceId
    )

    const handleOpen = () => {
        setIsOpen(true)

    }



    return (
        <section>

            <DropdownMenu>

                <DropdownMenuTrigger>
                    <p className="text-lg bg-[#ABABAD] hover:bg-[#ABABAD] rounded-full h-10 w-10 flex items-center justify-center">
                        {
                            workSpaceLoading ? (
                                <Loader className=' size-5 animate-spin' />
                            ) : (
                                workSpace?.name[0].toUpperCase()
                            )
                        }
                    </p>
                </DropdownMenuTrigger>

                <DropdownMenuContent side='bottom' align='start'
                    className=' p-3'
                >
                    <DropdownMenuItem
                        onClick={() => router.push(`/workspaces/${workSpaceId}`)}
                        className='rounded-md flex-col cursor-pointer hover:outline-none hover:bg-[#eee] transition duration-300'>
                        <p className=' font-bold'>{
                            workSpace?.name
                        }</p>
                        <p className=' capitalize text-[.8rem]'>Active WorkSpace</p>
                    </DropdownMenuItem>


                    {
                        filteredWorkSpaces?.map((workSpace) => (
                            <DropdownMenuItem
                                key={workSpace._id}
                                onClick={() => router.push(`/workspaces/${workSpace._id}`)}
                                className=' flex-col my-2 p-2 rounded-md  cursor-pointer hover:outline-none hover:bg-[#eee] transition duration-300'>
                                <div className="flex items-center">
                                    <p className=" mr-2 text-lg bg-[#ABABAD] hover:bg-[#ABABAD] rounded-full h-10 w-10 flex items-center justify-center">
                                        {
                                            workSpace?.name[0].toUpperCase()
                                        }
                                    </p>
                                    <p className=' font-bold'>{workSpace.name}</p>
                                </div>
                                <Separator className=' mt-2' />
                            </DropdownMenuItem>
                        ))
                    }


                    <DropdownMenuItem
                        onClick={handleOpen}
                        className='rounded-md p-2 mt-1 flex cursor-pointer hover:outline-none hover:bg-[#eee] transition duration-300'>
                        <Plus />
                        <span>Create New Workspace</span>
                    </DropdownMenuItem>


                </DropdownMenuContent>

            </DropdownMenu>

        </section>
    )
}

export default WorkSpaceSwitcher