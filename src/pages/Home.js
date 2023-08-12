import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import SearchForm from "../components/SearchForm";
import {fetchSongs, searchSong} from "../store/songs/actions";
import SongsComponent from "../components/Songs";

import {makeStyles} from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";


const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(2),
        flexDirection: 'column',
        alignItems: 'center',
    }
}));


export default function Songs() {
    const dispatch = useDispatch()
    const {songsState} = useSelector(state => state);
    // const {authState} = useSelector(state => state);
    const classes = useStyles();

    return (
        <Container component="main" className={classes.container}>
            <SearchForm onSubmit={searchSong}/>
            {/*{authState.token ? <SearchForm onSubmit={searchSong}/> : null}*/}
            <SongsComponent dispatch={dispatch} fetch={fetchSongs} state={songsState.songs}/>
        </Container>
    )
}
