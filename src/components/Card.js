import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import React, {useEffect, useState} from "react";
import {Box, CircularProgress} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {translateWord} from "../store/words/actions";
import {addToDict} from "../store/users/actions";
import {red} from "@material-ui/core/colors";
import {makeStyles} from "@material-ui/core/styles";
import SwipeableViews from 'react-swipeable-views';

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
        maxWidth: 500,
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
}))

export default function WordCard(props) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const [image, setImage] = useState(null);
    const [prevWord, setPrevWord] = useState(null);
    const {wordsState} = useSelector(state => state);

    useEffect(() => {
        if (props.word !== prevWord) {
            dispatch(translateWord(props.word))
            setPrevWord(props.word)
        }
    }, [props])

    const handleAddToDict = () => {
        dispatch(addToDict(
            {
                word_id: wordsState.word.id,
                prime_picture: image, song_id:
                props.song.id
            }))
    };

    const handleCurrentImage = image => {
        setImage(image);
    };

    return (
        wordsState.loading ? (<CircularProgress/>) :
            (<Card sx={{minWidth: 275}}>
                <SwipeableViews
                    className={classes.card}
                    enableMouseEvents>
                    {wordsState.word.pictures ? wordsState.word.pictures.map((step) => (
                        <div key={step} onMouseOver={() => handleCurrentImage(step)}>
                            <Box
                                component="img"
                                sx={{
                                    height: 255,
                                    display: 'block',
                                    maxWidth: 400,
                                    overflow: 'hidden',
                                    width: '100%',
                                }}
                                src={step}
                                alt={step}
                            />
                        </div>
                    )) : null}
                </SwipeableViews>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {bull}{wordsState.word.translate}{bull}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button
                        onClick={() => handleAddToDict()}
                        size="small">Add to dict</Button>
                </CardActions>
            </Card>)
    )
}
