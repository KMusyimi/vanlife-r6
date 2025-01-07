import './App.css'
import './spinkit.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Home from './views/Home.jsx'
import About from './views/About.jsx'
import Vans, {loader as vansLoader} from './views/vans/Vans.jsx'
import VanDetails, {vanDetailsLoader} from './views/vans/VanDetails.jsx'
import Layout from "./components/Layout.jsx";
import Dashboard from "./views/host/Dashboard.jsx";
import Income from "./views/host/Income.jsx";
import Reviews from "./views/host/Reviews.jsx";
import HostLayout from "./components/HostLayout.jsx";
import HostVans, {hostVansLoader} from "./views/host/HostVans.jsx";
import HostVanInfo from "./views/host/HostVanInfo.jsx";
import HostVanPricing from "./views/host/HostVanPricing.jsx";
import HostVanPhotos from "./views/host/HostVanPhotos.jsx";
import HostVanDetails, {hostVanDetailsLoader} from "./views/host/HostVanDetails.jsx";
import NotFound from "./views/404.jsx";
import Login, {loginAction, loginLoader} from "./views/Login.jsx";
import Error from "./components/Error.jsx";
import {requireAuth} from "./utils.js";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='about' element={<About/>}/>
        <Route path='vans' element={<Vans/>} loader={vansLoader} errorElement={<Error/>}/>
        <Route path='vans/:id' element={<VanDetails/>} loader={vanDetailsLoader} errorElement={<Error/>}/>
        <Route path='login' element={<Login/>} loader={loginLoader} action={loginAction}/>

        <Route path='host' element={<HostLayout/>}>
            <Route index element={<Dashboard/>}
                   loader={async ({request}) => await requireAuth(request)}/>
            <Route path='income' element={<Income/>}
                   loader={async ({request}) => await requireAuth(request)}/>

            <Route path='vans' element={<HostVans/>}
                   loader={hostVansLoader}/>
            <Route path='vans/:id' element={<HostVanDetails/>} loader={hostVanDetailsLoader}>
                <Route index element={<HostVanInfo/>}
                       loader={async ({request}) => await requireAuth(request)}/>
                <Route path='pricing' element={<HostVanPricing/>}
                       loader={async ({request}) => await requireAuth(request)}/>
                <Route path='photos' element={<HostVanPhotos/>}
                       loader={async ({request}) => await requireAuth(request)}/>
            </Route>
            <Route path='reviews' element={<Reviews/>}
                   loader={async ({request}) => await requireAuth(request)}/>
        </Route>
        <Route path='*' element={<NotFound/>}/>
    </Route>), {
    future: {
        v7_relativeSplatPath: true,
        v7_normalizeFormMethod: true,
        v7_fetcherPersist: true,
        v7_partialHydration: true,
        v7_skipActionStatusRevalidation: true,
    }
})

function App() {
    return (<RouterProvider router={router} future={{v7_startTransition: true}}/>)
}


export default App
