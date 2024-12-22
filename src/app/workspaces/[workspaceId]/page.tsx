"use client"
import { getWorkspace } from '@/components/workspaces/api/use-get-workspace'
import { useGetWorkspaceId } from '@/components/workspaces/hooks/use-get-workspace-id'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"

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
        <div className=' w-[100vw]'>
            <ResizablePanelGroup direction="horizontal"
                autoSave='workspace-size'
            >
                {/* left side */}
                <ResizablePanel
                    defaultSize={20}
                    minSize={12}
                >One</ResizablePanel>

                <ResizableHandle />

                {/* right side */}
                <ResizablePanel
                    defaultSize={80}
                    minSize={12}
                >Two</ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}

export default page