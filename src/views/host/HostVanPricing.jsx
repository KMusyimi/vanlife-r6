import {useOutletContext} from "react-router-dom";

export default function HostVanPricing() {
    const van = useOutletContext();
    return (<div>
        <p className='price-wrapper'>
            <span className='price fw-700'>${van.price}</span><span
            className='period' style={{fontSize:'1.8rem'}}>/day</span></p>
    </div>)
}