import Api from '../../api'

export const translateWordFetch = (word) => {
    return dispatch => {
        return Api.translateWord(word)
            .then(data => data.json())
            .then(payload => {
                if (payload.message) {
                } else {
                    dispatch({
                        type: 'WORD',
                        payload: payload.data[0]
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })
    }
};
