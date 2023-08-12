import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";

import {getToken} from "../store/auth/actions";

import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Button from '@material-ui/core/Button';
import Avatar from "@material-ui/core/Avatar";
import logo from "../static/logo.jpg";
import AccountMenu from "./AccountMenu";
import LanguageSelect from "./LanguageSelectComponent";
import GadgetDialog from "./DialogComponent";

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
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {authState} = useSelector(state => state);

    useEffect(() => {
        if (!authState.token) {
            dispatch(getToken());
        }

    }, []);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    {/*<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">*/}
                    {/*    <MenuIcon/>*/}
                    {/*</IconButton>*/}

                    <Avatar aria-label="recipe" alt="logo" src={logo} onClick={() => navigate("/")}>
                    </Avatar>


                    <Typography variant="h6" onClick={() => navigate("/")} className={classes.title}>
                        {/*Project oje*/}
                    </Typography>
                    <LanguageSelect/>
                    {authState.token ?
                        <div>
                            <AccountMenu/>
                        </div> :
                        <div>
                            <Button onClick={() => navigate("/login")} color="inherit">Sign In</Button>
                            <Button onClick={() => navigate("/signup")} color="inherit">Sign Up</Button>
                        </div>
                    }
                </Toolbar>
            </AppBar>
            <GadgetDialog/>

        </div>
    );
};
