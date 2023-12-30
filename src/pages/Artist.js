import React, {useEffect} from 'react';
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from 'react-redux';

import {ArtistsFetch} from "../store/artists/actions";

import {makeStyles} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import {ListItemAvatar} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        marginTop: theme.spacing(2),
        width: 56,
        height: 56,
        cursor: 'pointer'
    },
    listItem: {
        width: '25%', // Default width for larger screens
        boxSizing: 'border-box',
        [theme.breakpoints.down('xs')]: {
            width: '50%', // Two columns on small screens
        },
    },
}));

export default function Artists() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {artistsState} = useSelector(state => state);
    const navigate = useNavigate();

    useEffect(() => {
        if (!artistsState.artists.length) {
            dispatch(ArtistsFetch());
        }
    }, [artistsState.artists.length]);

    return (
        <Container component="main" className={classes.container}>
            <List style={{display: 'flex', flexWrap: 'wrap', width: '100%'}}>
                {artistsState.artists &&
                    artistsState.artists.map(item => (
                        <ListItem
                            key={item.name}
                            className={classes.listItem}
                        >
                            <ListItemAvatar>
                                <Avatar
                                    aria-label="artist"
                                    className={classes.avatar}
                                    onClick={() => navigate(`/artist/${item.name}/`)}
                                    src={item.image_url}
                                    alt={item.name}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={item.name}
                                style={{
                                    marginLeft: '8px',
                                    marginBottom: '-8px',
                                    textAlign: 'left',
                                }}
                            />
                        </ListItem>
                    ))}
            </List>
        </Container>
    );
}
