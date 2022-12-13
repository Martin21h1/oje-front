import config from '../config'
import {mergeRecursive} from "../helpers/mergeObjects";

class ApiClass {
    constructor() {
        this.url = `${config.apiUrl}`;
    }

    makeRequest = ({url, data}) => {
        const _data = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...!!localStorage.token && {Authorization: `Bearer ${localStorage.token}`},
            },
            credentials: 'include',
        };

        const mergedData = mergeRecursive(_data, data);

        return fetch(url, mergedData)
            .then(response => {
                if (response.status <= 600) return response;
                // return response.json().then(data => {
                //     console.log(data.error)
                //     if (response.status >= 300) return data.error
                //     console.log(data)
                //     return data;
                // });
            })
            .catch(Error);
    };

    createUser = user => {
        return this.makeRequest({
            url: `${this.url}/signUp`,
            data: {
                method: 'POST',
                body: JSON.stringify(user)
            }
        })
    };

    loginUser = user => {
        return this.makeRequest({
            url: `${this.url}/login`,
            data: {
                method: 'POST',
                body: JSON.stringify(user)
            }
        })
    };

    loginWithGoogleUser = () => {
        return this.makeRequest({
            url: `${this.url}/login/google`
        })
    };

    fetchTokenUser = () => {
        return this.makeRequest({
            url: `${this.url}/getToken`
        })
    };

    fetchArtists = () => {
        return this.makeRequest({
            url: `${this.url}/artists`
        })
    };

    addToDict = (data) => {
        return this.makeRequest({
            url: `${this.url}/user/dict`,
            data: {
                method: 'POST',
                body: JSON.stringify(data)
            }
        })
    };

    fetchDict = () => {
        return this.makeRequest({
            url: `${this.url}/user/dict`
        })
    };

    fetchLanguages = () => {
        return this.makeRequest({
            url: `${this.url}/languages`
        })
    };

    deleteWord = (id) => {
        return this.makeRequest({
            url: `${this.url}/user/dict?word_id=${id}`,
            data: {
                method: 'DELETE'
            }
        })
    };

    logOutUser = () => {
        return this.makeRequest({
            url: `${this.url}/logout`
        })
    };

    fetchSongs = (page, limit) => {
        return this.makeRequest(
            {
                url: `${this.url}/songs?page=${page}&limit=${limit}`
            })
    };

    likeSong = id => {
        return this.makeRequest({
            url: `${this.url}/songs/${id}/like`,
            data: {
                method: 'POST',
            }
        })
    };

    searchSong = (title, artist) => {
        return this.makeRequest({
            url: `${this.url}/songs/search?title=${title}&artist=${artist}`
        })
    };

    fetchLikedSongs = () => {
        return this.makeRequest({
            url: `${this.url}/songs/liked`
        })
    };

    fetchSongsByArtist = (artist) => {
        return this.makeRequest({
            url: `${this.url}/songs?artist=${artist}`
        })
    };

    translateWord = (word) => {
        return this.makeRequest({
            url: `${this.url}/words/translate?word=${word}`
        })
    };

    fetchDataUser = () => {
        return this.makeRequest({
            url: `${this.url}/user`
        })
    };

    updateUserData = (data) => {
        return this.makeRequest({
            url: `${this.url}/user`,
            data: {
                method: 'PATCH',
                body: JSON.stringify(data)
            }
        })
    };

    setPassword = (user) => {
        return this.makeRequest({
            url: `${this.url}/setPassword`,
            data: {
                method: 'POST',
                body: JSON.stringify({
                    password: user.password,
                })
            }
        })
    };

    resetPassword = (user) => {
        return this.makeRequest({
            url: `${this.url}/resetPassword`,
            data: {
                method: 'POST',
                body: JSON.stringify({
                    password: user.password,
                    old_password: user.old_password,
                })
            }
        })
    };
}

export default new ApiClass();
