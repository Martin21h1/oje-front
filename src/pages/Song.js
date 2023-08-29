import React from 'react';
import {useSelector} from 'react-redux';

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
export default function SongPage() {
    const {songsState} = useSelector(state => state);
    const classes = useStyles();



    return (
        <Container component="main" className={classes.container}>
            {songsState && !songsState.song ? <CircularProgress /> : <Song item={songsState.song} />}
        </Container>
    );
};
