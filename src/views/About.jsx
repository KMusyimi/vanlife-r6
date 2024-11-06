import campImg from '../assets/camp.svg'
import {Link} from "react-router-dom";

function About() {
    return (
        <div className='main-wrapper'>
            <section className='about-section sect-width'>
                <h1>Don’t squeeze in a sedan when you could relax in a van.</h1>
                <p>Our mission is to enliven your road trip with the perfect travel van rental.
                    Our vans are recertified before each trip to ensure your travel plans can go off without a
                    hitch.
                    (Hitch costs extra 😉)
                </p>
                <p> Our team is full of vanlife enthusiasts who know
                    firsthand the magic of touring the world on 4 wheels.</p>
                <section className='cto'>
                    <header>
                        <h1>Your destination is waiting. </h1>
                        <h2> Your van is ready.</h2>
                    </header>
                    <Link to='/vans'>Explore our vans</Link>
                </section>
            </section>
            <figure className='img-wrapper'>
                <img className='camp-img' src={`${campImg}`} alt=
                    'a black guy sitting on a camping van observng the stars'/>
            </figure>
        </div>
    )
}

export default About;