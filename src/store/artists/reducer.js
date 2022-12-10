const initialState = {
    artists: []
};

export default function artistsReducer(state = initialState, action) {
    const {type} = action;
    switch (type) {
        case 'LIST_ARTISTS':
            return {
                ...state, artists: [...action.payload],
            };
        default:
            return state;
    }
}
