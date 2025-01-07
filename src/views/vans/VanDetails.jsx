import {Await, Link, useLoaderData, useLocation} from "react-router-dom";
import {decode} from "html-entities";
import Spinner from "../../components/Spinner.jsx";
import {getVan} from "../../api.js";
import {Suspense} from "react";

export async function vanDetailsLoader({params}) {
    return {van: getVan(params.id)};
}

export default function VanDetails() {
    const vanDetails = useLoaderData();
    const location = useLocation();

    function renderVanDetails(van) {
        const {description, imageUrl, name, price, type} = van !== null && van;
        const search = location.state?.search || "";
        const searchType = location.state?.type || 'all'
        return (
            <>
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
            </>
        )
    }

    return (
        <div className='bg-color'>
            <div className='details-container sect-width'>

                <Suspense fallback={<Spinner/>}>
                    <Await resolve={vanDetails.van}>
                        {renderVanDetails}
                    </Await>
                </Suspense>

            </div>
        </div>
    )
}