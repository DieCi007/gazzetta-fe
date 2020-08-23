import React, { useState, useContext } from 'react';
import '../css/navbar.css';
import {
    Toolbar, AppBar, Typography, Button, ButtonGroup, MenuItem, IconButton
} from '@material-ui/core';
import {
    HomeTwoTone, LanguageSharp, ExpandMoreSharp,
    Facebook, YouTube, Instagram
} from '@material-ui/icons';
import LocalizedStrings from 'react-localization';
import { data } from '../constants/navbarStrings';
import { LangContext } from '../App';
import MyDrawer from './MyDrawer';
import { StyledMenu } from '../materialStyles/styledMenu'
import { langs } from '../constants/languageStrings';
import { useHistory, Link } from 'react-router-dom';


let strings = new LocalizedStrings(data);
let langOBJ = new LocalizedStrings(langs);
function Navbar() {
    const langContext = useContext(LangContext);
    strings.setLanguage(langContext.langState);
    const titles = [strings.politics, strings.chronicle, strings.economy, strings.sport, strings.world];
    const history = useHistory();

    const moreTitles = [strings.culture, strings.lifestyle, strings.technology, strings.cinema];
    const languages = [langOBJ.al, langOBJ.en, langOBJ.it];
    const [titleAnchor, setTitleAnchor] = useState(null);
    const [langAnchor, setLangAnchor] = useState(null);
    const handleTitleClick = (e) => {
        setTitleAnchor(e.currentTarget);
    }
    const handleTitleClose = (index) => {
        setTitleAnchor(null);
        if (index) history.push(`/tag/${moreTitles[index]}`);
    }
    const handleLangClick = (e) => {
        setLangAnchor(e.currentTarget);
    }
    const handleLangClose = (lang) => {
        switch (lang) {
            case langOBJ.al:
                langContext.langDispatch('al');
                break;
            case langOBJ.en:
                langContext.langDispatch('en');
                break;
            case langOBJ.it:
                langContext.langDispatch('it');
                break;
            default:
                break;
        }
        setLangAnchor(null);
    };
    const handlePrimaryClick = (index) => {
        history.push(`/tag/${titles[index]}`);
    };

    return (
        <div id="navbar">
            <AppBar position="relative" elevation={2}>
                <Toolbar className="navbar-toolbar" >
                    <Link style={{ textDecoration: 'none' }} to="/">
                        <Button disableElevation variant="text" style={{ color: 'white' }}> <Typography align="center" variant="h5" >GAZZETTA.AL</Typography></Button>
                    </Link>
                    <div className="navbar-title-list">
                        <Link to="/">
                            <Button style={{ color: 'white' }}>
                                <HomeTwoTone fontSize="large" />
                            </Button>
                        </Link>
                        <ButtonGroup disableElevation variant="text" className="navbar-buttonGroup">
                            {titles.map((title, index) =>
                                <Button key={title} onClick={() => handlePrimaryClick(index)}>{title}</Button>
                            )}
                        </ButtonGroup>
                        <Button style={{ color: 'white' }} aria-controls="navbar-titles-menu" onClick={handleTitleClick}>
                            <ExpandMoreSharp fontSize="large" />
                        </Button>
                        <StyledMenu id="navbar-titles-menu" anchorEl={titleAnchor} keepMounted
                            open={Boolean(titleAnchor)} onClose={() => handleTitleClose(false)}>
                            {moreTitles.map((title, index) => <MenuItem key={title} onClick={() => handleTitleClose(index)}>{title}</MenuItem>)}
                        </StyledMenu>
                    </div>
                    <div className="navbar-links">
                        <IconButton className="navbar-links-child" style={{ color: 'white' }}>
                            <Facebook fontSize="large" />
                        </IconButton>
                        <IconButton className="navbar-links-child" style={{ color: 'red' }}>
                            <YouTube fontSize="large" />
                        </IconButton>
                        <IconButton className="navbar-links-child" style={{ color: 'orange' }}>
                            <Instagram fontSize="large" />
                        </IconButton>
                        <IconButton aria-controls="language-menu" onClick={handleLangClick} style={{ color: '#ffdfbd' }}>
                            <LanguageSharp fontSize="large" />
                            <ExpandMoreSharp />
                        </IconButton>
                        <StyledMenu id="language-menu" anchorEl={langAnchor} keepMounted
                            open={Boolean(langAnchor)} onClose={handleLangClose}>
                            {languages.map(lang => <MenuItem key={lang} onClick={() => handleLangClose(lang)}>{lang}</MenuItem>)}
                        </StyledMenu>
                    </div>
                    <div className="navbar-sandwich">
                        <MyDrawer />
                    </div>
                </Toolbar>
            </AppBar>
        </div >
    )
}

export default Navbar
