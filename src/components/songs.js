import React, {useEffect, useState} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import Song from './Song';

import Container from "@material-ui/core/Container";
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(2),
        flexDirection: 'column',
        alignItems: 'center',
    }
}));


export default function SongsComponent(props) {
    const classes = useStyles();

    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [songs, setSongs] = useState([]);
    const limit = 10
    const {dispatch, fetch, state, name} = props

    const fetchMoreData = () => {
        console.log('songs', songs)
        console.log('songs', state)
        const currPage = page + 1

        if (songs !== state) {
            if (name) {
                dispatch(fetch(name, page, limit))
            } else {
                dispatch(fetch(page, limit))
            }            setPage(currPage)
            setSongs([...songs, ...state])
        }

        if (!state.length) {
            setHasMore(false)
        }
    }

    useEffect(() => {
        if (name) {
            dispatch(fetch(name, page, limit))
        } else {
            dispatch(fetch(page, limit))
        }
        if (songs !== state) {
            setSongs([...songs, ...state])
        }

    }, [state.length]);

    return (
        <InfiniteScroll
            dataLength={songs.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
        >
            <Container component="main" className={classes.container}>
                {songs &&
                    songs.map((item) => {
                        return (
                            <Song
                                key={item.id}
                                item={item}
                                classes={classes}
                            />
                        );
                    })}
            </Container>
        </InfiniteScroll>
    );
};
