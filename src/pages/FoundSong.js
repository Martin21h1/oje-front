import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router";
import {useSelector, useDispatch} from 'react-redux';

import {searchSong} from "../store/songs/actions";
import Song from "../components/Song";

import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import {CircularProgress} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(2),
        flexDirection: 'column',
        alignItems: 'center',
    }
}));


export default function FoundSongPage() {
    const dispatch = useDispatch();
    const {songsState} = useSelector(state => state);
    const {artistName, songName} = useParams();
    const classes = useStyles();
    const navigate = useNavigate()

    useEffect(() => {
        if (!songsState.foundSong) {
            dispatch(searchSong({title: songName, artist: artistName}, navigate))
        }
    }, []);


    return (
        <Container component="main" className={classes.container}>
            {songsState && !songsState.foundSong ? <CircularProgress /> : <Song item={songsState.foundSong} />}
        </Container>
    );
};
