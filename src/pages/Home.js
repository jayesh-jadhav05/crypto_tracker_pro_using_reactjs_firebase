import React from 'react'
import Hero from '../components/LandingPage/MainComponent/Hero';
import Header from '../components/common/Header/Header';
import Footer from '../components/common/Footer/Footer';

const Home = () => {
    return (
        <React.Fragment>
            <Header />
            <Hero />
            <Footer />
        </React.Fragment>
    )
}

export default Home;