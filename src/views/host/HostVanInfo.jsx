import {useOutletContext} from "react-router-dom";

function HostVanInfo() {
    const van = useOutletContext();
    return (
        <div className='details'>
            <p><span className='fw-700'>Name:</span>{van.name}</p>
            <p><span className='fw-700'>Category:</span>{van.type}</p>
            <p><span className='fw-700'>Description:</span>{van.description}</p>
            <p><span className='fw-700'>Visibility:</span>Public</p>
        </div>
    )
}

export default HostVanInfo;