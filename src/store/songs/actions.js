import Api from '../../api'


export const SongsFetch = (page, limit) => {
    return dispatch => {
        return Api.fetchSongs(page, limit)
            .then(data => data.json())

            .then(payload => {
                if (payload.message) {
                    //Тут прописываем логику
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

export const LikedSongsFetch = () => {
    return dispatch => {
        return Api.fetchLikedSongs()
            .then(data => data.json())

            .then(payload => {
                if (payload.message) {
                    //Тут прописываем логику
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

export const FindSongFetch = (song) => {
    return dispatch => {
        return Api.fetchFindSong(song.title, song.artist)
            .then(data => data.json())
            .then(payload => {
                if (payload.message) {
                } else {
                    dispatch({
                        type: 'SET_FOUND_SONG',
                        payload: payload.data,
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
};

export const LikeSongsFetch = (id) => {
    return dispatch => {
        return Api.fetchLikeSong(id)
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
