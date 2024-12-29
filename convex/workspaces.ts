    import { v } from "convex/values";
    import { query,mutation } from "./_generated/server";
import { auth } from "./auth";
import { getAuthUserId } from "@convex-dev/auth/server";

const generateCode = () => {
    const code = Array.from(
        {
            length:6
        },
        ()=>{
            "0123456789abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random()*36)]
        }
    ).join("");
    return code
}
    export const createWorkspace = mutation({
    args: {
        name: v.string(),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx); 

        if (!userId) {
        throw new Error("User must be authenticated to create a workspace.");
        }

        const joinCode =generateCode();
        
        const workspaceId = await ctx.db.insert("workSpaces", {
        name : args.name,
        userId,
        joinCode,
        });

        // create member 
        await ctx.db.insert("member",{
            userId,
            workspaceId,
            role:"admin"
        })

        // create channel
        await ctx.db.insert("channel",{
            name:"general",
            workspaceId
        })

        return workspaceId;
    },
    });


    export const getWorkSpaces = query({
        args: {},
        handler: async (ctx) => {
            const userId = await getAuthUserId(ctx);
            if(!userId){    
                return [];
            }

            const members= await ctx.db.query("member").withIndex("by_user_id",(q) => q.eq("userId",userId)).collect();

            const workspaceIds = members.map((member) => member.workspaceId);
            const workspaces= []
            for(const workspaceId of workspaceIds){
                const workspace = await ctx.db.get(workspaceId);
                if(workspace){
                    workspaces.push(workspace);
                }
            }
            return workspaces
        },
    });

export const getWorkspace = query({
    args :{id: v.id("workSpaces")},
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);

        if(!userId){
            throw new Error("User must be authenticated ");
        }

        const member  = await ctx.db.query("member")
        .withIndex("by_workspace_user_id",(q) =>
                q.eq("workspaceId",args.id).eq("userId",userId)).unique();

        if(!member){
            return null
        }
        
        return await ctx.db.get(args.id);

    }
});

export const updateWorkspace = mutation({
    args: {
        id: v.id("workSpaces"),
        name: v.string(),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);

        if(!userId){
            throw new Error("User must be authenticated ");
        }

        const member  = await ctx.db.query("member")
        .withIndex("by_workspace_user_id",(q) =>
                q.eq("workspaceId",args.id).eq("userId",userId)).unique();

        if(!member || member.role !== "admin"){
            throw new Error("User must be admin to update workspace");
        }

        await ctx.db.patch(args.id, {
            name: args.name,
        });

        return args.id;
    },
});
export const removeWorkspace = mutation({
    args: {
        id: v.id("workSpaces"),

    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);

        if(!userId){
            throw new Error("User must be authenticated ");
        }

        const member  = await ctx.db.query("member")
        .withIndex("by_workspace_user_id",(q) =>
                q.eq("workspaceId",args.id).eq("userId",userId)).unique();

        if(!member || member.role !== "admin"){
            throw new Error("User must be admin to update workspace");
        }

        const [members] =await Promise.all([
            ctx.db.query("member").withIndex("by_workspace_id",(q)=>q.eq("workspaceId",args.id)).collect(),
            
        ])

        for(const member of members){
            await ctx.db.delete(member._id);
        }

        await ctx.db.delete(args.id);

        return args.id;
    },
});