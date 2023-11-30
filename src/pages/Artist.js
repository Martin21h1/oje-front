import React, {useEffect} from 'react';
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from 'react-redux';

import {ArtistsFetch} from "../store/artists/actions";

import {makeStyles} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import {Stack} from "@mui/material";

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(2), flexDirection: 'column', alignItems: 'center',
    }, avatar: {
        marginTop: theme.spacing(2), flexDirection: 'column', alignItems: 'center', width: 56, height: 56
    }
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

    return (<Container component="main" className={classes.container}>
        <Stack
            direction="row"
            spacing={3}
            justifyContent="flex-start"
            alignItems="center"
            flexWrap="wrap" // Allow items to wrap to the next line on smaller screens
        >
            {artistsState.artists && artistsState.artists.map(item => (
                <div key={item.id}> {/* Add a unique key for each mapped element */}
                    <Avatar
                        aria-label="artist"
                        className={classes.avatar}
                        onClick={() => navigate(`/artist/${item.name}/`)}
                        src={item.image_url}
                        alt={item.name}
                    />
                    <Typography paragraph>{item.name}</Typography>
                </div>))}
        </Stack>
    </Container>);
}