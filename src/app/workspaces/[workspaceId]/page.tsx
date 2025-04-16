"use client"

import { getChannels } from "@/components/channels/api/use-get-channels"
import { useCreateChannelModal } from "@/components/channels/store/use-create-channel-modal"
import { getCurrentMember } from "@/components/members/api/use-get-current-member"
import { getWorkspace } from "@/components/workspaces/api/use-get-workspace"
import { useGetWorkspaceId } from "@/components/workspaces/hooks/use-get-workspace-id"
import { Loader, TriangleAlert } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useMemo } from "react"
const page = () => {
    const router = useRouter()

    const workspaceId = useGetWorkspaceId()

    const { data: member, isLoading: memberLoading } = getCurrentMember({ workspaceId })

    const [open, setOpen] = useCreateChannelModal()

    const { data: workspaceData, isLoading: workspaceLoading } = getWorkspace({ id: workspaceId })

    const { data: channelData, isLoading: channelLoading } = getChannels({ workspaceId })

    const channelId = useMemo(() => channelData?.[0]?._id, [channelData])

    const isAdmin = useMemo(() => member?.role === 'admin', [member?.role])

    useEffect(() => {

        if (workspaceLoading || channelLoading || !workspaceData || !member || memberLoading) return

        if (channelId) {
            router.push(`/workspaces/${workspaceId}/channel/${channelId}`)
        }

        else if (!open && isAdmin) {
            setOpen(true)
        }
    }, [
        workspaceLoading,
        channelLoading,
        workspaceData,
        channelData,
        router,
        workspaceId,
        channelId,
        open,
        setOpen,
        memberLoading,
        member,
        isAdmin
    ])

    if (workspaceLoading || channelLoading) {
        return (
            <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">
                <Loader className="size-6 animate-spin text-muted-foreground" />
            </div>
        )
    }

    if (!workspaceData) {
        return (
            <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">

                <TriangleAlert className="size-6 animate-spin text-muted-foreground" />

                <span className="text-sm text-muted-foreground">
                    Workspace not found
                </ span>

            </div>
        )

    }

    if (!workspaceData) {
        return (
            <p>workspace not found</p>
        )
    }
    return (
        <div className="h-full flex-1 flex items-center justify-center flex-col gap-2">

            <TriangleAlert className="size-10 text-muted-foreground" />

            <span className="text-sm text-muted-foreground">
                Channel not found
            </ span>

        </div>
    )
}

export default page