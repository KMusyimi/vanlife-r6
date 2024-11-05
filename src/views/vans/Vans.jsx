import {useEffect, useId, useState} from "react";
import {Link, useSearchParams} from "react-router-dom";
import {getVans} from "../../api";
import Spinner from "../../components/Spinner.jsx";

export default function Vans() {
    const [vans, setVans] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const id = useId();

    const typeFilter = searchParams.get("type");
    const vansArr = typeFilter ? vans.filter(van => typeFilter === van.type) : vans;

    useEffect(() => {
        async function getVansData() {
            setLoading(true);
            try {
                const data = await getVans();
                setVans(data);
            } catch (err) {
                setError(err);
            } finally {
                setTimeout(() => setLoading(false), 500);
            }

        }

        getVansData();
    }, []);

    if (loading) {
        return <Spinner/>
    }
    if(error){
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