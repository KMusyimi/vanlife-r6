import Header from "./Header";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import Button from "./Button.jsx";

function Home() {

    return (
        <>
            <Header/>
            <Main className='main'>
                <div className='bg-img'>
                    <div className='overlay'></div>
                    <section className='intro-section'>
                        <h1>You got the travel plans, we got the travel vans.</h1>
                        <p>Add adventure to your life by joining the #vanlife movement.
                            Rent the perfect van to make your perfect road trip.</p>
                        <Button id='find-btn' type='button' className='btn'>Find your van</Button>
                    </section>
                </div>
            </Main>
            <Footer></Footer>
        </>
    )
}

export default Home;
