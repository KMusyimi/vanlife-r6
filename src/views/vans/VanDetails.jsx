import {Link, useLocation, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {decode} from "html-entities";
import Spinner from "../../components/Spinner.jsx";
import {getVans} from "../../api.js";

export default function VanDetails() {
    const {id} = useParams();
    const [van, setVan] = useState(null);
    const location = useLocation();
    const [error, setError] = useState(null)

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true)
            try {
                const data = await getVans(id)
                setVan(data)
            } catch (err) {
                setError(err)
            } finally {
                setTimeout(() => setLoading(false), 500);
            }

        }

        fetchData();
    }, [id]);


    if (loading) {
        return <Spinner/>
    }
    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }
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

                <article className='van-details-card '>
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
                </article>
            </div>
        </div>
    )
}