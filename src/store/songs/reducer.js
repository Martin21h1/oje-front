const initialState = {
    songs: [],
    foundSong: [],
    userSongs: [],
    likedSongs: [],
    loading: null,
    err_fields: {},
    err_message: ''
};

export default function songsReducer(state = initialState, action) {
    console.log('action', action);
    console.log('state', state);

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

        case 'SET_ERR_FIELDS':
            return {
                ...state,
                err_fields: action.payload,
            };
        case 'SET_ERR_MESSAGE':
            return {
                ...state,
                err_message: action.payload,
            };
        default:
            return state;
    }
}
