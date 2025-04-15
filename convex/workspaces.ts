import { v } from "convex/values";
import { query,mutation } from "./_generated/server";
import { auth } from "./auth";
import { getAuthUserId } from "@convex-dev/auth/server";

const generateCode = () => {
const code = Array.from(
    {
        length:6
    },
    ()=>"0123456789abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random()*36)]
).join("");
return code
}

export const createNewJoinCode = mutation({
args:{
    workspaceId:v.id("workSpaces"),

},

handler:async (ctx,args)=>{

    console.log("start")
    const userId = await getAuthUserId(ctx); 
    
    if (!userId) {
    throw new Error("User must be authenticated to create a Join code.");
    }

    const member  = await ctx.db.query("member")
    .withIndex("by_workspace_user_id",(q) =>
            q.eq("workspaceId",args.workspaceId).eq("userId",userId)).unique();

    if(!member || member.role !== "admin"){
        throw new Error("User must be admin to update Join code");
    }

    const joinCode = generateCode();

    

    await ctx.db.patch(args.workspaceId,{joinCode})

    return args.workspaceId
}


})

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

export const getInfobyId  = query({
    args: {
        id: v.id("workSpaces")
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);
        if(!userId){
            return null;
        }

        const member = await ctx.db.query("member").withIndex("by_workspace_user_id",(q) => q.eq("workspaceId",args.id).eq("userId",userId)).unique();

        const workspace = await ctx.db.get(args.id);

        return {
            name : workspace?.name,
            isMember : !!member,
        }
    }
})

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

export const join = mutation({
    args:{
        joinCode:v.string(),
        workspaceId:v.id("workSpaces")
    },
    handler:async (ctx,args) => {
        // get user id
        const userId = await getAuthUserId(ctx);
        if(!userId){
            throw new Error("User must be authenticated to join a workspace");
        }

        // get workspace
        const workspace = await ctx.db.get(args.workspaceId);

        if(!workspace){
            throw new Error("Workspace not found");
        }

        // validate join code
        if(workspace.joinCode !== args.joinCode.toLowerCase()){
            throw new Error("Invalid join code");
        }

        // check if user is already member
        
    const existingMember  = await ctx.db.query("member")
    .withIndex("by_workspace_user_id",(q) =>
        q.eq("workspaceId",args.workspaceId).eq("userId",userId)).unique();
    
    if(existingMember){
        throw new Error("User is already a member of this workspace");
    }

    // create member with member role

    const member = await ctx.db.insert("member",{userId,workspaceId:args.workspaceId,role:"member"});

    return workspace._id;
    }
    
})