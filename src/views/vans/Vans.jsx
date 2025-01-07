import {Suspense, useId} from "react";
import {Await, Link, useLoaderData, useSearchParams} from "react-router-dom";
import {getVans} from "../../api";
import Spinner from "../../components/Spinner.jsx";


export async function loader() {
    const vans = getVans();
    // The json and defer methods are deprecated in favor of returning raw objects.
    return {vans};
}

export default function Vans() {
    const id = useId();
    const vansData = useLoaderData();
    const [searchParams, setSearchParams] = useSearchParams();

    const typeFilter = searchParams.get("type");

    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }

    function renderVans(arr) {
        return arr.map((van, idx) => {
            return (<article key={`card-${id + idx}`} className='card'>
                <Link to={`${van.id}`}
                      state={{search: `?${searchParams.toString()}`, type: typeFilter}}
                      aria-label={`View details for ${van.name}, priced at ${van.price} per day`}>
                    <header>
                        <h1 className='van-name'>{van.name}</h1>
                        <p className='price'>${van.price} <span className='period'>/day</span></p>
                        <p className={`tag tag-${van.type}`}>{van.type}</p>
                    </header>
                    <figure>
                        <img className='card-img' src={van.imageUrl} loading='lazy'
                             alt='a sample image of a van'/>
                    </figure>
                </Link>
            </article>)
        })
    }

    return (<div className='vans-container'>
        <section className='vans-section sect-width'>
            <header className='vans-header'>
                <h1>Explore our van options</h1>
                <div className='filters-container'>
                    <div className='filters-wrapper'>
                        <button className={`simple ${typeFilter === 'simple' ? 'selected' : ''}`}
                                onClick={() => handleFilterChange("type", "simple")}>simple
                        </button>
                        <button className={`luxury ${typeFilter === 'luxury' ? 'selected' : ''}`}
                                onClick={() => handleFilterChange("type", "luxury")}>luxury
                        </button>
                        <button className={`rugged ${typeFilter === 'rugged' ? 'selected' : ''}`}
                                onClick={() => handleFilterChange("type", "rugged")}>rugged
                        </button>
                    </div>
                    {typeFilter && <div className='clear-wrapper'>
                        <button onClick={() => handleFilterChange("type", null)}
                                className='clear-filters'>Clear filters
                        </button>
                    </div>}
                </div>
            </header>
            <div className='cards-wrapper'>{
                <Suspense fallback={<Spinner/>}>
                    <Await resolve={vansData.vans}>
                        {(loadedVans) => {
                            const vansArr = typeFilter ?
                                loadedVans.filter(van => typeFilter === van.type) : loadedVans;
                            return renderVans(vansArr);
                        }}
                    </Await>
                </Suspense>
            }</div>
        </section>
    </div>)
};
