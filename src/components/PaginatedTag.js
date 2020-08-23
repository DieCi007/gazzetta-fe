import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles, Card, CardActionArea, Fab, CardMedia, CardContent, Typography } from '@material-ui/core';
import { ArrowBackSharp, ArrowForwardSharp } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative'
    },
    backFab: {
        position: 'absolute',
        top: '45%',
        minHeight: '48px',
        zIndex: '1',
        left: '5px'
    },
    forwardFab: {
        position: 'absolute',
        top: '45%',
        minHeight: '48px',
        zIndex: '1',
        right: '5px'
    }
}));


function PaginatedTag({ tag }) {
    const classes = useStyles();
    const [articles, setArticles] = useState([]);
    const [itemsDisplay, setItemsDisplay] = useState({
        page: 1,
        next: true,
        disabledPrevious: true
    });
    const limit = 6;
    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/article/paginated`,
                {
                    params: {
                        tag: tag,
                        page: itemsDisplay.page,
                        limit: limit
                    }
                });

            try {
                setArticles(response.data.results);
                setItemsDisplay(oldState => {
                    return {
                        ...oldState,
                        next: response.data.next ? false : true,
                        disabledPrevious: response.data.previous ? false : true
                    }
                });
            } catch (err) {
                setArticles([]);
                console.log(`Problem fetching data ${err}`);
            }
        }
        fetchData();
    }, [tag, itemsDisplay.page]);
    const handleRightFab = () => {
        setItemsDisplay({ ...itemsDisplay, page: itemsDisplay.page + 1 });
    }
    const handleLeftFab = () => {
        setItemsDisplay({ ...itemsDisplay, page: itemsDisplay.page - 1 });
    }
    if (articles) {
        return (
            <div id="paginatedTag" className={classes.root}>
                <Fab disabled={itemsDisplay.disabledPrevious} onClick={handleLeftFab} className={classes.backFab} color='secondary' aria-label='back'><ArrowBackSharp /></Fab>
                <Fab disabled={itemsDisplay.next} onClick={handleRightFab} className={classes.forwardFab} color='secondary' aria-label='forward'><ArrowForwardSharp /></Fab>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                    {
                        articles.map(article => {
                            return (
                                <Card style={{ width: '45%', marginTop: '1vh' }} key={article._id}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            alt={article.title}
                                            height="80"
                                            image={article.media}
                                            title={article.title}
                                        />
                                        <CardContent>
                                            <Typography variant="body1" component="h2">
                                                {article.title}
                                            </Typography>
                                            <Typography color='textSecondary'
                                                variant='caption'>
                                                {new Date(article.date).toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })}
                                            </Typography>
                                            <Typography style={{ overflow: 'hidden', maxHeight: '50px' }} variant="body2" color="textSecondary" component="p">
                                                {article.body}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            )
                        })
                    }
                </div>
            </div>
        )
    } else return null;
}

export default PaginatedTag
