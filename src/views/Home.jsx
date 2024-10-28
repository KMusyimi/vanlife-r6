import {Link} from "react-router-dom";

function Home() {
    return (
        <main className='main'>
            <div className='bg-img'>
                <div className='overlay'></div>
                <section className='intro-section'>
                    <h1>You got the travel plans, we got the travel vans.</h1>
                    <p>Add adventure to your life by joining the #vanlife movement.
                        Rent the perfect van to make your perfect road trip.</p>
                    <Link to={'/vans'}>Find your van</Link>
                </section>
            </div>
        </main>
    )
}

export default Home;