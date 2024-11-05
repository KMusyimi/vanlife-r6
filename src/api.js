export async function getVans(){
    const fetchPromise = await fetch('/api/vans');
    if (!fetchPromise.ok){
        throw {
            message: 'Failed to get Vans',
            statusText: fetchPromise.statusText,
            status: fetchPromise.status
        }
    }
    const data = await fetchPromise.json();
    return data.vans;
}