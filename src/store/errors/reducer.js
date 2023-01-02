const initialState = {
    fields: {},
    message: ''
};

export default function errorsReducer(state = initialState, action) {
    // console.log('action', action);
    // console.log('state', state);

    const {payload, type} = action;
    switch (type) {
        case 'SET_ERR_FIELDS':
            return {
                ...state,
                fields: action.payload,
            };
        case 'SET_ERR_MESSAGE':
            return {
                ...state,
                message: action.payload,
            };
        case 'SET_ERROR_NULL':
            return {
                ...state,
                fields: {},
                message: ''
            };
        default:
            return state;
    }
};
