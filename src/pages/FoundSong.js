import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import SongsComponent from "../components/songs";
import {searchSong} from "../store/songs/actions";
import {CircularProgress} from "@material-ui/core";

export default function FoundSongPage(props) {
    const dispatch = useDispatch()
    const {songsState} = useSelector(state => state);

    useEffect(() => {
        const {artistName, songName} = props.match.params;
        dispatch(searchSong({title: songName, artist: artistName}))
    })

    return (
        songsState.loading ? (<CircularProgress/>) :
            (<SongsComponent songs={songsState.foundSong}/>)
    )
}
