import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import SongsComponent from "../components/songs";
import {FetchSongsByArtist} from "../store/songs/actions";
import {useParams} from "react-router";

export default function ArtistSongsPage(props) {
    const dispatch = useDispatch();
    const {songsState} = useSelector(state => state);
    const {name} = useParams();

    useEffect(() => {
        console.log(props)
        dispatch(FetchSongsByArtist(name))
    }, [])

    return (
        <SongsComponent songs={songsState.userSongs}/>
    )
}
