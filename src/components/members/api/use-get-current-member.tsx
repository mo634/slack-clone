import { useQuery } from "convex/react"
import { Id } from "../../../../convex/_generated/dataModel"
import { api } from "../../../../convex/_generated/api"

interface UseGetCurrentMemberProps {
    workspaceId: Id<"workSpaces">
}
export const getCurrentMember = ({ workspaceId }: UseGetCurrentMemberProps) => {
    const data = useQuery(api.member.currentMember, { id: workspaceId })

    const isLoading = data === undefined


    return {
        data,
        isLoading
    }

}