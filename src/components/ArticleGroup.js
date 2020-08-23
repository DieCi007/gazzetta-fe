import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons'
import { makeStyles, ListSubheader, Card, CardActionArea, CardMedia, GridList, GridListTile, Typography, IconButton } from '@material-ui/core';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { LangContext } from '../App';
import { data } from '../constants/navbarStrings';
import LocalizedStrings from 'react-localization';
import '../css/articleGroup.css';
import { Link } from 'react-router-dom';

let stringTags = new LocalizedStrings(data);
const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
    },
    cardMedia: {

    },
    subHeader: {
        fontSize: '1.5rem',
        textAlign: 'start'
    },
    gridList: {
        flexWrap: 'nowrap',
        scrollbarWidth: 'none',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        '&::-webkit-scrollbar': {
            display: 'none'
        }
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        color: 'white',
        width: '100%',
        position: 'absolute',
        bottom: '0',
        height: '50%',
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 65%, rgba(0,0,0,0) 100%)'
    },
    title: {
        width: '95%',
        alignSelf: 'center',
        textAlign: 'center'
    },
    date: {
        color: '#EEEEEE',
        minWidth: '40%',
        textAlign: 'start',
        alignSelf: 'flex-end'
    },
    tag: {
        color: '#EEEEEE',
        minWidth: '40%',
        textAlign: 'end',
        alignSelf: 'flex-end'
    },
    buttonLeft: {
        minHeight: '48px',
        position: 'absolute',
        zIndex: '1',
        top: '40%',
        bottom: '40%',
        color: 'blue'
    },
    buttonRight: {
        minHeight: '48px',
        position: 'absolute',
        zIndex: '1',
        right: '0',
        top: '40%',
        bottom: '40%',
        color: 'blue'
    }
}));


function ArticleGroup({ tag, primary }) {
    const gridRef = useRef(null);
    const langContext = useContext(LangContext);
    stringTags.setLanguage(langContext.langState);
    const [articles, setArticles] = useState([]);
    const classes = useStyles();
    const [gridSize, setGridSize] = useState(0);

    const handleRightClick = () => {
        gridRef.current.scrollLeft += 200;
    }

    const handleLeftClick = () => {
        gridRef.current.scrollLeft -= 200;
    }

    useEffect(() => {
        const handleResize = () => {
            setGridSize(() => {
                if (window.innerWidth < 650) return 1.3;
                else if (window.innerWidth < 1150) return 2.8;
                else if (primary) return 2.5;
                else return 4.8;
            });
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [primary])

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
    }, []);
    
    const handleArticleClick = () => {
        window.scrollTo({ top: 0 });
    }

    const handleMouseEnter = () => {
        gridRef.current.addEventListener('wheel', (e) => {
            if (e.deltaY > 0) {
                e.preventDefault();
                gridRef.current.scrollLeft += 50;
            } else {
                e.preventDefault();
                gridRef.current.scrollLeft -= 50;
            }
        });
    };
    return (
        <div id="articleGroup" className={classes.root}>
            <ListSubheader component="div" className={classes.subHeader}>{stringTags[tag]}</ListSubheader>
            <GridList cellHeight={190} ref={gridRef} className={classes.gridList} cols={gridSize}>
                {
                    articles.map(article => {
                        return (
                            <GridListTile key={article._id} onMouseEnter={handleMouseEnter}>
                                <Link to={{ pathname: `/article/${article._id}`, state: { article: article } }} onClick={handleArticleClick}>
                                    <Card>
                                        <CardActionArea>
                                            <CardMedia className={classes.cardMedia}
                                                component="img"
                                                height={190}
                                                image={article.media} />
                                            <div className={classes.textContainer}>
                                                <Typography
                                                    variant='h6'
                                                    className={classes.title}>
                                                    {article.title}</Typography>
                                                <Typography
                                                    variant='caption'
                                                    className={classes.date}>
                                                    {new Date(article.date).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })}
                                                </Typography>
                                                <Typography
                                                    variant='caption'
                                                    className={classes.tag}>
                                                    {stringTags[article.tags[0]]}
                                                </Typography>
                                            </div>
                                        </CardActionArea>
                                    </Card>
                                </Link>
                            </GridListTile>
                        )
                    })
                }
            </GridList>
            <IconButton className={classes.buttonLeft} onClick={handleLeftClick}>
                <ArrowBackIos />
            </IconButton>
            <IconButton className={classes.buttonRight} onClick={handleRightClick}>
                <ArrowForwardIos />
            </IconButton>
        </div >
    )
}

export default ArticleGroup
