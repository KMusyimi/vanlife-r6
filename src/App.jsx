import './App.css'
import './spinkit.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './views/Home.jsx'
import About from './views/About.jsx'
import Vans from './views/vans/Vans.jsx'
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

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path='/' element={<Layout/>}>
                        <Route index element={<Home/>}/>
                        <Route path='about' element={<About/>}/>
                        <Route path='vans' element={<Vans/>}/>
                        <Route path='vans/:id' element={<VanDetails/>}/>
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
                        <Route path='*' element={<NotFound/>}/>
                    </Route>
                </Routes>
            </Router>
        </>
    )
}


export default App
