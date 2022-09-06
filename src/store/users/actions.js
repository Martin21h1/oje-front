import Api from '../../api'


export const userSignUpFetch = (user, history) => {
    return dispatch => {
        return Api.fetchCreateUser(user)
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
        return Api.fetchLoginUser(user)
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

export const userLoginWithGoogleFetch = (user, history) => {
    return dispatch => {
        Api.fetchLoginWithGoogleUser()
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
        Api.fetchGetTokenUser()
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

export const userUpdateDataFetch = (data) => {
    return dispatch => {
        Api.fetchUserUpdateData(data)
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


export const userAddToDict = (wordId, image, songId) => {
    return dispatch => {
        return Api.fetchAddToDict(wordId, image, songId)
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
        return Api.fetchDeleteWord(id)
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

        return Api.fetchLogOutUser()
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
        return Api.fetchSetPassword(user)
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
        return Api.fetchResetPassword(user)
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

const setUsername = username => ({
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
