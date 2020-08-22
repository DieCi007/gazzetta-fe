import React from 'react';
import Navbar from './Navbar';
import '../css/home.css';
import HomeCarousel from './HomeCarousel';
import TopArticles from './TopArticles';
import ArticleGroup from './ArticleGroup';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SingleArticle from './SingleArticle';

function Home() {
    return (
        <div id="home">
            <Router>
                <Navbar />
                <div id="homeContent">
                    <div className="home-left-container">
                        <Route path="/" exact render={() =>
                            <>
                                <HomeCarousel />
                                <ArticleGroup tag="politics" primary={true} />
                                <ArticleGroup tag="chronicle" primary={true} />
                            </>
                        } />
                        <Route path="/article/:id" component={SingleArticle} />
                    </div>
                    <div className="home-right-container">
                        <TopArticles />
                    </div>
                    <ArticleGroup tag="economy" primary={false} />
                    <ArticleGroup tag="sport" primary={false} />
                    <ArticleGroup tag="world" primary={false} />
                    <ArticleGroup tag="lifestyle" primary={false} />
                </div>
            </Router>
        </div>
    )
}

export default Home
