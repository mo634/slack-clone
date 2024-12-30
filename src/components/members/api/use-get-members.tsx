import { useQuery } from "convex/react"
import { Id } from "../../../../convex/_generated/dataModel"
import { api } from "../../../../convex/_generated/api"

interface UseGetMembersProps {
    workspaceId: Id<"workSpaces">
}
export const getMembers = ({ workspaceId }: UseGetMembersProps) => {
    const data = useQuery(api.member.getMember, { id: workspaceId })

    const isLoading = data === undefined


    return {
        data,
        isLoading
    }

}