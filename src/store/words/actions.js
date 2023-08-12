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

const setLoading = (payload) => ({
    type: 'SET_LOADING',
    payload: payload
});