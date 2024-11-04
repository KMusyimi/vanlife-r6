import {Link, useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {decode} from "html-entities";

export default function VanDetails() {
    const params = useParams();
    const [van, setVan] = useState(null);
    const location = useLocation();
    console.log(location);
    useEffect(() => {
        async function fetchData() {
            const promise = await fetch(`/api/vans/${params.id}`);
            const data = await promise.json();
            setVan(data.vans);
        }

        fetchData();
    }, [params.id]);

    const {description, imageUrl, name, price, type} = van !== null && van;
    const search = location.state?.search || "";
    const searchType = location.state?.type || 'all'
    return (
        <div className='bg-color'>
            <div className='details-container sect-width'>
                <Link
                    to={`..${search}`}
                    relative='path'
                    className='back-link'>
                    <span className='left-arr'>{decode('&larr;')}</span>
                    <span>Back to {searchType} vans</span>
                </Link>

                {van ? (<article className='van-details-card '>
                    <section>
                        <p className={`tag tag-${type}`}>{type}</p>
                        <h1 className='van-name'>{name}</h1>
                        <p className='price'>${price}/day</p>
                        <p className='description'>{description}</p>
                        <Link className='rent-link' to='/vans/rent/:id'>Rent this van</Link>
                    </section>
                    <figure>
                        <img className='card-img' src={imageUrl} loading='lazy'
                             alt={`a sample image of ${name}`}/>
                    </figure>
                </article>) : (<h2>Loading van details</h2>)}
            </div>
        </div>
    )
}