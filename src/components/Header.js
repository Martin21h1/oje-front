import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import {LogoutUser, getToken} from "../store/users/actions"
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {useHistory} from "react-router";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Header() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const history = useHistory();
    const [isOpened, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    useEffect(() => {
        if (!localStorage.token) {
            dispatch(getToken());
        }
    }, [])

    const handleOpenClick = event => {
        setOpen((isOpened) => !isOpened);
        setAnchorEl(event.currentTarget);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" onClick={() => history.push("/")} className={classes.title}>
                        Project oje
                    </Typography>
                    {localStorage.token ?
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenClick}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                            <Menu
                                onClose={handleOpenClick}
                                anchorEl={anchorEl}
                                open={isOpened}
                            >
                                <Link to={`/profile`}>
                                    <MenuItem onClick={handleOpenClick}>Profile</MenuItem>
                                </Link>
                                <Link to={`/artists`}>
                                    <MenuItem onClick={handleOpenClick}>Artists</MenuItem>
                                </Link>
                                <Link to={`/dict`}>
                                    <MenuItem onClick={handleOpenClick}>My Dictionary</MenuItem>
                                </Link>
                                <Link to={`/likedSongs`}>
                                    <MenuItem onClick={handleOpenClick}>Liked Songs</MenuItem>
                                </Link>
                                <MenuItem onClick={() => dispatch(LogoutUser(history))}>Sign out</MenuItem>
                            </Menu>
                        </div> :
                        <div>
                            <Button onClick={() => history.push("/login/")} color="inherit">Sign In</Button>
                            <Button onClick={() => history.push("/signup/")} color="inherit">Sign Up</Button>
                        </div>
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}
