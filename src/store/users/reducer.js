const initialState = {
    username: null,
    words: [],
    languages: [],
    native_language_id: null,
    target_language_id: null
};

export default function usersReducer(state = initialState, action) {
    const {payload, type} = action;
    switch (type) {
        case 'SET_USERNAME':
            return {...state, username: payload};
        case 'SET_DICT':
            return {...state, words: [...payload]};
        case 'DELETE_WORD':
            return {
                ...state, words: state.words.filter(function (i) {
                    return i.id !== payload
                })
            };
        case 'SET_LANGUAGES':
            return {
                ...state,
                target_languages: payload.filter(function (i) {
                    return i.is_allow_target_language === true
                }),
                native_languages: payload.filter(function (i) {
                    return i.is_allow_native_language === true
                }),
            };
        case 'SET_USER_DATA':
            return {
                ...state,
                native_language_id: payload.native_language_id,
                target_language_id: payload.target_language_id,
            };
        case 'SET_NATIVE_LANG_ID':
            return {
                ...state,
                native_language_id: payload,
            };
        case 'SET_TARGET_LANG_ID':
            return {
                ...state,
                target_language_id: payload,
            };
        default:
            return state;
    }
};
