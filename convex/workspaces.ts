    import { v } from "convex/values";
    import { query,mutation } from "./_generated/server";
import { auth } from "./auth";
import { getAuthUserId } from "@convex-dev/auth/server";

    export const createWorkspace = mutation({
    args: {
        name: v.string(),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx); 

        if (!userId) {
        throw new Error("User must be authenticated to create a workspace.");
        }

        const joinCode ="123456"
        
        const workspaceId = await ctx.db.insert("workSpaces", {
        name : args.name,
        userId,
        joinCode,
        });

        return workspaceId;
    },
    });


    export const getWorkSpaces = query({
        args: {},
        handler: async (ctx) => {
            return await ctx.db.query("workSpaces").collect();
        },
    });

export const getWorkspace = query({
    args :{id: v.id("workSpaces")},
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);

        if(!userId){
            throw new Error("User must be authenticated ");
        }

        return await ctx.db.get(args.id);

    }
});