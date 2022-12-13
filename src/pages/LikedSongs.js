import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import SongsComponent from "../components/songs";
import {fetchLikedSongs} from "../store/songs/actions";

export default function LikedSongsPage() {
    const dispatch = useDispatch()
    const {songsState} = useSelector(state => state);

    useEffect(() => {
        if (!songsState.likedSongs.length) {
            dispatch(fetchLikedSongs())
        }
    }, [])
    return (
        <SongsComponent songs={songsState.likedSongs}/>
    )
}
