import React from 'react';
import Navbar from './Navbar';
import '../css/home.css';
import HomeCarousel from './HomeCarousel';

function Home() {
    return (
        <div id="home">
            <Navbar />
            <HomeCarousel />
        </div>
    )
}

export default Home
