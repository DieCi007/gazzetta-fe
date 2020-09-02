import React, { useContext } from 'react'
import HomeCarousel from './HomeCarousel'
import { makeStyles, Typography, ListSubheader } from '@material-ui/core'
import LocalizedStrings from 'react-localization';
import { LangContext } from '../App';
import { data } from '../constants/navbarStrings';
import { Redirect } from 'react-router-dom';
import PaginatedTag from './PaginatedTag';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '1vh'
    },
    subHeader: {
        fontSize: '1.5rem',
        textAlign: 'start'
    }
}));
const stringTags = new LocalizedStrings(data);
const stringOlder = new LocalizedStrings({
    al: {
        other: 'Te tjera'
    }, en: {
        other: 'More'
    }, it: {
        other: 'Altre'
    }
});
function SingleTag({ match }) {
    const classes = useStyles();
    const langContext = useContext(LangContext);
    stringTags.setLanguage(langContext.langState);
    stringOlder.setLanguage(langContext.langState);

    function getTag() {
        for (const lang in data) {
            for (const key in data[lang]) {
                if (data[lang][key] === match.params.tag) {
                    return key;
                }
            }
        }
    }
    const tag = getTag();
    if (!tag) return <Redirect to='/' />;

    return (
        <div id="singleTag" className={classes.root}>
            <Typography align="center" variant="h4" >{stringTags[tag]}</Typography>
            <HomeCarousel tag={tag} />
            <br />
            <ListSubheader component="div" className={classes.subHeader}>{stringOlder.other}...</ListSubheader>
            <PaginatedTag tag={tag} lang={langContext.langState}/>
        </div>
    )
}

export default SingleTag
