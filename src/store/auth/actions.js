import Api from '../../api'
import {error_handler, setErrorNull} from "../errors/actions";

export const signUpUser = (user, navigate) => {
    return dispatch => {
        return Api.signUp(user)
            .then(data => {
                if (data.error) {
                    error_handler(dispatch, data)
                } else {
                    dispatch(setErrorNull())
                    dispatch(setToken(data.jwt))
                    navigate('/secondStep');
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
            .then(data => {
                if (data.error) {
                    error_handler(dispatch, data)
                } else {
                    dispatch(setErrorNull())
                    dispatch(setToken(data.jwt))
                    navigate('/')
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
};

export const userLoginWithGoogle = () => {
    return Api.loginWithGoogleUser()
        .then(data => {
            if (data.error) {
            } else {
                window.location.replace(data['redirect_url'])
            }
        })
        .catch(error => {
            console.log(error);
        })
};

export const getToken = () => {
    return dispatch => {
        Api.fetchTokenUser()
            .then(data => {
                if (data.error) {
                } else {
                    dispatch(setToken(data.jwt))
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
};

export const LogoutUser = () => {
    return dispatch => {
        dispatch(logOut())
        return Api.logOutUser()
            .then(data => {
                if (data.error) {
                } else {
                    window.location.replace('/')
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
};

const setToken = (payload) => ({
    type: 'SET_TOKEN',
    payload
});
const logOut = (payload) => ({
    type: 'LOGOUT_USER',
    payload
});
