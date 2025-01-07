import {useRouteError} from "react-router-dom";

export default function Error() {
    const err = useRouteError();
    return (<>
        <h1 className='err-msg' aria-live='assertive'>{err.message}</h1>
        {err.statusText && <pre>{err.status} - {err.statusText}</pre>}
    </>)
}