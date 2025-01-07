import {Suspense, useId} from "react";
import {Await, Link, useLoaderData} from "react-router-dom";
import {getHostVans} from "../../api.js";
import {requireAuth} from "../../utils";
import Spinner from "../../components/Spinner.jsx";

export async function hostVansLoader({request}) {
    await requireAuth(request);
    return {hostVans: getHostVans()};
}

function HostVans() {
    const id = useId();
    const vans = useLoaderData();

    const vansListItems = (vans) => {
        return vans !== null && vans.map((van, idx) => {
            return (
                <li key={`${id}-${idx}`}>
                    <Link to={`${van.id}`}>
                        <section>
                            <h1>{van.name}</h1>
                            <p className='price'>${van.price}/day</p>
                        </section>
                        <img className='card-img' src={van.imageUrl}
                             loading='lazy' alt={`a sample image of ${van.name}`}/>
                    </Link>
                </li>)
        })
    }

    return (
        <>
            <header>
                <h1 className='fw-700'>Your listed vans</h1>
            </header>
            <Suspense fallback={<Spinner/>}>
                <Await resolve={vans.hostVans}>
                    {(loadedVans) => {
                        return (
                            <div className='vans-container'>
                                <ul className='van-list'>{vansListItems(loadedVans)}</ul>
                            </div>)
                    }}
                </Await>
            </Suspense>
        </>)
}

export default HostVans;