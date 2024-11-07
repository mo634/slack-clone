    import {
        convexAuthNextjsMiddleware,
        createRouteMatcher,
        nextjsMiddlewareRedirect,
    } from "@convex-dev/auth/nextjs/server"; 


    const isSignInPage = createRouteMatcher(["/auth"]);

    export default convexAuthNextjsMiddleware(async(request, { convexAuth }) => {
        const authenticated = await convexAuth.isAuthenticated();
        // user must authenticate to access any page 
        if (!isSignInPage(request) && !authenticated) {
            console.log(" not logged in yet ! ")
            return nextjsMiddlewareRedirect(request, "/auth");
        }
        
        // user if authenticated must not access auth page 
        if (isSignInPage(request) && authenticated) {
            console.log("Logged in ")
            return nextjsMiddlewareRedirect(request, "/");
        }
        
        console.log(authenticated)
    });


    export const config = {
    // The following matcher runs middleware on all routes
    // except static assets.
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
    };