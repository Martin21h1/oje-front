import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import {ArtistsFetch} from "../store/artists/actions";
import {useNavigate} from "react-router";

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(2),
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        marginTop: theme.spacing(2),
        flexDirection: 'column',
        alignItems: 'center',
        width: 56,
        height: 56
    }
}))

export default function Artists() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const {artistsState} = useSelector(state => state);
    const navigate = useNavigate();


    useEffect(() => {
        if (!artistsState.artists.length) {
            dispatch(ArtistsFetch())
        }
    }, [artistsState.artists.length])

    return (
        <Container component="main" className={classes.container}>
            {artistsState.artists &&
                artistsState.artists.map((item) => {
                    return (
                        <div>
                            <Avatar aria-label="recipe"
                                    className={classes.avatar}
                                    onClick={() => navigate(`/artist/${item.name}/`)}
                                    src={item.image_url}
                            />
                            <Typography paragraph>{item.name}</Typography>
                        </div>
                    );
                })}
        </Container>
    );
}
