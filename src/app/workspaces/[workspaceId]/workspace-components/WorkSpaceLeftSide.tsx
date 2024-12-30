import { getCurrentMember } from '@/components/members/api/use-get-current-member'
import { ResizablePanel } from '@/components/ui/resizable'
import { getWorkspace } from '@/components/workspaces/api/use-get-workspace'
import { useGetWorkspaceId } from '@/components/workspaces/hooks/use-get-workspace-id'
import { AlertTriangle, HashIcon, Loader, MessageSquareText, SendHorizonal } from 'lucide-react'
import WorkSpaceLeftSideHeader from './WorkSpaceLeftSideHeader'
import SidebarItmes from './SidebarItmes'
import WorkspaceSection from './WorkspaceSection'
import { getChannels } from '@/components/channels/api/use-get-channels'
import { getMembers } from '@/components/members/api/use-get-members'
import UserItem from './UserItem'


const WorkSpaceLeftSide = () => {
    // const worksacpeId
    const worksacpeId = useGetWorkspaceId()

    const { data: memberData, isLoading: memberLoading } = getCurrentMember({ workspaceId: worksacpeId })

    const { data: workspaceData, isLoading: workspaceLoading } = getWorkspace({ id: worksacpeId })

    const { data: membersData, isLoading: membersLoading } = getMembers({ workspaceId: worksacpeId })

    const { data: channelData, isLoading: channelLoading } = getChannels({ workspaceId: worksacpeId })
    if (memberLoading || workspaceLoading) {
        return (
            <div className=" h[100vh] w-[100%] flex items-center justify-center">
                <Loader className=' animate-spin text-mainColor size-20' />
            </div>
        )
    }

    if (!workspaceData) {
        return (
            <div className=" h[100vh] flex flex-col items-center justify-center p-4 bg-[#c9c9c96b]">
                <AlertTriangle className=' text-mainColor size-12' />
                <p className='text-xl'>work space not found </p>
            </div>
        )
    }

    return (
        <ResizablePanel
            defaultSize={20}
            minSize={12}
            className='p-[1%] bg-[#c9c9c96b] '

        >

            <WorkSpaceLeftSideHeader
                Data={workspaceData}
                isAdmin={memberData?.role === "admin"}
            />

            {/*start  side-bar items */}
            <SidebarItmes
                label="threads"
                icon={MessageSquareText}
                id="threads"
            />

            <SidebarItmes
                label="Drafts & Sent"
                icon={SendHorizonal}
                id="drafts"
            />
            {/*end  side-bar items */}

            {/*start render workspace channels  */}
            <WorkspaceSection
                label="Channels"
                hint="New Channel"
                onNew={() => { }}
            >
                {
                    channelData?.map((channelItem) => (
                        <SidebarItmes
                            key={channelItem._id}
                            label={channelItem.name}
                            icon={HashIcon}
                            id={channelItem._id}
                        />
                    ))
                }
            </WorkspaceSection>
            {/*end render workspace channels  */}

            {/* start render workspace members */}
            <WorkspaceSection
                label="members"
                hint="New member"
                onNew={() => { }}
            >
                {
                    membersData?.map((memberItem) => (
                        <UserItem
                            key={memberItem._id}
                            id={memberItem._id}
                            label={memberItem.user.name}
                            image={memberItem.user.image}
                        />

                    ))
                }

            </WorkspaceSection>
            {/* end render workspace members */}


        </ResizablePanel>
    )
}

export default WorkSpaceLeftSide