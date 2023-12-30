import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ImageListItemBar from '@mui/material/ImageListItemBar';

import {translateWord} from "../store/words/actions";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useNavigate} from "react-router";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import IconButton from "@material-ui/core/IconButton";
import {clearImages, fetchImages, LikeImage} from "../store/songs/actions";
import {ImageList, ImageListItem, useMediaQuery, useTheme} from "@mui/material";
import InfiniteScroll from 'react-infinite-scroll-component';
import AddToDict from "./AddToDictComponent";
import Skeleton from "@mui/material/Skeleton";


const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: '100%',
        marginTop: theme.spacing(5),
        [theme.breakpoints.up('xs')]: {
            maxWidth: '20ch',
        },
        [theme.breakpoints.up('md')]: {
            maxWidth: '100%'
        }
    },
    cardSkeleton: {
        height: 300,
        width: 200
    },
    box: {
        width: '100%',
        height: 350,
        overflowY: 'scroll'
    },
    media: {
        height: 0, paddingTop: '56.25%', // 16:9
    },
    imageListItemBar: {
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' + 'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    imageList: {
        maxWidth: 500,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(2),
    }, imageListItem: {
        width: '100%', marginBottom: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            width: '50%',
        },
        [theme.breakpoints.up('md')]: {
            width: '33.33%',
        },
    },
}));

export default function WordCard(props) {
    const classes = useStyles();
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [prevWord, setPrevWord] = useState(null);
    const {wordsState, songsState} = useSelector(state => state);
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const langId = parseInt(localStorage.getItem('langId'))
    const sortedImages = songsState.images.sort((a, b) => b.like_count - a.like_count);


    useEffect(() => {
        dispatch(clearImages())

        if (langId && langId !== props.song.language_id && props.word !== prevWord) {
            dispatch(translateWord(props.word, navigate, langId, props.song.id))
        }

        if (props.word !== prevWord) {
            dispatch(fetchImages(props.word, props.song.id, 1))
            setPage(page + 1)
            setPrevWord(props.word)
        }
    }, [props.word])

    useEffect(() => {
        songsState.images.map((step) => {
            if (step.liked) {
                setImage(step.url)
            }
        })
    }, [])

    const handleCurrentImage = image => {
        setImage(image.url);
        dispatch(LikeImage(image.id, props.song.id, wordsState.word.id))
    };
    const fetchMoreImages = () => {
        setPage(page + 1)
        dispatch(fetchImages(props.word, props.song.id, page))
    };

    return (<Card
        className={classes.card}>
        {songsState.imageLoading &&  props.word !== prevWord?
            <Skeleton
                sx={{
                    height: 300,
                    width: 200
                }}
                // className={classes.cardSkeleton}
                animation="wave"
                variant="rectangular"/> :
            <InfiniteScroll
                dataLength={songsState.images.length}
                next={fetchMoreImages}
                hasMore={true}
                loader={<div/>}
                scrollableTarget="scrollable-box"
            >
                <Box
                    className={classes.box}
                    id="scrollable-box">
                    <ImageList
                        variant="masonry"
                        cols={isSmallScreen ? 1 : 3}
                        gap={isSmallScreen ? 4 : 8}
                        className={classes.imageList}
                    >
                        {songsState.images ? sortedImages.map((item, index) => (
                            <ImageListItem
                                key={item.id || index}>
                                <img
                                    src={item.url}
                                    srcSet={item.url}
                                    alt={item.url}
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                    className={classes.imageListItemBar}
                                    position="bottom"
                                    actionIcon={<IconButton
                                        onClick={() => handleCurrentImage(item)}>
                                        {item.url === image ?
                                            <StarIcon
                                                sx={{color: 'gold'}}/> :
                                            <StarBorderIcon
                                                sx={{color: 'white'}}/>}
                                    </IconButton>}
                                    actionPosition="left"
                                />
                            </ImageListItem>)) : null}
                    </ImageList>
                </Box>
            </InfiniteScroll>}
        <CardContent>
            {wordsState.loading ? <Skeleton animation="wave" /> : <Typography
                variant="h5"
                component="div">
                {langId && langId !== props.song.language_id ? wordsState.word.translate : props.word}
                <AddToDict
                    image={image}
                    song={props.song}
                />
            </Typography>}
        </CardContent>
    </Card>)
};
