"use client"
import { getWorkspace } from '@/components/workspaces/api/use-get-workspace'
import { useGetWorkspaceId } from '@/components/workspaces/hooks/use-get-workspace-id'


interface workSpaceIdPageProps {
    params: {
        workspaceId: string
    }
}



const page = () => {
    const workSpaceId = useGetWorkspaceId()
    const { data, isLoading } = getWorkspace({ id: workSpaceId })

    // const { data, isLoading } = getWorkspace({ id: workSpaceId })
    return (
        <div>
            work space id page
        </div>
    )
}

export default page