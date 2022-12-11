import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import SongsComponent from "../components/songs/songs";
import {searchSong} from "../store/songs/actions";

export default function FoundSongPage(props) {
    const dispatch = useDispatch()
    const {songsState} = useSelector(state => state);

    useEffect(() => {

        const {artistName, songName} = props.match.params;
        dispatch(searchSong({title: songName, artist: artistName}))
    }, [])

    return (
        <SongsComponent songs={songsState.foundSong}/>
    )
}