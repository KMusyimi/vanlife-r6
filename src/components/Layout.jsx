import {Outlet} from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

// TODO: refactor my code to have main
export default function Layout() {
    return (
        <>
            <Header/>
            {/*main to wrap my outlet*/}
            <Outlet/>
            <Footer/>
        </>
    )
}