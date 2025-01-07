import NavList from "./NavList.jsx";

function Nav({children, ...rest}) {
    return (<nav  {...rest}><NavList className='nav-list'>{children}</NavList></nav>
    )
}

export default Nav;