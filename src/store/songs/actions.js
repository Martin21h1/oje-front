import Api from '../../api'

export const fetchSongs = (page, limit) => {
    return dispatch => {
        return Api.fetchSongs(page, limit)
            .then(data => data.json())
            .then(payload => {
                if (payload.error) {
                } else {
                    dispatch({
                        type: 'LIST_SONGS',
                        payload: payload.data,
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
};

export const fetchLikedSongs = () => {
    return dispatch => {
        return Api.fetchLikedSongs()
            .then(data => data.json())
            .then(payload => {
                if (payload.error) {
                } else {
                    dispatch({
                        type: 'SET_LIKED_SONG',
                        payload: payload.data,
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
};

export const searchSong = (song, history) => {
    return dispatch => {
        dispatch(setLoading(true))
        return Api.searchSong(song.title, song.artist)
            .then(data => data.json())
            .then(payload => {
                if (payload.error) {
                } else {
                    dispatch(setLoading(false))
                    dispatch({
                        type: 'SET_FOUND_SONG',
                        payload: payload.data,
                    });
                    history.push(`/song/${song.title}/artist/${song.artist}`)
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
};

export const likeSong = (id) => {
    return dispatch => {
        return Api.likeSong(id)
            .then(payload => {
                dispatch({
                    type: 'SET_LIKE_SONG',
                    payload: payload,
                });
            })
            .catch(error => {
                console.log(error);
            })
    }
};

export const FetchSongsByArtist = (artist) => {
    return dispatch => {
        return Api.fetchSongsByArtist(artist)
            .then(data => data.json())
            .then(payload => {
                dispatch({
                    type: 'USER_SONG',
                    payload: payload.data
                });
                return payload;
            })
            .catch(error => {
                console.log(error);
            })
    }
};


const setLoading = (payload) => ({
    type: 'SET_LOADING',
    payload: payload
});