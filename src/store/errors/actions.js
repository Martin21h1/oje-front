export function error_handler(dispatch, data) {
    if (data.error.fields) {
        dispatch(setErrFields(data));
    }
    if (data.error.message) {
        dispatch(setErrMessage(data));
    }
}

export const setErrFields = data => ({
    type: 'SET_ERR_FIELDS', payload: data.error.fields
});

export const setErrMessage = data => ({
    type: 'SET_ERR_MESSAGE', payload: data.error.message
});

export const setErrorNull = () => ({
    type: 'SET_ERROR_NULL'
});
