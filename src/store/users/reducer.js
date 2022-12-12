const initialState = {
    currentUser: {},
    auth: {},
    username: null,
    words: [],
    languages: [],
    native_language_id: null,
    target_language_id: null,
    err_fields: {},
    err_message: ''
};

export default function usersReducer(state = initialState, action) {
    // console.log(action)
    const {payload, type} = action;
    switch (type) {
        case 'SET_USERNAME':
            return {...state, username: payload};
        case 'SET_USER_DATA':
            return {...state, currentUser: {...action.payload}};
        case 'LOGOUT_USER':
            return {...state, auth: {}};
        case 'SET_TOKEN':
            return {...state, auth: {...action.payload}};
        case 'SET_DICT':
            return {...state, words: [...action.payload]};
        case 'SET_LANGUAGES':
            return {
                ...state,
                target_languages: action.payload.filter(function (i) {
                    return i.is_allow_target_language === true
                }),
                native_languages: action.payload.filter(function (i) {
                    return i.is_allow_native_language === true
                }),
            };
            case 'SET_USER_DATA1':
            return {
                ...state,
                native_language_id: action.payload.native_language_id,
                target_language_id: action.payload.target_language_id,
            };
            case 'SET_NATIVE_LANG':
            return {
                ...state,
                native_language_id: action.payload,
            };
            case 'SET_TARGET_LANG':
            return {
                ...state,
                target_language_id: action.payload,
            };
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
