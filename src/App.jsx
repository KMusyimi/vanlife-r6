import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './views/Home.jsx'
import About from './views/About.jsx'
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Vans from './views/Vans.jsx'

function App() {
    return (
        <>
            <Router>
                <Header/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/about' element={<About/>}/>
                    <Route path='/vans' element={<Vans/>}/>
                </Routes>
            </Router>
            <Footer/>
        </>
    )
}


export default App
