import {Await, Link, NavLink, Outlet, useLoaderData} from "react-router-dom";
import {decode} from "html-entities";
import Nav from "../../components/Nav.jsx";
import {getVan} from "../../api.js";
import {requireAuth} from "../../utils.js";
import {Suspense} from "react";
import Spinner from "../../components/Spinner.jsx";

// eslint-disable-next-line react-refresh/only-export-components
export async function hostVanDetailsLoader({params, request}) {
    await requireAuth(request);
    return {hostVans: getVan(params.id)};
}

export default function HostVanDetails() {
    const vanDetails = useLoaderData();

    const activeStyles = {
        color: 'hsla(0, 0%, 9%, 1)',
        textDecoration: 'underline',
        textDecorationColor: 'inherit',
        fontWeight: 700
    }

    function renderVanDetails(van) {
        const {imageUrl, name, price, type} = van !== null && van;
        return (
            <div className='host-van-info'>
                <figure>
                    <div>
                        <p className={`tag tag-${type}`}>{type}</p>
                        <p className='van-name'>{name}</p>
                        <p className='price-wrapper'><span className='price fw-700'>${price}</span>
                            <span className='period'>/day</span></p>
                    </div>
                    <img className='card-img' src={imageUrl} loading='lazy' alt={`a sample image of ${name}`}/>
                </figure>
                <Nav className="nav">
                    <ul className='nav-list'>
                        <li>
                            <NavLink
                                to='.'
                                end
                                    style={({isActive}) => isActive ? activeStyles : null}
                            >Details</NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={'pricing'}
                                style={({isActive}) => isActive ? activeStyles : null}
                            >Pricing</NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={'photos'}
                                style={({isActive}) => isActive ? activeStyles : null}
                            >Photos</NavLink>
                        </li>
                    </ul>
                </Nav>
                <Outlet context={van}/>
            </div>
        )
    }

    return (
        <div className="details-container">
            <Link to='..' relative='path' className='back-link'>
                <span className='left-arr'>{decode('&larr;')}</span>
                <span>Back to all vans</span>
            </Link>
            <Suspense fallback={<Spinner/>}>
                <Await resolve={vanDetails.hostVans}>
                    {renderVanDetails}
                </Await>
            </Suspense>
        </div>)
}