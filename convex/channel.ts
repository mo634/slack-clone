import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const createChannel = mutation({
    args: {
        name: v.string(),
        workspaceId: v.id("workSpaces"),
    },
    handler: async (ctx, args) => {

        const userId = await getAuthUserId(ctx);

        if(!userId){
            throw new Error("User must be authenticated");
        }

        const member  = await ctx.db.query("member")
        .withIndex("by_workspace_user_id",(q) =>
                q.eq("workspaceId",args.workspaceId).eq("userId",userId)).unique();

        if(!member || member.role !== "admin") {
            throw new Error("User must be admin to create channel");
        }

        const channelId = await ctx.db.insert("channel",{
            name:args.name,
            workspaceId:args.workspaceId,
        });

        return channelId
    },
})


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

export const getChannelById = query({
    args :{id: v.id("channel")},
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);

        if(!userId) return null

        const channel = await ctx.db.get(args.id);
        if(!channel) return null

        const member = await ctx.db.query("member")
        .withIndex("by_workspace_user_id",(q) =>
                q.eq("workspaceId",channel.workspaceId).eq("userId",userId)).unique();

        if(!member) return null

        return channel
    }

}

)