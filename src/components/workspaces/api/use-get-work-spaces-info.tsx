import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

type UseWorkSpacesReturnType = {
    data: any | null;
    isLoading: boolean;
};
type useWorkSpacesInfoProps = {
    id: Id<"workSpaces">;
}


export function useWorkSpacesInfo({ id }: useWorkSpacesInfoProps): UseWorkSpacesReturnType {

    const workSpaces = useQuery(api.workspaces.getInfobyId, { id });

    const isLoading = workSpaces === undefined; // Check if data is still loading

    return {
        data: workSpaces || [], // Provide fetched data or an empty array as fallback
        isLoading,
    };
}