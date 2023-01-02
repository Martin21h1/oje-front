const initialState = {
    songs: [],
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
                ...state, songs: [...action.payload],
            };
        case 'SET_LIKE_SONG':
            return {
                ...state,
                // songs: state.songs.map(i => i.id === action.payload ? action.payload : i),
                likedSongs: state.likedSongs.filter(function (i) {
                    return i.id !== action.payload
                })
            };
        case 'SET_LIKED_SONG':
            return {
                ...state,
                likedSongs: [...action.payload]
            };
        case 'USER_SONG':
            return {
                ...state, userSongs: [...action.payload],
            };
        case 'SET_FOUND_SONG':
            return {
                ...state, foundSong: [...action.payload],
            };
        case 'SET_LOADING':
            return {...state, loading: action.payload};
        default:
            return state;
    }
};
