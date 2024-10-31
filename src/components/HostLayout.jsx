import {NavLink, Outlet} from "react-router-dom";
import Nav from "./Nav.jsx";

export default function HostLayout() {
    const activeStyles = {
        color: 'hsla(0, 0%, 9%, 1)',
        textDecoration: 'underline',
        textDecorationColor: 'inherit',
        fontWeight: 700
    }
    return (
        <div className='bg-color'>
            <div className='host-container sect-width'>
                <Nav className={'host-nav nav'}>
                    <NavLink
                        to="/host"
                        end
                        style={({isActive}) => isActive ? activeStyles : null}
                    > Dashboard
                    </NavLink>

                    <NavLink
                        to="/host/income"
                        style={({isActive}) => isActive ? activeStyles : null}
                    > Income
                    </NavLink>
                    <NavLink
                        to='/host/vans'
                        style={({isActive}) => isActive ? activeStyles : null}
                    >Vans
                    </NavLink>
                    <NavLink
                        to="/host/reviews"
                        style={({isActive}) => isActive ? activeStyles : null}
                    > Reviews
                    </NavLink>
                </Nav>
                <Outlet/>

            </div>
        </div>
    )
}