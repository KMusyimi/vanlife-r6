import {useEffect, useId, useState} from "react";
import {Link} from "react-router-dom";


export default function Vans() {
    const [data, setData] = useState([]);
    const id = useId();
    useEffect(() => {
        async function getVansData() {
            const fetchPromise = await fetch('/api/vans');
            const data = await fetchPromise.json();
            setData(data.vans);
        }

        getVansData();
    }, []);

    function populateCards() {
        return data.map((van, idx) => {
            return (
                <article key={`card-${id + idx}`} className='card'>
                    <Link to={`/vans/${van.id}`}
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
                    <nav className='product-nav'>
                        <ul className='product-list'>
                            <li><Link to='/vans/simple'>simple</Link></li>
                            <li><Link to='/vans/luxury'>luxury</Link></li>
                            <li><Link to='/vans/rugged'>rugged</Link></li>
                        </ul>
                        <ul>
                            <li><Link to='/vans/simple'>Clear filters</Link></li>
                        </ul>
                    </nav>
                </header>
                <div className='cards-wrapper'>{populateCards()}</div>
            </section>
        </div>
    )
}