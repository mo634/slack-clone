// src/hooks/useUserInfo.ts
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

type UseUserInfoReturnType = {
    data: any | null;
    isLoading: boolean;
};

export function useUserInfo(): UseUserInfoReturnType {
    // Fetch the user data
    const data = useQuery(api.users.getUserInfo);

    // Determine loading state
    const isLoading = data === undefined;

    return { data, isLoading };
}
