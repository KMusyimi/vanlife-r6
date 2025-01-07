import {useOutletContext} from "react-router-dom";

export default function HostVanPhotos() {
    const van = useOutletContext();
    return <figure>
        <img className='card-img' src={van.imageUrl} loading='lazy'
             alt={`a sample image of ${van.name}`}/>
    </figure>
}