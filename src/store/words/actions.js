import Api from '../../api'

export const translateWord = (word) => {
    return dispatch => {
        dispatch(setLoading(true));
        return Api.translateWord(word)
            .then(data => data.json())
            .then(data => {
                if (data.error) {

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