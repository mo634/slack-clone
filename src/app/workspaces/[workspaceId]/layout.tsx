"use client"
import React from 'react'
import Toolbar from './workspace-components/Toolbar'

import Asidebar from './workspace-components/Asidebar'


const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <main className=' h-full ' >
            <Toolbar />
            <div className="h-[calc(100vh-64px)] flex">
                <Asidebar />
                {children}
            </div>
        </main>
    )
}

export default layout