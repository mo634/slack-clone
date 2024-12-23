import { getCurrentMember } from '@/components/members/api/use-get-current-member'
import { ResizablePanel } from '@/components/ui/resizable'
import { getWorkspace } from '@/components/workspaces/api/use-get-workspace'
import { useGetWorkspaceId } from '@/components/workspaces/hooks/use-get-workspace-id'
import { AlertTriangle, Loader } from 'lucide-react'
import WorkSpaceLeftSideHeader from './WorkSpaceLeftSideHeader'


const WorkSpaceLeftSide = () => {
    // const worksacpeId
    const worksacpeId = useGetWorkspaceId()
    const { data: memberData, isLoading: memberLoading } = getCurrentMember({ workspaceId: worksacpeId })
    const { data: workspaceData, isLoading: workspaceLoading } = getWorkspace({ id: worksacpeId })

    if (memberLoading || workspaceLoading) {
        return (
            <div className=" h[100vh] w-[100%] flex items-center justify-center">
                <Loader className=' animate-spin text-mainColor size-20' />
            </div>
        )
    }

    if (!workspaceData) {
        return (
            <div className=" h[100vh] w-[100%] flex flex-col items-center justify-center">
                <AlertTriangle className=' text-mainColor size-20' />
                <p className='text-xl'>work space not found </p>
            </div>
        )
    }

    return (
        <ResizablePanel
            defaultSize={20}
            minSize={12}
            className='p-4 bg-[#c9c9c96b]'
        >

            <WorkSpaceLeftSideHeader
                Data={workspaceData}
                isAdmin={memberData?.role === "admin"}
            />

        </ResizablePanel>
    )
}

export default WorkSpaceLeftSide