import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import SongsComponent from "../components/songs/songs";
import {FindSongFetch} from "../store/songs/actions";

export default function FoundSongPage(props) {
    const dispatch = useDispatch()
    const {songsState} = useSelector(state => state);

    useEffect(() => {

        const {artistName, songName} = props.match.params;
        dispatch(FindSongFetch({title: songName, artist: artistName}))

    }, [dispatch])
    return (
        <SongsComponent songs={songsState.foundSong}/>
    )
}