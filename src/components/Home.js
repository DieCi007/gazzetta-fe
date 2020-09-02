import React from 'react';
import Navbar from './Navbar';
import '../css/home.css';
import HomeCarousel from './HomeCarousel';
import TopArticles from './TopArticles';
import ArticleGroup from './ArticleGroup';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import SingleArticle from './SingleArticle';
import { Paper } from '@material-ui/core';
import SingleTag from './SingleTag';

function Home() {
    return (
        <div id="home">
            <Router>
                <Navbar />
                <Paper elevation={3} id="homeContent">
                    <Paper style={{ backgroundColor: '#e4e2dc' }} elevation={2} className="home-left-container">
                        <Switch>
                            <Route path="/" exact render={() =>
                                <>
                                    <HomeCarousel />
                                    <ArticleGroup tag="politics" primary={true} />
                                    <ArticleGroup tag="chronicle" primary={true} />
                                </>
                            } />
                            <Route path="/article/:id" component={SingleArticle} />
                            <Route path="/tag/:tag" component={SingleTag} />
                            <Redirect to="/" />
                        </Switch>
                    </Paper>
                    <div className="home-right-container">
                        <TopArticles />
                    </div>
                    <ArticleGroup tag="economy" primary={false} />
                    <ArticleGroup tag="sport" primary={false} />
                    <ArticleGroup tag="world" primary={false} />
                    <ArticleGroup tag="lifestyle" primary={false} />
                </Paper>
            </Router>
        </div>
    )
}

export default Home
