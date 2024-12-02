import { useMutation } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { useCallback } from "react"

type RequestType = any
type Options = {
    onSuccess?: () => void
    onError?: () => void
    onSettled?: () => void
}

export const createWorkSpace = async () => {
    // get the workspace id 
    const mutaion = useMutation(api.workspaces.createWorkspace);

    // start process on workspace doc 

    const mutate = useCallback((valuse: RequestType, options: Options) => {
        try {

        } catch (error) {
            console.error("Error creating workspace:", error);
        } finally {

        }
    }, []);
}