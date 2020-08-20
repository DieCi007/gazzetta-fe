import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { makeStyles, CardActionArea, Card, CardMedia, Typography } from '@material-ui/core';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/homeCarousel.css';
import { data } from '../constants/navbarStrings';
import LocalizedStrings from 'react-localization';
import { LangContext } from '../App';

const useStyles = makeStyles((theme) => ({
   cardMedia: {
        [theme.breakpoints.down('sm')]: {
            height: 320
        },
        [theme.breakpoints.down('xs')]: {
            height: 250
        }
    }
}));
let strings = new LocalizedStrings(data);
function HomeCarousel() {
    const langContext = useContext(LangContext);
    strings.setLanguage(langContext.langState);
    const classes = useStyles();
    const settings = {
        arrows: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        lazyLoad: "ondemand"
    };
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/article`);
            try {
                setArticles(response.data);
            } catch (err) {
                setArticles([]);
                console.log(`Problem fetching data ${err}`);
            }
        }
        fetchData();
    }, [])
    return (
        <div id="homeCarousel" >
            <Slider {...settings} autoplay className="carousel">
                {
                    articles.map(article => {
                        return (
                            <Card key={article._id} className="homeCarousel-card">
                                <CardActionArea>
                                    <CardMedia classes={{ root: classes.cardMedia }}
                                        className="homeCarousel-cardMedia"
                                        component="img"
                                        height="370"
                                        src={article.media}
                                    >
                                    </CardMedia>
                                    <div className="homeCarousel-textContainer"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'flex-end',
                                            color: 'white',
                                            width: '100%',
                                            position: 'absolute',
                                            bottom: '0',
                                            height: '80%',
                                            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0) 100%)'
                                        }}>
                                        <Typography style={{
                                            width: '90%',
                                            alignSelf: 'center',
                                            textAlign: 'center'
                                        }} variant="h4" component="h2">
                                            {article.title}
                                        </Typography>
                                        <Typography style={{
                                            color:'#DEDEDE',
                                            width: '90%',
                                            alignSelf: 'center',
                                            textAlign: 'end'
                                        }} variant="subtitle1">
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
