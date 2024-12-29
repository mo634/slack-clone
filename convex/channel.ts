import { v } from "convex/values";
import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getChannel = query({
    args :{id: v.id("workSpaces")},
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);

        if(!userId) return []

        const member  = await ctx.db.query("member")
        .withIndex("by_workspace_user_id",(q) =>
                q.eq("workspaceId",args.id).eq("userId",userId)).unique();

        if(!member) return []

        const channels = await ctx.db.query("channel")
        .withIndex("by_workspace_id",(q) => q.eq("workspaceId",args.id)).collect();

        return channels
    },

})