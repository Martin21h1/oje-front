import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import ImageListItemBar from '@mui/material/ImageListItemBar';

import {translateWord} from "../store/words/actions";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {Box, CircularProgress} from "@material-ui/core";
import {red} from "@material-ui/core/colors";
import {makeStyles} from "@material-ui/core/styles";
import {useNavigate} from "react-router";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import IconButton from "@material-ui/core/IconButton";
import {clearImages, fetchImages, LikeImage} from "../store/songs/actions";
import {ImageList, ImageListItem, useMediaQuery, useTheme} from "@mui/material";
import InfiniteScroll from 'react-infinite-scroll-component';
import AddToDict from "./AddToDictComponent";

const bull = (
    <Box
        component="span"
        sx={{display: 'inline-block', mx: '2px', transform: 'scale(0.8)'}}
    >
        •
    </Box>
);

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: '100%',
        marginTop: theme.spacing(5),
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    imageList: {
        maxWidth: 500,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(2),
    },
    imageListItem: {
        width: '100%',
        marginBottom: theme.spacing(2),
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
    const {usersState} = useSelector(state => state);

    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [prevWord, setPrevWord] = useState(null);
    const {wordsState, songsState} = useSelector(state => state);
    const navigate = useNavigate();
    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(clearImages())

        if (usersState.native_language_id && usersState.native_language_id !== props.song.language_id && props.word !== prevWord) {
            dispatch(translateWord(props.word, navigate, usersState.native_language_id, props.song.id))
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

    // useEffect(() => {
    //     // Intersection Observer callback
    //     const handleObserver = (entries) => {
    //         const target = entries[0];
    //         if (target.isIntersecting) {
    //             console.log('>>>', target.isIntersecting)
    //             // loadMoreImages();
    //         }
    //     };
    //
    //     // Create the Intersection Observer instance
    //     const observer = new IntersectionObserver(handleObserver, {
    //         root: loaderRef.current, // Use the viewport as the root
    //         rootMargin: '0px',
    //         threshold: 1.0, // Fully visible threshold
    //     });
    //     console.log('...', loaderRef.current)
    //     if (loaderRef.current) {
    //         observer.observe(loaderRef.current);
    //     }
    //
    //     return () => {
    //         if (loaderRef.current) {
    //             observer.unobserve(loaderRef.current);
    //         }
    //     };
    // }, [songsState.images]);

    const handleCurrentImage = image => {
        setImage(image.url);
        dispatch(LikeImage(image.id, props.song.id, wordsState.word.id))
    };
    const fetchMoreImages = () => {
        setPage(page + 1)
        dispatch(fetchImages(props.word, props.song.id, page))

        // If no new images are available, set hasMore to false
        //     if (currAmountImages === songsState.images.length) {
        //         console.log('>>', currAmountImages)
        //         console.log('<<', songsState.images.length)
        //         setHasMore(false);
        //     }
        // }

        // Append the new images to the existing list
        // setImages(prevImages => [...prevImages, ...newImages]);
    };

    // const handleChangeIndex = (i) => {
    //     setIndex(i);
    //     console.log('index', i)
    //     if (index + 2 === songsState.images.length || index + 2 > songsState.images.length) {
    //         setPage((prevPage) => prevPage + 1);
    //         dispatch(fetchImages(props.word, props.song.id, page + 1))
    //     }
    // };
    const sortedImages = songsState.images.sort((a, b) => b.like_count - a.like_count);

    return (
        wordsState.loading ? (<CircularProgress/>) :
            (<Card sx={{minWidth: 275}}
                   className={classes.card}>
                <InfiniteScroll
                    dataLength={songsState.images.length}
                    next={fetchMoreImages}
                    hasMore={true}
                    loader={<div/>}
                    scrollableTarget="scrollable-box"
                >
                    <Box sx={{width: '100%', height: 350, overflowY: 'scroll'}} id="scrollable-box">
                        <ImageList variant="masonry"
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
                                        sx={{
                                            background:
                                                'linear-gradient(to top, rgba(0,0,0,0.7) 0%, ' +
                                                'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                                        }}
                                        // title={item.url}
                                        position="bottom"
                                        actionIcon={
                                            <IconButton
                                                onClick={() => handleCurrentImage(item)}>
                                                {item.url === image ? <StarIcon
                                                    sx={{color: 'gold'}}
                                                /> : < StarBorderIcon
                                                    sx={{color: 'white'}}
                                                />}
                                            </IconButton>

                                            // <IconButton
                                            //     sx={{ color: 'white' }}
                                            //     aria-label={`star ${item.title}`}
                                            // >
                                            //     <StarBorderIcon />
                                            // </IconButton>
                                        }
                                        actionPosition="left"
                                    />
                                </ImageListItem>
                            )) : null}
                            {/*<div ref={loaderRef} style={{ height: '1px' }} /> /!* Reference to the bottom element *!/*/}

                        </ImageList>
                    </Box>
                </InfiniteScroll>
                {/*<ImageList variant="masonry" cols={3} gap={8}>*/}
                {/*    {songsState.images ? songsState.images.map((item) => (*/}
                {/*        <ImageListItem key={item.url}>*/}
                {/*            <img*/}
                {/*                src={item.url}*/}
                {/*                srcSet={item.url}*/}
                {/*                alt={item.url}*/}
                {/*                loading="lazy"*/}
                {/*            />*/}
                {/*        </ImageListItem>*/}
                {/*    )) : null}*/}
                {/*</ImageList>*/}


                {/*<SwipeableViews*/}
                {/*    index={index}*/}
                {/*    onChangeIndex={handleChangeIndex}*/}
                {/*    className={classes.card}*/}
                {/*    resistance*/}
                {/*    enableMouseEvents>*/}
                {/*    {songsState.images ? songsState.images.map((step) => (*/}
                {/*        <div key={step.url}>*/}
                {/*            <Box*/}
                {/*                component="img"*/}
                {/*                sx={{*/}
                {/*                    height: 255,*/}
                {/*                    display: 'block',*/}
                {/*                    maxWidth: 400,*/}
                {/*                    overflow: 'hidden',*/}
                {/*                    width: '100%',*/}
                {/*                }}*/}
                {/*                src={step.url}*/}
                {/*                alt={step.url}*/}
                {/*            />*/}
                {/*            <IconButton onClick={() => handleCurrentImage(step)}>*/}
                {/*                {step.url === image ? <StarIcon/> : < StarBorderIcon/>}*/}
                {/*            </IconButton>*/}
                {/*        </div>*/}
                {/*    )) : null}*/}
                {/*</SwipeableViews>*/}
                <CardContent>
                    <Typography variant="h5" component="div">
                        {usersState.native_language_id && usersState.native_language_id !== props.song.language_id ?
                            wordsState.word.translate
                            : props.word
                        }

                        <AddToDict image={image}
                                   song={props.song}
                        />
                    </Typography>
                </CardContent>
                {/*    <CardActions>*/}
                {/*        <Button*/}
                {/*            onClick={() => handleAddToDict()}*/}
                {/*            size="small">Add to dict</Button>*/}
                {/*    </CardActions>*/}
            </Card>)
    )
};
