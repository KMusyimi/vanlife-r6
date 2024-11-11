import {useId, useState} from "react";
import {Link, useLoaderData, useNavigation, useSearchParams} from "react-router-dom";
import {getVans} from "../../api";
import Spinner from "../../components/Spinner.jsx";

export function loader() {
    return getVans();
}


export default function Vans() {
    const id = useId();
    const [searchParams, setSearchParams] = useSearchParams();
    const [error, setError] = useState(null);
    const vans = useLoaderData();

    // using the useNavigation() hook, we can check the state of the loader and display some
    // kind of spinner in the UI to tell the user that deta is being fetched in the background.
    const navigation = useNavigation();

    if (navigation.state === 'loading') return <Spinner/>;

    const typeFilter = searchParams.get("type");
    const vansArr = typeFilter ? vans.filter(van => typeFilter === van.type) : vans;

    if (error) {
        return <h1 aria-live='assertive'>There was an error: {error.message}</h1>
    }

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

    function populateCards() {
        return vansArr.map((van, idx) => {
            return (
                <article key={`card-${id + idx}`} className='card'>
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
                </article>
            )
        })
    }

    return (
        <div className='vans-container'>
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
                <div className='cards-wrapper'>{populateCards()}</div>
            </section>
        </div>
    )
}