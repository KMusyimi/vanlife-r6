import {Link, NavLink, Outlet, useParams} from "react-router-dom";
import {decode} from "html-entities";
import {useEffect, useState} from "react";
import Nav from "../../components/Nav.jsx";
import Spinner from "../../components/Spinner.jsx";


export default function HostVanDetails() {
    const [van, setVan] = useState([]);
    const params = useParams();
    const [loading, setLoading] = useState(false);

    const activeStyles = {
        color: 'hsla(0, 0%, 9%, 1)',
        textDecoration: 'underline',
        textDecorationColor: 'inherit',
        fontWeight: 700
    }

    useEffect(() => {
        async function getHostVanDetails() {
            setLoading(true);
            const fetchPromise = await fetch(`/api/host/vans/${params.id}`);
            const data = await fetchPromise.json();
            setVan(data.vans);
            setTimeout(() => setLoading(false), 500);
        }
        getHostVanDetails();
    }, [params.id]);

    if (loading) {
        return <Spinner/>
    }
    return (
        <div className="details-container">
            <Link to='..' relative='path' className='back-link'>
                <span className='left-arr'>{decode('&larr;')}</span>
                <span>Back to all vans</span>
            </Link>
            <div className='host-van-info'>
                <figure>
                    <div>
                        <p className={`tag tag-${van.type}`}>{van.type}</p>
                        <p className='van-name'>{van.name}</p>
                        <p className='price-wrapper'><span className='price fw-700'>${van.price}</span>
                            <span className='period'>/day</span></p>
                    </div>
                    <img className='card-img' src={van.imageUrl} loading='lazy' alt={`a sample image of ${van.name}`}/>
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
        </div>)
}