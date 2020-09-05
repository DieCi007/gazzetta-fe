import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { makeStyles, Typography, Card, CardMedia } from '@material-ui/core';
import Slider from 'react-slick';
import LocalizedStrings from 'react-localization';
import { LangContext } from '../App';
import { data } from '../constants/navbarStrings';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    cardMedia: {
        [theme.breakpoints.down('sm')]: {
            height: 400
        },
        [theme.breakpoints.down('xs')]: {
            height: 290
        }
    }
}));
const stringTags = new LocalizedStrings(data);
const stringsComponent = new LocalizedStrings({
    al: {
        by: 'nga: '
    },
    en: {
        by: 'by: '
    },
    it: {
        by: 'da: '
    }
});

function SingleArticle({ match, location }) {
    const classes = useStyles();
    const langContext = useContext(LangContext);
    stringTags.setLanguage(langContext.langState);
    stringsComponent.setLanguage(langContext.langState);
    /*  IF SENT FROM ANOTHER COMPONENT CHECK FROM LOCATION.STATE.ARTICLE
    IF THERE IS AN ARTICLE SHOW IT
    IF THERE IS NOT AN ARTICLE SEARCH FOR MATCH.PARAMS.ID IN DATABASE
    IF DB SEARCH FAILS REDIRECT TO HOME
    */
    const [article, setArticle] = useState({});
    useEffect(() => {
        if (location.state && location.state.article) {
            setArticle(location.state.article);
        }
        else {
            const fetchData = async () => {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/article/${match.params.id}`);
                try {
                    setArticle(response.data);
                } catch (err) {
                    return <Redirect to='/' />;
                }
            }
            fetchData();
        }
    }, [location.state, match.params.id]);

    useEffect(() => {
        const addViewCount = async () => {
            await axios.post(`${process.env.REACT_APP_API_URL}/article/views/${match.params.id}`);
        }
        addViewCount();
    }, [match.params.id])

    const sliderSettings = {
        arrows: true,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        lazyLoad: "ondemand"
    };
    if (article.article) {
        const translated = new LocalizedStrings(article.article);
        translated.setLanguage(langContext.langState);
        return (
            <div id="singleArticle">
                <Typography align="center" variant="h4" >{translated.title}</Typography>
                <Typography align="right" variant="body2">{stringsComponent.by} {article.author.name} {article.author.lastname}</Typography>
                <Slider {...sliderSettings}>
                    {(article.media).map(img => {
                        return (
                            <Card key={img}>
                                <CardMedia classes={{ root: classes.cardMedia }}
                                    component="img"
                                    height="450"
                                    src={img} />
                            </Card>
                        )
                    })}
                </Slider>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1vh' }}>
                    <Typography align="left" variant="body2">{new Date(article.date).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })} </Typography>
                    <Typography align="right" variant="body2"> {stringTags[article.tags[0]]} </Typography>
                </div>
                <div style={{ width: '95%' }}>

                </div>
                <Typography align="left" variant="h6"> {translated.body} </Typography>
            </div>
        )
    } else return null;
}

export default SingleArticle
