import Api from '../../api'

export const signUpUser = (user, navigate) => {
    return dispatch => {
        return Api.createUser(user)
            .then(data => data.json())
            .then(data => {
                if (data.error) {
                    if (data.error.fields) {
                        dispatch(setErrFields(data))
                    }
                    if (data.error.message) {
                        dispatch(setErrMessage(data))
                    }
                } else {
                    // dispatch(SetUserData(data));
                    dispatch(setToken(data));
                    localStorage.setItem('token', data.jwt);
                    localStorage.setItem('refreshToken', data.refresh_jwt);
                    // dispatch(setUsername(data.username));
                    navigate('/secondStep/')
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
};

export const signInUser = (user, navigate) => {
    return dispatch => {
        return Api.loginUser(user)
            .then(data => data.json())
            .then(data => {
                if (data.error) {
                    if (data.error.fields) {
                        dispatch(setErrFields(data))
                    }
                    if (data.error.message) {
                        dispatch(setErrMessage(data))
                    }
                } else {
                    localStorage.setItem('token', data.jwt);
                    localStorage.setItem('refreshToken', data.refresh_jwt);
                    dispatch(setToken(data.jwt));
                    // dispatch(setUsername(data.username));
                    navigate('/')
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
};

export const userLoginWithGoogle = () => {
    return dispatch => {
        Api.loginWithGoogleUser()
            .then(data => data.json())
            .then(data => {
                if (data.error) {
                } else {
                    window.location.replace(data['redirect_url'])
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
};

export const getToken = (navigate) => {
    return dispatch => {
        Api.fetchTokenUser()
            .then(data => data.json())
            .then(data => {
                if (data.error) {
                } else {
                    dispatch(SetUserData(data));
                    dispatch(setToken(data));
                    localStorage.setItem('token', data.jwt);
                    // dispatch(setUsername(user.username));
                    // localStorage.setItem('username', user.username);
                    navigate('/')
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
};

export const updateUserData = (data, navigate) => {
    return dispatch => {
        Api.updateUserData(data)
            .then(data => data.json())
            .then(data => {
                if (data.error) {
                    if (data.error.fields) {
                        dispatch(setErrFields(data))
                    }
                    if (data.error.message) {
                        dispatch(setErrMessage(data))
                    }
                } else {
                    navigate('/');

                    // dispatch(setUsername(user.username));
                    // localStorage.setItem('username', user.username);
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
            .then(data => data.json())
            .then(data => {
                if (data.error) {
                    if (data.error.fields) {
                        dispatch(setErrFields(data))
                    }
                    if (data.error.message) {
                        dispatch(setErrMessage(data))
                    }
                } else {
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
            .then(data => data.json())
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
            .then(data => data.json())
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
            .then(data => data.json())
            .then(data => {
                if (data.error) {
                } else {
                    dispatch(setUsername(data.data.username));
                    dispatch({
                        type: 'SET_USER_DATA1',
                        payload: data.data
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
};

export const LogoutUser = (navigate) => {
    return dispatch => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        return Api.logOutUser()
            .then(data => {
                if (data.error) {
                } else {
                    dispatch({
                        type: 'LOGOUT_USER'
                    })
                    window.location.replace('/')
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
            .then(data => data.json())
            .then(data => {
                if (data.error) {
                    if (data.error.fields) {
                        dispatch(setErrFields(data))
                    }
                    if (data.error.message) {
                        dispatch(setErrMessage(data))
                    }
                } else {
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
            .then(data => data.json())
            .then(data => {
                if (data.error) {
                    if (data.error.fields) {
                        dispatch(setErrFields(data))
                    }
                    if (data.error.message) {
                        dispatch(setErrMessage(data))
                    }
                } else {
                    navigate('/')
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
};

export const setNativeLanguageId = (langId) => {
    return {
        type: 'SET_NATIVE_LANG',
        payload: langId
    }
}

export const setTargetLanguageId = (langId) => {
    return {
        type: 'SET_TARGET_LANG',
        payload: langId
    }
}

export const setUsername = username => ({
    type: 'SET_USERNAME',
    payload: username
});

export const setErrFields = data => ({
    type: 'SET_ERR_FIELDS',
    payload: data.error.fields
});

export const setErrMessage = data => ({
    type: 'SET_ERR_MESSAGE',
    payload: data.error.message
});

const SetUserData = userObj => ({
    type: 'SET_USER_DATA',
    payload: userObj
});

const setToken = (payload) => ({
    type: 'SET_TOKEN',
    payload
});
