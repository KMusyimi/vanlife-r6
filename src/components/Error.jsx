import {useRouteError} from "react-router-dom";

export default function Error() {
    const err = useRouteError();
    return (<>
        <p className='err-msg'>{err.message}</p>
        {err.statusText && <pre>{err.status} - {err.statusText}</pre>}
    </>)
}