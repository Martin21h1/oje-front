import Api from '../../api'
import {error_handler, setErrorNull} from "../errors/actions";

export const updateUserData = (data, navigate) => {
    return dispatch => {
        Api.updateUserData(data)
            .then(data => {
                if (data.error) {
                    error_handler(dispatch, data)
                } else {
                    dispatch(setErrorNull())
                    navigate('/');
                    dispatch(setUsername(data.name));
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
};

export const addToDict = (data) => {
    return dispatch => {
        return Api.addToDict(data)
            .then(data => {
                if (data.error) {
                    error_handler(dispatch, data)
                } else {
                    dispatch(setErrorNull())
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
};

export const userGetDict = () => {
    return dispatch => {
        return Api.fetchDict()
            .then(data => {
                if (data.error) {
                } else {
                    dispatch({
                        type: 'SET_DICT',
                        payload: data.data,
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
};

export const GetLanguages = () => {
    return dispatch => {
        return Api.fetchLanguages()
            .then(data => {
                if (data.error) {
                } else {
                    dispatch({
                        type: 'SET_LANGUAGES',
                        payload: data.data,
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
};

export const DeleteWord = (id) => {
    return dispatch => {
        return Api.deleteWord(id)
            .then(data => {
                if (data.error) {
                } else {
                    dispatch(
                        {
                            type: 'DELETE_WORD',
                            payload: id
                        }
                    )
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
};

export const getProfileFetch = () => {
    return dispatch => {
        return Api.fetchDataUser()
            .then(data => {
                if (data.error) {
                } else {
                    dispatch(setUsername(data.data.username));
                    dispatch({
                        type: 'SET_USER_DATA',
                        payload: data.data
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
};

export const SetPasswordFetch = (user, navigate) => {
    return dispatch => {
        return Api.setPassword(user)
            .then(data => {
                if (data.error) {
                    error_handler(dispatch, data)
                } else {
                    dispatch(setErrorNull())
                    navigate('/')
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
};

export const ResetPasswordFetch = (user, navigate) => {
    return dispatch => {
        return Api.resetPassword(user)
            .then(data => {
                if (data.error) {
                    error_handler(dispatch, data)
                } else {
                    dispatch(setErrorNull())
                    navigate('/')
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
};

export const setNativeLanguageId = langId => ({
    type: 'SET_NATIVE_LANG',
    payload: langId

});

export const setTargetLanguageId = langId => ({
    type: 'SET_TARGET_LANG',
    payload: langId
});

export const setUsername = username => ({
    type: 'SET_USERNAME',
    payload: username
});
