const initialState = {
    word: '',

};

export default function wordsReducer(state = initialState, action) {
    // console.log('action', action);
    // console.log('state', state);

    switch (action.type) {
        case 'WORD':
            return {...state, word: action.payload};

        default:
            return state;
    }
}
