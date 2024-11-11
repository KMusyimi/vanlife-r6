import './App.css'
import './spinkit.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Home from './views/Home.jsx'
import About from './views/About.jsx'
import Vans, {loader as vansLoader} from './views/vans/Vans.jsx'
import VanDetails from './views/vans/VanDetails.jsx'
import Layout from "./components/Layout.jsx";
import Dashboard from "./views/host/Dashboard.jsx";
import Income from "./views/host/Income.jsx";
import Reviews from "./views/host/Reviews.jsx";
import HostLayout from "./components/HostLayout.jsx";
import HostVans from "./views/host/HostVans.jsx";
import HostVanInfo from "./views/host/HostVanInfo.jsx";
import HostVanPricing from "./views/host/HostVanPricing.jsx";
import HostVanPhotos from "./views/host/HostVanPhotos.jsx";
import HostVanDetails from "./views/host/HostVanDetails.jsx";
import NotFound from "./views/404.jsx";
import Login from "./views/Login.jsx";
import AuthRequired from "./components/AuthRequired.jsx";
import Error from "./components/Error.jsx";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='about' element={<About/>}/>
        <Route path='vans' element={<Vans/>} loader={vansLoader} errorElement={<Error/>}/>
        <Route path='vans/:id' element={<VanDetails/>}/>
        <Route path='login' element={<Login/>}/>
        <Route element={<AuthRequired/>}>
            <Route path='host' element={<HostLayout/>}>
                <Route index element={<Dashboard/>}/>
                <Route path='income' element={<Income/>}/>
                <Route path='vans' element={<HostVans/>}/>
                <Route path='vans/:id' element={<HostVanDetails/>}>
                    <Route index element={<HostVanInfo/>}/>
                    <Route path='pricing' element={<HostVanPricing/>}/>
                    <Route path='photos' element={<HostVanPhotos/>}/>
                </Route>
                <Route path='reviews' element={<Reviews/>}/>
            </Route>
        </Route>
        <Route path='*' element={<NotFound/>}/>
    </Route>
))

function App() {
    return (
        <RouterProvider router={router}/>
    )
}


export default App
