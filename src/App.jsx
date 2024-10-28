import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './views/Home.jsx'
import About from './views/About.jsx'
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

function App() {
    return (
        <>
            <Router>
                <Header/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/about' element={<About/>}/>
                </Routes>
            </Router>
            <Footer/>
        </>
    )
}


export default App
