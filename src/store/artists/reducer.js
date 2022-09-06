const initialState = {
    artists: []
};


export default function artistsReducer(state = initialState, action) {
    // console.log('action', action);
    // console.log('state', state);

    const {payload, type} = action;
    switch (type) {
        case 'LIST_ARTISTS':
            return {
                ...state, artists: [...action.payload],
            };
        default:
            return state;
    }
}
