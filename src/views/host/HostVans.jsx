import {useEffect, useId, useState} from "react";
import {Link} from "react-router-dom";
import Spinner from "../../components/Spinner.jsx";
import {getHostVans} from "../../api.js";

// TODO: add spinners
function HostVans() {
    const id = useId();
    const [hostVans, setHostVans] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function getVans() {
            setLoading(true)
            try {
                const data = await getHostVans()
                setHostVans(data)
            } catch (err) {
                setError(err)
            } finally {
                setTimeout(() => setLoading(false), 500);
            }
        }

        getVans();
    }, []);

    if (loading) {
        return <Spinner/>
    }
    if (error) {
        return <h1>There was an error: {error.message}</h1>
    }
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