import React, { useState, useContext } from 'react';
import '../css/navbar.css';
import { LangContext } from '../App';
import { SwipeableDrawer, List, Divider, Button, MenuItem, ListItem, ListItemText, IconButton } from '@material-ui/core';
import { Facebook, MenuSharp, YouTube, Instagram, LanguageSharp } from '@material-ui/icons'
import { StyledMenu } from '../materialStyles/styledMenu';
import LocalizedStrings from 'react-localization';
import { langs } from '../constants/languageStrings';
import { data } from '../constants/navbarStrings';
import { HomeTwoTone } from '@material-ui/icons';
import { Link } from 'react-router-dom';

let strings = new LocalizedStrings(data);
let langOBJ = new LocalizedStrings(langs);
function MyDrawer() {
    const langContext = useContext(LangContext);
    strings.setLanguage(langContext.langState);
    const isMobileUser = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [langAnchor, setLangAnchor] = useState(null);
    const languages = [langOBJ.al, langOBJ.en, langOBJ.it];
    const titles = [strings.politics, strings.chronicle, strings.economy, strings.sport, strings.world];
    const moreTitles = [strings.culture, strings.lifestyle, strings.technology, strings.cinema];

    const toggleDrawer = () => {
        setIsDrawerOpen(open => !open);
    }
    const handleLangClick = (e) => {
        setLangAnchor(e.currentTarget);
    }

    const changePage = () => {
        window.scrollTo({ top: 80 });
        toggleDrawer();
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
    }
    return (
        <div>
            <Button style={{ color: 'white' }} onClick={toggleDrawer}>
                <MenuSharp fontSize="large" />
            </Button>
            <SwipeableDrawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer} disableSwipeToOpen={!isMobileUser}
                onOpen={toggleDrawer} disableBackdropTransition={!iOS} disableDiscovery={iOS}>
                <ListItem component={Link} to='/' onClick={toggleDrawer} style={{ justifyContent: 'center' }} divider={true} button><HomeTwoTone fontSize="large" /></ListItem>
                <List style={{ minWidth: 200 }}>
                    {titles.map(title => <ListItem button key={title} component={Link}
                        to={`/tag/${title}`} onClick={changePage}>
                        <ListItemText >{title}</ListItemText>
                    </ListItem>)}
                    {moreTitles.map(title => <ListItem button key={title} component={Link}
                        to={`/tag/${title}`} onClick={changePage}>
                        <ListItemText >{title}</ListItemText>
                    </ListItem>)}
                </List>
                <Divider fontSize="large" />
                <br />
                <div className="navbar-drawer-icons">
                    <IconButton> <Facebook fontSize="large" style={{ color: 'blue' }} /></IconButton>
                    <IconButton> <YouTube fontSize="large" style={{ color: 'red' }} /></IconButton>
                    <IconButton>  <Instagram fontSize="large" style={{ color: 'orange' }} /></IconButton>
                    <IconButton aria-controls="language-menu-drawer" onClick={handleLangClick}><LanguageSharp fontSize="large" /></IconButton>
                    <StyledMenu id="language-menu-drawer" anchorEl={langAnchor} keepMounted
                        open={Boolean(langAnchor)} onClose={handleLangClose}>
                        {languages.map(lang => <MenuItem key={lang} onClick={() => handleLangClose(lang)}>{lang}</MenuItem>)}
                    </StyledMenu>
                </div>
            </SwipeableDrawer>
        </div>
    )
}

export default MyDrawer
