import config from '../config'
import {mergeRecursive} from "../helpers/mergeObjects";
import redirect from "react-router/es/Redirect";

class ApiClass {
    constructor() {
        this.url = `${config.apiUrl}`;
    }

    makeRequest = ({url, data, token}) => {
        const _data = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...!!token && {Authorization: `Bearer ${token}`},
            },
            credentials: 'include',
        };

        const mergedData = mergeRecursive(data, _data);

        return fetch(url, mergedData)
            .then(response => {
                if (response.status <= 300) return response;
                console.log(response.status)
                if (response.status === 302) {
                    redirect(response.headers.location);
                }

                return response.json().then(data => {
                    if (response.status >= 300) return data.message
                    return data;
                });
            })
            .catch(Error);

    };

    fetchCreateUser = user => {
        return this.makeRequest({
            url: `${this.url}/signUp`,
            data: {
                method: 'POST',
                body: JSON.stringify(user)
            }
        })
    };


    fetchLoginUser = user => {
        return this.makeRequest({
            url: `${this.url}/login`,
            data: {
                method: 'POST',
                body: JSON.stringify(user)
            }
        })
    };

    fetchLoginWithGoogleUser = () => {
        return this.makeRequest({
            url: `${this.url}/login/google`,
            data: {
                method: 'GET',

            }
        })
    };

    fetchGetTokenUser = () => {
        return this.makeRequest({
            url: `${this.url}/getToken`,
            data: {
                method: 'GET',

            }
        })
    };

    fetchArtists = () => {
        return this.makeRequest({
            url: `${this.url}/artists`,
            data: {
                method: 'GET',
            },
            token: localStorage.token
        })
    };

    fetchAddToDict = (WordId, image, songId) => {
        return this.makeRequest({
            url: `${this.url}/user/dict`,
            data: {
                method: 'POST',
                body: JSON.stringify({
                    word_id: WordId,
                    song_id: songId,
                    prime_picture: image,
                })
            },
            token: localStorage.token

        })
    };

    fetchDict = () => {
        return this.makeRequest({
            url: `${this.url}/user/dict`,
            data: {
                method: 'GET'
            },
            token: localStorage.token

        })
    };

    fetchLanguages = () => {
        return this.makeRequest({
            url: `${this.url}/languages`,
            data: {
                method: 'GET'
            },
            token: localStorage.token

        })
    };

    fetchDeleteWord = (id) => {
        return this.makeRequest({
            url: `${this.url}/user/dict?word_id=${id}`,
            data: {
                method: 'DELETE'
            },
            token: localStorage.token

        })
    };


    fetchLogOutUser = () => {
        return this.makeRequest({
            url: `${this.url}/logout`,
            data: {
                method: 'GET'
            },
        })
    };

    fetchSongs = (page, limit) => {
        return this.makeRequest(
            {
                url: `${this.url}/songs?page=${page}&limit=${limit}`,
                data: {
                    method: 'GET'
                },
                token: localStorage.token

            })
    };

    fetchLikeSong = id => {
        return this.makeRequest({
            url: `${this.url}/songs/${id}/like`,
            data: {
                method: 'POST',
            },
            token: localStorage.token

        })
    };
    fetchFindSong = (title, artist) => {
        return this.makeRequest({
            url: `${this.url}/songs/search?title=${title}&artist=${artist}`,
            data: {
                method: 'GET',

            },
            token: localStorage.token

        })
    };
    fetchLikedSongs = () => {
        return this.makeRequest({
            url: `${this.url}/songs/liked`,
            data: {
                method: 'GET'
            },
            token: localStorage.token

        })
    };
    fetchSongsByArtist = (artist) => {
        return this.makeRequest({
            url: `${this.url}/songs?artist=${artist}`,
            data: {
                method: 'GET'
            },
            token: localStorage.token
        })
    };
    fetchTranslateWord = (word) => {
        return this.makeRequest({
            url: `${this.url}/words/translate?word=${word}`,
            data: {
                method: 'GET'
            },
            token: localStorage.token
        })
    };
    fetchDataUser = () => {
        return this.makeRequest({
            url: `${this.url}/user`,
            data: {
                method: 'GET'
            },
            token: localStorage.token
        })
    };
    fetchUserUpdateData = (data) => {
        return this.makeRequest({
            url: `${this.url}/user`,
            data: {
                method: 'PATCH',
                body: JSON.stringify(data)
            },
            token: localStorage.token
        })
    };
    fetchSetPassword = (user) => {
        return this.makeRequest({
            url: `${this.url}/setPassword`,
            data: {
                method: 'POST',
                body: JSON.stringify({
                    password: user.password,
                })
            },
            token: localStorage.token
        })
    };
    fetchResetPassword = (user) => {
        return this.makeRequest({
            url: `${this.url}/resetPassword`,
            data: {
                method: 'POST',
                body: JSON.stringify({
                    password: user.password,
                    old_password: user.old_password,
                })
            },
            token: localStorage.token
        })
    };
}

export default new ApiClass();
