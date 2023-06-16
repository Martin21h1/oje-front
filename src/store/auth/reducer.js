const initialState = {
    token: null,
};

export default function authReducer(state = initialState, action) {
    const {payload, type} = action;
    // console.log('payload', payload)
    // console.log('action', action)
    switch (type) {
        case 'LOGOUT_USER':
            return {...state, token: null};
        case 'SET_TOKEN':
            return {...state, token: {...payload}};
        default:
            return state;
    }
};
