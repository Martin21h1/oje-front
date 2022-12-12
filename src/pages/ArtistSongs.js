import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import SongsComponent from "../components/songs";
import {FetchSongsByArtist} from "../store/songs/actions";

export default function ArtistSongsPage(props) {
    const dispatch = useDispatch()
    const {songsState} = useSelector(state => state);

    useEffect(() => {
        const {name} = props.match.params;
        dispatch(FetchSongsByArtist(name))
    })

    return (
        <SongsComponent songs={songsState.userSongs}/>
    )
}
