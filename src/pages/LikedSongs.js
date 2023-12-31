import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import SongsComponent from "../components/Songs";
import {fetchLikedSongs} from "../store/songs/actions";

export default function LikedSongsPage() {
    const dispatch = useDispatch()
    const {songsState} = useSelector(state => state);

    return (<SongsComponent
        dispatch={dispatch}
        fetch={fetchLikedSongs}
        state={songsState.likedSongs}
    />);
};
