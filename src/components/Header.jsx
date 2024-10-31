import Nav from './Nav'
import {decode} from "html-entities";
import {NavLink} from "react-router-dom";
import {useId} from "react";


function Header() {
    const id = useId();

    const navLinks = () => {
        const endpoints = ['host', 'about', 'vans'];
        return endpoints.map((path, idx) => {
            return (
                <li key={`link-${id}-${idx + 1}`}>
                    <NavLink className={
                        ({isActive}) => isActive ? 'nav-link active' : 'nav-link'}
                             to={`/${path}`}>{path}</NavLink>
                </li>
            )
        })
    }
    return (
        <header className='header'>
            <h1 className='logo'>
                <NavLink to='/'>{decode('&#35;VanLife')}</NavLink>
            </h1>
            <Nav className={'nav header-nav'}>{navLinks()}</Nav>
        </header>)
}

export default Header;
