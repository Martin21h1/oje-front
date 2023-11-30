import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";

import {getToken} from "../store/auth/actions";
import {styled, alpha} from '@mui/material/styles';

import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import Button from '@material-ui/core/Button';
import Avatar from "@material-ui/core/Avatar";
import logo from "../static/logo.jpg";
import AccountMenu from "./AccountMenu";
import LanguageSelect from "./LanguageSelectComponent";
import GadgetDialog from "./DialogComponent";
import IconButton from "@mui/material/IconButton";
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ActiveSearch from "./SearchComponent";
import InputBase from '@mui/material/InputBase';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    }, menuButton: {
        marginRight: theme.spacing(2),
    }, title: {
        flexGrow: 1,
    },
}));

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));


export default function Header() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {authState} = useSelector(state => state);

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setIsDrawerOpen(open);
    };

    const handleOpenClick = (path) => {
        toggleDrawer(false)

        if (path) {
            navigate(path);
        }
    }
    useEffect(() => {
        if (!authState.token) {
            dispatch(getToken());
        }

    }, []);

    return (<div className={classes.root}>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleDrawer(true)} // Open drawer when clicked
                >
                    <MenuIcon/>
                </IconButton>

                <Avatar
                    aria-label="recipe"
                    alt="logo"
                    src={logo}
                    onClick={() => navigate("/")}>
                </Avatar>
                <ActiveSearch/>
                <Typography variant="h6" onClick={() => navigate("/")} className={classes.title}>
                    {/*Project oje*/}
                </Typography>

                <LanguageSelect/>
                {authState.token ? <div>
                        <AccountMenu/>
                    </div> : // <div>
                    //     <Button size='small' onClick={() => navigate("/login")} color="inherit">Sign In</Button>
                    //     <Button size='small' onClick={() => navigate("/signup")} color="inherit">Sign Up</Button>
                    // </div>

                    <div>
                        <Button size='small' onClick={() => navigate("/login")} color="inherit"> LogIn {<LoginIcon
                            fontSize='small'/>}</Button>

                    </div>}
            </Toolbar>
        </AppBar>
        <SwipeableDrawer
            anchor="left" // Draw from the left side
            open={isDrawerOpen}
            onClose={toggleDrawer(false)} // Close drawer when clicked outside
            onOpen={toggleDrawer(true)} // Open drawer when swiped
        >
            <List>
                <ListItem key={'artists'} onClick={() => handleOpenClick('/artists')} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <AccountBoxIcon/>
                        </ListItemIcon>
                        <ListItemText primary={'Artists'}/>
                    </ListItemButton>
                </ListItem>
            </List>

        </SwipeableDrawer>
        <GadgetDialog/>
    </div>);
};
