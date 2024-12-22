"use client"
import { getWorkspace } from '@/components/workspaces/api/use-get-workspace'
import { useGetWorkspaceId } from '@/components/workspaces/hooks/use-get-workspace-id'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import WorkSpaceLeftSide from './workspace-components/WorkSpaceLeftSide'

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
        <div className=' w-[100vw] p-4'>
            <ResizablePanelGroup direction="horizontal"
                autoSave='workspace-size'
            >
                {/* left side */}

                <WorkSpaceLeftSide />

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