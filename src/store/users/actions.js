import Api from '../../api'

export const userSignUpFetch = (user, history) => {
    return dispatch => {
        return Api.createUser(user)
            .then(data => data.json())
            .then(data => {
                if (data.message) {
                } else {
                    dispatch(SetUserData(data));
                    dispatch(setToken(data));
                    localStorage.setItem('token', data.jwt);
                    dispatch(setUsername(user.username));
                    localStorage.setItem('username', user.username);
                    history.replace('/secondStep/')
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
};

export const userLoginFetch = (user, history) => {
    return dispatch => {
        return Api.loginUser(user)
            .then(data => data.json())
            .then(data => {
                if (data.message) {
                } else {
                    localStorage.setItem('token', data.jwt);
                    dispatch(setToken(data.jwt));
                    dispatch(setUsername(user.username));
                    localStorage.setItem('username', user.username);
                    history.replace('/')
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
};

export const userLoginWithGoogleFetch = () => {
    return dispatch => {
        Api.loginWithGoogleUser()
            .then(data => data.json())
            .then(data => {
                if (data.message) {
                } else {
                    window.location.replace(data['redirect_url'])
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
};

export const userGetTokenFetch = (history) => {
    return dispatch => {
        Api.fetchTokenUser()
            .then(data => data.json())
            .then(data => {
                if (data.message) {
                } else {
                    dispatch(SetUserData(data));
                    dispatch(setToken(data));
                    localStorage.setItem('token', data.jwt);
                    // dispatch(setUsername(user.username));
                    // localStorage.setItem('username', user.username);
                    history.replace('/')
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
};

export const updateUserData = (data) => {
    return dispatch => {
        Api.updateUserData(data)
            .then(data => data.json())
            .then(data => {
                if (data.message) {
                } else {
                    // dispatch(setUsername(user.username));
                    // localStorage.setItem('username', user.username);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
};

export const userAddToDict = (data) => {
    return dispatch => {
        return Api.addToDict(data)
            .then(data => data.json())
            .then(data => {
                if (data.message) {
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
                if (data.message) {
                } else {
                    dispatch({
                        type: 'DICT',
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
                if (data.message) {
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
            .then(data => data.json())
            .then(data => {
                if (data.message) {
                } else {
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
                if (data.message) {
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

export const LogoutUser = (history) => {
    return dispatch => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        return Api.logOutUser()
            .then(data => {
                if (data.message) {
                } else {
                    dispatch({
                        type: 'LOGOUT_USER'
                    })
                    history.replace('/')
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
};

export const SetPasswordFetch = (user, history) => {
    return dispatch => {
        return Api.setPassword(user)
            .then(data => {
                if (data.message) {
                } else {
                    history.replace('/')
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
};

export const ResetPasswordFetch = (user, history) => {
    return dispatch => {
        return Api.resetPassword(user)
            .then(data => {
                if (data.message) {

                } else {
                    history.replace('/')
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

const SetUserData = userObj => ({
    type: 'SET_USER_DATA',
    payload: userObj
});

const setToken = (payload) => ({
    type: 'SET_TOKEN',
    payload
});
