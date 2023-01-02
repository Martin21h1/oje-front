import React from 'react';
import {useParams} from "react-router";
import {useSelector, useDispatch} from 'react-redux';

import SongsComponent from "../components/songs";
import {FetchSongsByArtist} from "../store/songs/actions";

export default function ArtistSongsPage() {
    const dispatch = useDispatch();
    const {songsState} = useSelector(state => state);
    const {name} = useParams();

    return (
        <SongsComponent
            dispatch={dispatch}
            fetch={FetchSongsByArtist}
            state={songsState.userSongs}
            name={name}
        />
    );
};
