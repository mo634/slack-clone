"use client"
interface workSpaceIdPageProps {
    params: {
        workspaceId: string
    }
}

import React, { useEffect } from 'react'
import { toast } from 'sonner'

const page = ({ params }: workSpaceIdPageProps) => {
    return (
        <div>
            {params.workspaceId}
        </div>
    )
}

export default page