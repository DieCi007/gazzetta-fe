import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { makeStyles, GridList, GridListTile, GridListTileBar, ListSubheader, CardActionArea } from '@material-ui/core';
import { LangContext } from '../App';
import LocalizedStrings from 'react-localization';
import { data } from '../constants/navbarStrings';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection:'column',
        alignItems:'center',
        overflow: 'hidden',
        [theme.breakpoints.down('1150')]: {
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        }
    },
    tile: {
        '&:hover': {
            cursor: 'pointer',
        }
    },
    subHeader: {
        fontSize: '1.5rem',
        textAlign: 'center'
    },
    gridList: {
        width: 650,
        [theme.breakpoints.down('1150')]: {
            flexDirection: 'row',
            flexWrap: 'nowrap',
            width: '100%',
        }
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 75%, rgba(0,0,0,0) 100%)',
    },
    subtitle: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    title: {
        fontWeight: 'bold',
        whiteSpace: 'normal'
    },
    articleTag: {
        backgroundColor: 'darkgreen',
        [theme.breakpoints.down('1150')]: {
            display: 'none'
        }
    }
}));

let strings = new LocalizedStrings({
    al: {
        topNews: 'Lajmet e javes'
    },
    en: {
        topNews: 'Top weekly news'
    },
    it: {
        topNews: 'News della settimana'
    }
});
let stringTags = new LocalizedStrings(data);

function TopArticles() {
    const langContext = useContext(LangContext);
    strings.setLanguage(langContext.langState);
    stringTags.setLanguage(langContext.langState);
    const classes = useStyles();
    const [gridSize, setGridSize] = useState(2);
    const [articles, setArticles] = useState([]);
    useEffect(() => {
        const handleResize = () => {
            setGridSize(() => {
                if (window.innerWidth < 650) return 1.5;
                else if (window.innerWidth < 1150) return 3.1
                else return 2;
            });
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    useEffect(() => {
        const fetchArticles = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/article`);
            try {
                setArticles(response.data);
            } catch (err) {
                setArticles([]);
                console.log(`Problem fetching data ${err}`);
            }
        }
        fetchArticles();
    }, []);


    return (
        <div id="topArticles" className={classes.root} style={{justifyContent:'space-between', alignContent:'space-between'}}>
            <ListSubheader component="div" className={classes.subHeader}>{strings.topNews}</ListSubheader>
            <GridList cellHeight={180} className={classes.gridList} cols={gridSize}>
                {
                    articles.map(article => {
                        const translated = new LocalizedStrings(article.article);
                        translated.setLanguage(langContext.langState);
                        return (
                            <GridListTile key={article._id} className={classes.tile}>
                                <Link to={{ pathname: `/article/${article._id}`, state: { article: article } }}>
                                    <CardActionArea>
                                        <img height={180} style={{ width: '100%', weight: '100%', objectFit: 'cover' }} src={article.media[0]} alt={translated.title} />
                                    </CardActionArea>
                                    <GridListTileBar classes={{
                                        root: classes.titleBar,
                                        title: classes.title
                                    }}
                                        title={translated.title}
                                        subtitle={
                                            <div className={classes.subtitle}>
                                                <p>
                                                    {new Date(article.date).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })}
                                                </p>
                                                <p className={classes.articleTag} >
                                                    {stringTags[article.tags[0]]}
                                                </p>
                                            </div>
                                        }
                                    />
                                </Link>
                            </GridListTile>
                        )
                    })
                }
            </GridList>
        </ div>
    )
}

export default TopArticles;
