import React, { useState } from 'react';
import '../css/navbar.css';
import {
    Toolbar, AppBar, Typography, Button, ButtonGroup, Menu, MenuItem,
    withStyles, SwipeableDrawer, List, ListItemText, ListItem, Divider
} from '@material-ui/core';
import {
    HomeTwoTone, LanguageSharp, ExpandMoreSharp,
    Facebook, YouTube, Instagram, MenuSharp
} from '@material-ui/icons';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));
function Navbar() {
    const titles = ["POLITIKE", "AKTUALITET", "EKONOMI", "SPORT", "BOTA"];
    const moreTitles = ["KULTURE", "LIFESTYLE", "TEKNOLOGJI", "KINEMA"];
    const languages = ["SHQIP", "ENGLISH", "ITALIANO"];
    const [titleAnchor, setTitleAnchor] = useState(null);
    const [langAnchor, setLangAnchor] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const isMobileUser = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const handleTitleClick = (e) => {
        setTitleAnchor(e.currentTarget);
    }
    const handleTitleClose = () => {
        setTitleAnchor(null);
    }
    const handleLangClick = (e) => {
        setLangAnchor(e.currentTarget);
    }
    const handleLangClose = () => {
        setLangAnchor(null);
    }
    const toggleDrawer = () => {
        setIsDrawerOpen(open => !open);
    }
    return (
        <div >
            <AppBar position="fixed" elevation={2}>
                <Toolbar className="navbar-toolbar" >
                    <Typography variant="h5" className="navbar-logo">GAZZETTA.AL</Typography>
                    <div className="navbar-title-list">
                        <Button style={{ color: 'white' }}>
                            <HomeTwoTone fontSize="large" />
                        </Button>
                        <ButtonGroup disableElevation variant="text" className="navbar-buttonGroup">
                            {titles.map(title =>
                                <Button key={title}>{title}</Button>
                            )}
                        </ButtonGroup>
                        <Button style={{ color: 'white' }} aria-controls="navbar-titles-menu" onClick={handleTitleClick}>
                            <ExpandMoreSharp fontSize="large" />
                        </Button>
                        <StyledMenu id="navbar-titles-menu" anchorEl={titleAnchor} keepMounted
                            open={Boolean(titleAnchor)} onClose={handleTitleClose}>
                            {moreTitles.map(title => <MenuItem key={title} onClick={handleTitleClose}>{title}</MenuItem>)}
                        </StyledMenu>
                    </div>
                    <div className="navbar-links">
                        <Button className="navbar-links-child" style={{ color: 'white' }}>
                            <Facebook fontSize="large" />
                        </Button>
                        <Button className="navbar-links-child" style={{ color: 'red' }}>
                            <YouTube fontSize="large" />
                        </Button>
                        <Button className="navbar-links-child" style={{ color: 'orange' }}>
                            <Instagram fontSize="large" />
                        </Button>
                        <Button aria-controls="language-menu" onClick={handleLangClick} style={{ color: '#ffdfbd' }}>
                            <LanguageSharp fontSize="large" />
                            <ExpandMoreSharp />
                        </Button>
                        <StyledMenu id="language-menu" anchorEl={langAnchor} keepMounted
                            open={Boolean(langAnchor)} onClose={handleLangClose}>
                            {languages.map(lang => <MenuItem key={lang} onClick={handleLangClose}>{lang}</MenuItem>)}
                        </StyledMenu>
                    </div>
                    <div className="navbar-sandwich">
                        <Button style={{ color: 'white' }} onClick={toggleDrawer}>
                            <MenuSharp fontSize="large" />
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
            <SwipeableDrawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer} disableSwipeToOpen={!isMobileUser}
                onOpen={toggleDrawer} disableBackdropTransition={!iOS} disableDiscovery={iOS}>
                <List style={{ minWidth: 200 }}>
                    {titles.map(title => <ListItem button key={title}> <ListItemText >{title}</ListItemText></ListItem>)}
                    {moreTitles.map(title => <ListItem button key={title}> <ListItemText >{title}</ListItemText></ListItem>)}
                </List>
                <Divider fontSize="large" />
                <br />
                <div className="navbar-drawer-icons">
                    <Button> <Facebook fontSize="large" style={{ color: 'blue' }} /></Button>
                    <Button> <YouTube fontSize="large" style={{ color: 'red' }} /></Button>
                    <Button>  <Instagram fontSize="large" style={{ color: 'orange' }} /></Button>
                    <Button aria-controls="language-menu-drawer" onClick={handleLangClick}><LanguageSharp fontSize="large" /></Button>
                    <StyledMenu id="language-menu-drawer" anchorEl={langAnchor} keepMounted
                        open={Boolean(langAnchor)} onClose={handleLangClose}>
                        {languages.map(lang => <MenuItem key={lang} onClick={handleLangClose}>{lang}</MenuItem>)}
                    </StyledMenu>
                </div>
            </SwipeableDrawer>
        </div >
    )
}

export default Navbar
