const initialState = {
    song: null,
    songs: [],
    lyricsRows: [],
    images: [],
    foundSong: null,
    foundHeaderSong: [],
    progress: null,
    artistSongs: [],
    likedSongs: [],
    loading: null,
    imageLoading: null,
    searchLoading: null
};

export default function songsReducer(state = initialState, action) {
    // console.log('action', action);
    // console.log('state', state);

    const {payload, type} = action;
    switch (type) {
        case 'LIST_SONGS':
            const newSongs = payload.filter((song) => {
                // Check if the song is already present in songs
                return !state.songs.some((existingSong) => existingSong.id === song.id);
            });

            return {
                ...state, songs: [...state.songs, ...newSongs]
            };
        case 'SET_LIKE_SONG':
            return {
                ...state, // songs: state.songs.map(i => i.id === action.payload ? action.payload : i),
                likedSongs: state.likedSongs.filter(function (i) {
                    return i.id !== payload
                })
            };
        case 'SET_LIKED_SONG':
            const newLikedSongs = payload.filter((song) => {
                // Check if the song is already present in likedSongs
                return !state.likedSongs.some((likedSong) => likedSong.id === song.id);
            });
            return {
                ...state, likedSongs: [...state.likedSongs, ...newLikedSongs]
            };
        case 'ARTIST_SONG':
            const newUserSongs = payload.filter((song) => {
                // Check if the song is already present in userSongs
                return !state.artistSongs.some((existingSong) => existingSong.id === song.id);
            });
            return {
                ...state, artistSongs: [...state.artistSongs, ...newUserSongs]
            };
        case 'LYRICS_ROWS':
            return {
                ...state, lyricsRows: payload
            };
        case 'SET_FOUND_SONG':
            return {
                ...state, foundSong: payload
            };
        case 'SET_FOUND_HEADER_SONG':
            return {
                ...state, foundHeaderSong: payload
            };
        case 'SET_SONG':
            return {
                ...state, song: payload
            };
        case 'SET_PROGRESS':
            return {
                ...state, progress: payload
            };
        case 'SET_LOADING':
            return {...state, loading: payload};
        case 'SET_IMAGE_LOADING':
            return {...state, imageLoading: payload};
        case 'SET_SEARCH_LOADING':
            return {...state, searchLoading: payload};
        case 'SET_IMAGES':
            return {
                ...state, images: [...state.images, ...payload],
            };
        case 'CLEAR_IMAGES':
            return {
                ...state, images: [],
            };
        default:
            return state;
    }
};
