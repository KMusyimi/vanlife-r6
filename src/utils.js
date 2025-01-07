import {redirect} from "react-router-dom";
// The body can be assigned a value in the utility function because the response is fake.
// If moving away from mirage to some server and db implementation,
// that code should be removed along with the fake server import in your application and the actual
// redirect from React router should be used. A body is a read-only
// stream and the above code will error if trying to assign a value to the body of a real response.
export function mutateResponse(path) {
    //redirect returns the patch response
    let response = redirect(path);
    //body can be anything but undefined
    response.body = true;
    return response
}

export async function requireAuth(request) {
    const isLoggedIn = localStorage.getItem('loggedIn');
    const pathname = new URL(request.url).pathname
    if (!isLoggedIn) {
        throw mutateResponse(`/login?message=You must be logged in&&redirect=${pathname}`);
    }
    return null;
}