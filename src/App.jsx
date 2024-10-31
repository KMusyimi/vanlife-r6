import './App.css'
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
import HostVansDetails from "./views/host/HostVansDetails.jsx";

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
                            <Route path='vans'>
                                <Route index element={<HostVans/>}/>
                                <Route path=':id' element={<HostVansDetails/>}/>
                            </Route>
                            <Route path='reviews' element={<Reviews/>}/>
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </>
    )
}


export default App
