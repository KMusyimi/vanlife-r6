import {Link} from "react-router-dom";
import {useContext, useId, useState} from "react";
import {PathContext} from "./Header.jsx";

function Nav() {
    const id = useId();
    const paths = useContext(PathContext);
    const [active, setActive] = useState(false);
    function handleClick(e){
        setActive(!active);
        console.log('link handle', active)

    }
    return (
        <nav className='nav'>
            <ul className='nav-list'>
                {paths.map((path, idx) => {
                    return <li key={`link-${id}-${idx + 1}`}>
                        <Link className={`nav-link ${active? "active" : ''}`}
                              onClick={handleClick} to={path.path}>{path.name}</Link>
                    </li>
                })}
            </ul>
        </nav>
    )
}

export default Nav;