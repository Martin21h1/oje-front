import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import SongsComponent from "../components/songs";
import {searchSong} from "../store/songs/actions";
import {CircularProgress} from "@material-ui/core";
import {useParams} from "react-router";

export default function FoundSongPage() {
    const dispatch = useDispatch()
    const {songsState} = useSelector(state => state);
    const {artistName, songName} = useParams()

    useEffect(() => {
        dispatch(searchSong({title: songName, artist: artistName}))
    }, [])

    return (
        songsState.loading ? (<CircularProgress/>) :
            (<SongsComponent songs={songsState.foundSong}/>)
    )
}
