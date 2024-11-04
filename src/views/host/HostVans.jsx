import {useEffect, useId, useState} from "react";
import {Link} from "react-router-dom";

// TODO: add spinners
function HostVans() {
    const id = useId();
    const [hostVans, setHostVans] = useState(null);
    useEffect(() => {
        async function getHostVans() {
            const fetchPromise = await fetch('/api/host/vans');
            const data = await fetchPromise.json();
            setHostVans(data.vans);
        }

        getHostVans();
    }, []);

    const vansListItems = () => {
        return hostVans !== null && hostVans.map((van, idx) => {
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
            <header><h1 className='fw-700'>Your listed vans</h1></header>
            <div className='vans-container'>
                <ul className='van-list'>{vansListItems()}</ul>
            </div>
        </>)
}

export default HostVans;