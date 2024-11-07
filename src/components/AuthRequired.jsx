import {Navigate, Outlet} from "react-router-dom";

export default function AuthRequired() {
    const isLoggedIn = localStorage.getItem('loggedIn');
    return isLoggedIn ? <Outlet/> : <Navigate
        to='login'
        state={{message: 'You must be logged in first'}}
        replace={true}
    />
}