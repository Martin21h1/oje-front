import Api from '../../api'

export const ArtistsFetch = () => {
    return dispatch => {
        return Api.fetchArtists()
            .then(payload => {
                if (payload.error) {
                } else {
                    dispatch({
                        type: 'LIST_ARTISTS', payload: payload.data,
                    });
                }
            })
            .catch(error => {
                console.log(error);
            });
    };
};
