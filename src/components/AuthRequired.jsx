import {Outlet, Navigate} from "react-router-dom";

export default function AuthRequired() {
    const authenticated = false;
    return authenticated ? <Outlet/> : <Navigate to='login'/>
}