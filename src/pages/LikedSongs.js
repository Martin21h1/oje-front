import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import SongsComponent from "../components/songs/songs";
import {LikedSongsFetch} from "../store/songs/actions";

export default function LikedSongsPage() {
    const dispatch = useDispatch()
    const {songsState} = useSelector(state => state);

    useEffect(() => {
        if (!songsState.likedSongs.length) {
            dispatch(LikedSongsFetch())
        }
    }, [dispatch])
    return (
        <SongsComponent songs={songsState.likedSongs}/>
    )
}
