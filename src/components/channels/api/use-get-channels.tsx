import { useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel"
import { api } from "../../../../convex/_generated/api";

interface UseGetChannelsProps {
    workspaceId: Id<"workSpaces">
}
export const getChannels = ({ workspaceId }: UseGetChannelsProps) => {

    const data = useQuery(api.channel.getChannel, { id: workspaceId });

    const isLoading = data === undefined

    return {
        data,
        isLoading
    }
}