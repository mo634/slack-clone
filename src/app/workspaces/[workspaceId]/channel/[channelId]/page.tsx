"use client"

import { getChannel } from '@/components/channels/api/use-get-channel'
import { useGetChannelId } from '@/components/workspaces/hooks/use-get-channel-id'
import { Loader, TriangleAlert } from 'lucide-react'
import React from 'react'
import Header from './Header'
import ChatInput from './ChatInput'


const page = () => {
    const channelId = useGetChannelId()
    const { data: channelData, isLoading: channelLoading } = getChannel({ channelId })

    if (channelLoading) {
        return (
            <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
                <Loader className="size-8 animate-spin text-muted-foreground" />
            </div>
        )
    }

    if (!channelData) {
        return (
            <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">

                <TriangleAlert className="size-10 text-muted-foreground" />

                <span className="text-sm text-muted-foreground">
                    Channel not found
                </ span>

            </div>
        )
    }

    console.log("channelData", channelData.name)

    return (
        <div className="h-full flex flex-col justify-between">
            <Header
                title={channelData.name}
            />
            <ChatInput/>
        </div>
    )
}

export default page