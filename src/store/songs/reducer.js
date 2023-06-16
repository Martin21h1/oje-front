const initialState = {
    songs: [],
    images: [],
    foundSong: [],
    userSongs: [],
    likedSongs: [],
    loading: null
};

export default function songsReducer(state = initialState, action) {
    // console.log('action', action);
    // console.log('state', state);

    const {payload, type} = action;
    switch (type) {
        case 'LIST_SONGS':
            return {
                ...state, songs: [...state.songs, ...payload],
            };
        case 'SET_LIKE_SONG':
            return {
                ...state,
                // songs: state.songs.map(i => i.id === action.payload ? action.payload : i),
                likedSongs: state.likedSongs.filter(function (i) {
                    return i.id !== payload
                })
            };
        case 'SET_LIKED_SONG':
            return {
                ...state,
                likedSongs: [...state.likedSongs, ...payload]
            };
        case 'USER_SONG':
            return {
                ...state, userSongs: [...state.userSongs, ...payload],
            };
        case 'SET_FOUND_SONG':
            return {
                ...state, foundSong: [...payload],
            };
        case 'SET_LOADING':
            return {...state, loading: payload};
        case 'SET_IMAGES':
            return {
                ...state, images: [...state.images,...payload],
            };
            case 'CLEAR_IMAGES':
            return {
                ...state, images: [],
            };
        default:
            return state;
    }
};
