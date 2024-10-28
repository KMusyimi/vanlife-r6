import Nav from './Nav'
import {createContext,  useState} from "react";
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

    return (
        <header className='header'>
            <div className='logo'>
                <h1><Link to='/'>{decode('&#35;VanLife')}</Link></h1>
            </div>
            <PathContext.Provider value={paths}>
                <Nav/>
            </PathContext.Provider>
        </header>)
}

export default Header;
export {PathContext}
