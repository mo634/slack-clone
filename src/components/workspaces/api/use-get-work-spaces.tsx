import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

type UseWorkSpacesReturnType = {
    data: any | null;
    isLoading: boolean;
};

export function useWorkSpaces(): UseWorkSpacesReturnType {

    const workSpaces = useQuery(api.workspaces.getWorkSpaces);

    const isLoading = workSpaces === undefined; // Check if data is still loading

    return {
        data: workSpaces || [], // Provide fetched data or an empty array as fallback
        isLoading,
    };
}