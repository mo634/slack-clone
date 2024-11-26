import { query } from "./_generated/server";

export const getWorkSpaces = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("workSpaces").collect();
    },
});