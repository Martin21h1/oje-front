import Api from '../../api'

export const translateWord = (word, navigate, langId, songId) => {
    return dispatch => {
        dispatch(setLoading(true));
        return Api.translateWord(word, langId, songId)
            .then(data => {
                if (data.error) {
                    // navigate('/login')
                } else {
                    dispatch(setLoading(false));
                    dispatch({
                        type: 'WORD',
                        payload: data.data[0]
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
};

export const translateSentence = (sentence, langId, songId) => {
    return dispatch => {
        dispatch(setLoading(true));
        return Api.translateSentence({
            "sentence": sentence,
            "langId": langId,
            "songId": songId
        })
            .then(data => {
                if (data.error) {
                } else {
                    console.log(data.data)
                    dispatch(setLoading(false));
                    dispatch({
                        type: 'SENTENCE',
                        payload: data.data.translate
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
};

const setLoading = (payload) => ({
    type: 'SET_LOADING',
    payload: payload
});