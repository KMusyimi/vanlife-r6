import Nav from './Nav'
import {createContext, useState} from "react";
import {decode} from "html-entities";
import {Link} from "react-router-dom";


const PathContext = createContext(null);

function Header() {
    const [paths] = useState([
        {
            path: '/about',
            name: 'About',
        }, {
            path: '/vans',
            name: 'Vans',
        }]);
    function handleClick() {
        document.querySelectorAll('.header a').forEach((el) => {
            el.classList.remove('active');
        });
    }
    return (
        <header className='header'>
            <h1 className='logo'><Link to='/' onClick={handleClick}>{decode('&#35;VanLife')}</Link></h1>
            <PathContext.Provider value={paths}>
                <Nav/>
            </PathContext.Provider>
        </header>)
}

export default Header;
export {PathContext}
