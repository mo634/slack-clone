"use client"
import React, { useState, useEffect } from 'react'
import CreateWorkSpacesModal from './workspaces/components/create-work-spaces-modal'

const Models = () => {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return
    return (
        <>
            <CreateWorkSpacesModal />
        </>
    )
}

export default Models