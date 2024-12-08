import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { Id } from "../../../../convex/_generated/dataModel"

interface UseGetWorkSpaceProps {
    id: Id<"workSpaces">
}
export const getWorkspace = ({ id }: UseGetWorkSpaceProps) => {
    const data = useQuery(api.workspaces.getWorkspace, { id })
    const isLoading = data === undefined
    return {
        data,
        isLoading
    }
}