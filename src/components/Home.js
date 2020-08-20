import React from 'react';
import Navbar from './Navbar';
import '../css/home.css';
import HomeCarousel from './HomeCarousel';
import TopArticles from './TopArticles';
import ArticleGroup from './ArticleGroup';

function Home() {
    return (
        <div id="home">
            <Navbar />
            <div id="homeContent">
                <div className="home-left-container">
                    <HomeCarousel /> 
                </div>
                <div className="home-right-container">
                    <TopArticles />
                </div>
                <div className="home-articleGroup-container">
                    <ArticleGroup/>
                </div>

            </div>
        </div>
    )
}

export default Home
