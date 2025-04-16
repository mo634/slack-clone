import { useQuery } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel"
import { api } from "../../../../convex/_generated/api";

interface UseGetChannelProps {
    channelId: Id<"channel">
}
export const getChannel = ({ channelId }: UseGetChannelProps) => {

    const data = useQuery(api.channel.getChannelById, { id: channelId });

    const isLoading = data === undefined

    return {
        data,
        isLoading
    }
}