import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const schema = defineSchema({
        ...authTables,

        workSpaces:defineTable({
            name:v.string(),
            userId:v.id("users"),
            joinCode:v.string()
        })

        ,

        member:defineTable({
            userId:v.id("users"),
            workspaceId:v.id("workSpaces"),
            role:v.union(v.literal("admin"),v.literal("member"))
        }).index("by_user_id",["userId"]).index("by_workspace_id",["workspaceId"]).index("by_workspace_user_id",["workspaceId","userId"])
,
        // create channel table 


        channel:defineTable({
            name:v.string(), 
            workspaceId:v.id("workSpaces")
        }).index("by_workspace_id",["workspaceId"])


});

export default schema;