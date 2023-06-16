import React, {useEffect, useState} from 'react';
import InfiniteScroll from "react-infinite-scroll-component";

import Song from './Song';

import Container from "@material-ui/core/Container";
import {makeStyles} from '@material-ui/core/styles';
import {setErrorNull} from "../store/errors/actions";

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
    const [amountSongs, setAmountSongs] = useState(0);
    const limit = 5
    const {dispatch, fetch, state, name} = props

    const fetchMoreData = () => {
        setPage(page + 1)
        const currAmountSongs = amountSongs + state.length
        setAmountSongs(currAmountSongs)
        if (name) {
            dispatch(fetch(name, page, limit))
        } else {
            dispatch(fetch(page, limit))
        }

        if (state.length === currAmountSongs) {
            setHasMore(false)
        }
    }

    useEffect(() => {
        if (name) {
            dispatch(fetch(name, page, limit))
        } else {
            dispatch(fetch(page, limit))
        }
        setAmountSongs(state.length)
        setPage(page + 1)

    }, []);

    useEffect(() => {
        dispatch(setErrorNull())
    }, []);


    return (
        <InfiniteScroll
            dataLength={state.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
        >
            <Container component="main" className={classes.container}>
                {!!state.length &&
                    state.map((item) => {
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
