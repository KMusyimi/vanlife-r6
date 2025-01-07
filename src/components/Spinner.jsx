export default function Spinner() {
    return (
        <div className='spinner-container'>
            <div className="spinner" aria-live='polite'></div>
            <p>Loading...</p>
        </div>)
}