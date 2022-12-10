const initialState = {
    word: '',

};

export default function wordsReducer(state = initialState, action) {
    switch (action.type) {
        case 'WORD':
            return {...state, word: action.payload};
        default:
            return state;
    }
}
