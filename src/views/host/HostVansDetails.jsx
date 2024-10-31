import {Link, NavLink, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {decode} from "html-entities";
import Nav from "../../components/Nav.jsx";

function HostVansDetails() {
    const [hostVan, setHostVan] = useState([]);
    const params = useParams();
    const van = (details) => details;

    useEffect(() => {
        async function getHostVanDetails() {
            const fetchPromise = await fetch(`/api/host/vans/${params.id}`);
            const data = await fetchPromise.json();
            setHostVan(data.vans);
        }

        getHostVanDetails();
    }, [params.id]);
    const {name, price, description, imageUrl, type} = hostVan.length > 0 && van(...hostVan);

    return (
        <div className="details-container">
            <Link to='/host/vans' className='back-link'>
                <span className='left-arr'>{decode('&larr;')}</span>
                <span>Back to all vans</span>
            </Link>
            <div className='details-wrapper'>
                <figure>
                    <div>
                        <p className={`tag tag-${type}`}>{type}</p>
                        <p className='van-name'>{name}</p>
                        <p className='price-wrapper'><span className='price fw-700'>${price}</span>
                            <span className='period'>/day</span></p>
                    </div>
                    <img className='card-img' src={imageUrl} loading='lazy' alt={`a sample image of ${van.name}`}/>
                </figure>
                <div>
                    <Nav className="nav">
                        <ul className='nav-list'>
                            <li><NavLink
                                to='/host/vans/:id/details'
                            >Details</NavLink></li>
                            <li><NavLink
                                to='/host/vans/:id/pricing'
                            >Pricing</NavLink></li>
                            <li><NavLink
                                to='/host/vans/:id/photos'
                            >Photos</NavLink></li>
                        </ul>
                    </Nav>
                    <div className='details'>
                        <p><span className='fw-700'>Name:</span>{name}</p>
                        <p><span className='fw-700'>Category:</span>{type}</p>
                        <p><span className='fw-700'>Description:</span>{description}</p>
                        <p><span className='fw-700'>Visibility:</span>Public</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HostVansDetails;