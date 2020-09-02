import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { makeStyles, ListSubheader, CardActionArea, Card, CardMedia, Typography } from '@material-ui/core';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/homeCarousel.css';
import { data } from '../constants/navbarStrings';
import LocalizedStrings from 'react-localization';
import { LangContext } from '../App';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    cardMedia: {
        [theme.breakpoints.down('sm')]: {
            height: 320
        },
        [theme.breakpoints.down('xs')]: {
            height: 250
        }
    },
    subHeader: {
        fontSize: '1.5rem',
        textAlign: 'start'
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        color: 'white',
        width: '100%',
        position: 'absolute',
        bottom: '0',
        height: '80%',
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0) 100%)'
    }
}));
let strings = new LocalizedStrings(data);
let stringLatest = new LocalizedStrings({
    al: {
        latest: 'Lajmet e Fundit'
    },
    en: {
        latest: 'Latest News'
    },
    it: {
        latest: 'Ultime Notizie'
    }
});
function HomeCarousel({ tag }) {
    const sliderRef = useRef(null);
    const langContext = useContext(LangContext);
    strings.setLanguage(langContext.langState);
    stringLatest.setLanguage(langContext.langState);
    const classes = useStyles();
    const settings = {
        arrows: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        lazyLoad: "progressive"
    };
    const [articles, setArticles] = useState([]);
    const [mouseX, setMouseX] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/article`, { params: tag ? { tag: tag } : {} });
            try {
                setArticles(response.data);
            } catch (err) {
                setArticles([]);
                console.log(`Problem fetching data ${err}`);
            }
        }
        fetchData();
    }, [tag]);

    let history = useHistory();

    const handleArticleClick = (article, e) => {
        if (e.clientX > mouseX - 20 && e.clientX < mouseX + 20) history.push(`/article/${article._id}`, { article: article });
    }

    return (
        <div id="homeCarousel" >
            <ListSubheader component="div" className={classes.subHeader}>{stringLatest.latest}</ListSubheader>
            <Slider ref={sliderRef} {...settings} autoplay={true} className="carousel">
                {
                    articles.map(article => {
                        const translated = new LocalizedStrings(article.article);
                        translated.setLanguage(langContext.langState);
                        return (
                            <Card key={article._id} className="homeCarousel-card">
                                <CardActionArea onMouseDown={(e) => setMouseX(e.clientX)} onClick={(e) => handleArticleClick(article, e)} >
                                    <CardMedia classes={{ root: classes.cardMedia }}
                                        className="homeCarousel-cardMedia"
                                        component="img"
                                        height="370"
                                        src={article.media[0]}
                                    >
                                    </CardMedia>
                                    <div className={`homeCarousel-textContainer ${classes.textContainer}`}>
                                        <Typography style={{
                                            width: '90%',
                                            alignSelf: 'center',
                                            textAlign: 'center'
                                        }} variant="h4" component="h2">
                                            {translated.title}
                                        </Typography>
                                        <Typography style={{
                                            color: '#DEDEDE',
                                            width: '90%',
                                            alignSelf: 'center',
                                            textAlign: 'end'
                                        }} variant="body2">
                                            {strings[article.tags[0]]}
                                        </Typography>
                                    </div>
                                </CardActionArea>
                            </Card>
                        )
                    })
                }
            </Slider>
        </div>
    )
}

export default HomeCarousel
