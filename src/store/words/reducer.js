const initialState = {
    word: '', sentence: '', loading: null
};

export default function wordsReducer(state = initialState, action) {
    switch (action.type) {
        case 'WORD':
            return {...state, word: action.payload};
        case 'SENTENCE':
            return {...state, sentence: action.payload};
        case 'SET_LOADING':
            return {...state, loading: action.payload};
        default:
            return state;
    }
};
