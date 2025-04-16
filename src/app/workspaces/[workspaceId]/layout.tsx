"use client"
import React from 'react'
import Toolbar from './workspace-components/Toolbar'
import Asidebar from './workspace-components/Asidebar'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import WorkSpaceLeftSide from './workspace-components/WorkSpaceLeftSide'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className=' h-full ' >
            <Toolbar />
            <div className="h-[calc(100vh-64px)] flex">
                <Asidebar />
                <div className=' w-[100vw]'>
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
                        >{children}</ResizablePanel>
                    </ResizablePanelGroup>
                </div>
            </div>
        </main>
    )
}

export default layout