import { getAuthUserId } from "@convex-dev/auth/server";
import { query } from "./_generated/server";
export const getUserInfo = query({
    args: {},
    handler: async (ctx) => {
    
        try {
            console.log(" ***********context query started*********** ");
            const userId = await getAuthUserId(ctx);

            if (userId === null) {
                console.log("No authenticated user.");
                return null;
            }

            const user = await ctx.db.get(userId);
            console.log(" *****context query ended ******* ");
            return user;
            
        } catch (error) {
            console.error("Error fetching user info:", error);
            throw new Error("Failed to fetch user information.");
        }
    },
});
