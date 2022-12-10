import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import Container from "@material-ui/core/Container";
import {ArtistsFetch} from "../../store/artists/actions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    container: {
        marginTop: 12,
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        marginTop: 12,
        flexDirection: 'column',
        alignItems: 'center',
        width: 56,
        height: 56
    }
});

export default function Artists(props) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const {artistsState} = useSelector(state => state);

    useEffect(() => {
        if(!artistsState.artists.length){
            dispatch(ArtistsFetch())
        }
    }, [dispatch])

    return (
        <Container component="main" className={classes.container}>
            {artistsState.artists &&
                artistsState.artists.map((item) => {
                    return (
                        <div>
                            <Avatar aria-label="recipe" className={classes.avatar}
                                    onClick={() => props.history.push(`/artist/${item.name}/`)}
                                    src={item.image_url}
                            />
                            <Typography paragraph>{item.name}</Typography>
                        </div>
                    );
                })}
        </Container>
    );
}
