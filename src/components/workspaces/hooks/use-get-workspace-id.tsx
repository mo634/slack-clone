
import { useParams } from "next/navigation"
import { Id } from "../../../../convex/_generated/dataModel"
export const useGetWorkspaceId = () => {
    const params = useParams()
    console.log(params.workspaceId)

    return params.workspaceId as Id<"workSpaces">
}