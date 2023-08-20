import Api from '../../api';
import {error_handler, setErrorNull} from "../errors/actions";

export const fetchSongs = (page, limit) => {
    return dispatch => {
        dispatch(setLoading(true))

        return Api.fetchSongs(page, limit)
            .then(payload => {
                if (payload.error) {
                } else {
                    dispatch(setLoading(false))
                    dispatch({
                        type: 'LIST_SONGS',
                        payload: payload.data,
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    };
};

export const fetchLikedSongs = (page, limit) => {
    return dispatch => {
        return Api.fetchLikedSongs(page, limit)
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
    };
};

export const searchSong = (song, navigate) => {
    return dispatch => {
        dispatch(setSearchLoading(true))
        return Api.searchSong(song.title, song.artist)
            .then(data => {
                if (data.error) {
                    error_handler(dispatch, data)
                    dispatch(setSearchLoading(false))

                } else {
                    dispatch(setErrorNull())
                    dispatch(setSearchLoading(false))
                    dispatch({
                        type: 'SET_FOUND_SONG',
                        payload: data.data[0],
                    });
                    navigate(`/song/${song.title}/artist/${song.artist}`)
                }
            })
            .catch(error => {
                console.log(error);
            })
    };
};
export const progressSong = (song) => {
    return dispatch => {
        return Api.progressSong(song.id)
            .then(data => {
                if (data.error) {
                    error_handler(dispatch, data)
                } else {
                    dispatch({
                        type: 'SET_PROGRESS',
                        payload: data.data,
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    };
};

export const likeSong = (id, navigate) => {
    return dispatch => {
        return Api.likeSong(id)
            .then(data => {
                if (data.error) {
                    navigate('/login')
                } else {
                    dispatch({
                        type: 'SET_LIKE_SONG',
                        payload: id,
                    });
                }

            })
            .catch(error => {
                console.log(error);
            })
    };
};

export const FetchSongsByArtist = (artist, page, limit) => {
    return dispatch => {
        return Api.fetchSongsByArtist(artist, page, limit)
            .then(payload => {
                dispatch({
                    type: 'ARTIST_SONG',
                    payload: payload.data
                });
                return payload;
            })
            .catch(error => {
                console.log(error);
            })
    };
};

export const LikeImage = (imageId, songId, wordId) => {
    return dispatch => {
        return Api.likeImage(imageId, songId, wordId)
            .then(payload => {
                return payload;
            })
            .catch(error => {
                console.log(error);
            })
    };
};

export const fetchImages = (word, songId, page) => {
    return dispatch => {
        return Api.fetchImages(word, songId, page)
            .then(payload => {
                dispatch({
                    type: 'SET_IMAGES',
                    payload: payload.data
                })
                return payload;
            })
            .catch(error => {
                console.log(error);
            })
    };
};

export const clearImages = () => {
    return dispatch => {

        dispatch({
            type: 'CLEAR_IMAGES',
        })

    };
};


const setLoading = (payload) => ({
    type: 'SET_LOADING',
    payload: payload
});
const setSearchLoading = (payload) => ({
    type: 'SET_SEARCH_LOADING',
    payload: payload
});