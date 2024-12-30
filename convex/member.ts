
import { v } from "convex/values";
import { query, QueryCtx } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { Id } from "./_generated/dataModel";

const populateUser =(ctx:QueryCtx,id:Id<"users">)=>{
    return ctx.db.get(id)
}

export const getMember = query({
    args:{ id:v.id("workSpaces")},
    handler:async (ctx, args) => {
        const userId = await getAuthUserId(ctx);

        if(!userId){
            return [] 
        }

        const member  = await ctx.db.query("member")
        .withIndex("by_workspace_user_id",(q) =>
                q.eq("workspaceId",args.id).eq("userId",userId)).unique();

        if(!member){
            return []
        }

        const data = await ctx.db.query("member")
        .withIndex("by_workspace_id",(q) => q.eq("workspaceId",args.id)).collect();

        const members = []

        for(const member of data){
            const user = await populateUser(ctx,member.userId)

            if(user){

                members.push({
                    ...member,
                    user
                })

            }
        }

        return members
    }
})

export const currentMember  =  query({
    args :{id : v.id("workSpaces")},
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);

        if(!userId){
            return null 
        }

        const member  = await ctx.db.query("member")
        .withIndex("by_workspace_user_id",(q) =>
                q.eq("workspaceId",args.id).eq("userId",userId)).unique();

        if(!member){
            return null
        }
        

        return member
    }
});