import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from "react-router";

import {likeSong, progressSong} from '../store/songs/actions';
import WordCard from './Card';
import YoutubeEmbed from "./Video";
import {translateWord} from "../store/words/actions";

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import {makeStyles} from '@material-ui/core/styles';
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import {LinearProgress} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {MenuItem} from "@material-ui/core";
import Menu from "@mui/material/Menu";

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 745,
        marginTop: theme.spacing(5),
    },
    media: {
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
    like: {
        display: 'flex',
        alignItems: 'center',
    },
}));

function Highlighter({word, highlight, wordIndex, pIndex, isProgress, wordList}) {
    const isWordInList = isProgress && wordList && wordList.includes(word.toLowerCase());

    const highlightedWord = highlight && wordIndex && pIndex ? (
        <span style={{backgroundColor: '#08F5D9FF', cursor: highlight ? 'pointer' : 'auto'}}>{word}</span>
    ) : (
        isWordInList ?
            <span style={{backgroundColor: '#f5ce09', cursor: highlight ? 'pointer' : 'auto'}}>{word}</span> :
            word
    );

    return <span>{highlightedWord}</span>;
}


export default function Song(props) {
    const navigate = useNavigate();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [popUpData, setPopUpData] = useState({
        LeftoffSet: null,
        TopoffSet: null,
    });
    const item = props.item;

    const [isVisible, setisVisible] = useState(false);
    const [isLiked, setIsLiked] = useState(item.is_liked);

    const [likesAmount, setLikesAmount] = useState(item.likes);
    const cardRef = useRef(null);


    const [highlightedWord, setHighlightedWord] = useState('');
    const [indexdWord, setIndexdWord] = useState(null);
    const [pIndex, setpIndex] = useState(null);
    const [isProgress, setProgress] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const {songsState} = useSelector(state => state);


    useEffect(() => {
        const handleDocumentMouseDown = (event) => {
            if (
                cardRef.current &&
                !cardRef.current.contains(event.target)
            ) {
                setisVisible(false);
            }
        };

        if (isVisible) {
            document.addEventListener('mousedown', handleDocumentMouseDown);
        }

        return () => {
            document.removeEventListener('mousedown', handleDocumentMouseDown);
        };
    }, [isVisible]);


    const handleMouseLeave = () => {
        setHighlightedWord('');
        setIndexdWord(null);
    };

    const textSelection = () => {
        const selection = window.getSelection();
        const selectedText = selection.toString().trim(); // Trim any leading/trailing whitespace
        if (selectedText === '') {
            return; // Exit the function if the selected text is empty
        }
        const range = selection.getRangeAt(0);
        const cal2 = document.getElementById('cal2');
        const selectedTextPosition = range.getBoundingClientRect();
        setisVisible(true);
        setPopUpData({
            LeftoffSet: selectedTextPosition.left,
            TopoffSet: Math.abs(cal2.getBoundingClientRect().top) + selectedTextPosition.top + 20,
            selectedTextstate: selectedText,
            translatedWord: dispatch(translateWord(selectedText))
        });
    };

    const handleClick = (word, event) => {
        const cleanedWord = word.trim().replace(',', '');

        const {top, left} = event.target.getBoundingClientRect();
        const cal2 = document.getElementById('cal2');

        setisVisible(true);
        setPopUpData({
            LeftoffSet: left,
            TopoffSet: Math.abs(cal2.getBoundingClientRect().top) + top + 20,
            selectedTextstate: cleanedWord,
            translatedWord: dispatch(translateWord(cleanedWord))
        });
    };
    const CalculatePopupPos = () => {
        return {
            left: `${popUpData.LeftoffSet}px`,
            top: `${popUpData.TopoffSet}px`
        };
    };

    const handleClose = () => {
        setisVisible(false);
    };

    const handleMouseEnter = (word, wordIndex, index) => {
        if (word && !/^[' ,.?!"']+$/.test(word)) {
            setHighlightedWord(word);
            setIndexdWord(wordIndex);
            setpIndex(index);
        } else {
            setHighlightedWord('');
        }
    };

    const handleLike = () => {
        dispatch(likeSong(item.id, navigate));

        if (!isLiked) {
            setIsLiked(true);
            setLikesAmount(likesAmount + 1)
        } else {
            setIsLiked(false);
            setLikesAmount(likesAmount - 1)
        }

    };

    const handleOpenProgress = () => {
        setAnchorEl(null);
        if (isProgress) {
            setProgress(false)
        } else {
            dispatch(progressSong(item))
            setProgress(true)

        }

    }

    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar
                        aria-label="recipe"
                        className={classes.avatar}
                        onClick={() => navigate(`/artist/${item.name}/`)}
                        src={item.image_url}>
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClickMenu}
                        />
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleCloseMenu}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            {isProgress ? <MenuItem onClick={handleOpenProgress}>Hide Progress</MenuItem> :
                                <MenuItem onClick={handleOpenProgress}>Show Progress</MenuItem>
                            }

                        </Menu>
                    </IconButton>
                }
                title={item.title}
            />
            <YoutubeEmbed embedId={item.url}/>
            <CardContent>
                {isProgress ? <LinearProgress
                    variant="determinate"
                    value={songsState.progress ? songsState.progress.percentages: null}/> : null}

                <Typography
                    // onClick={() => handleClose()}
                    onDoubleClick={textSelection}
                    paragraph={true}
                    constiant="body2"
                    color="textSecondary"
                    component="p">

                    <div>
                        {item.words_items && item.words_items.map((item, index) => {
                            for (const key in item) {
                                const sentence = item[key];

                                return (
                                    <p key={index}>
                                        {sentence.map((wordObj, wordIndex) => {
                                            const wordKey = Object.keys(wordObj)[0];
                                            const word = wordObj[wordKey];
                                            const isHighlighted = highlightedWord === word;
                                            const isSameWordIndex = indexdWord === wordIndex;
                                            const isSamedIndex = pIndex === index;
                                            return (
                                                <React.Fragment key={wordIndex}>
                    <span
                        onMouseEnter={() => handleMouseEnter(word, wordIndex, index)}
                        onMouseLeave={handleMouseLeave}
                        onClick={(event) => handleClick(word, event)}

                    >
                      <Highlighter word={word} highlight={isHighlighted} wordIndex={isSameWordIndex}
                                   pIndex={isSamedIndex} isProgress={isProgress} wordList={songsState.progress ? songsState.progress.remaining_words: null}/>
                    </span>
                                                </React.Fragment>
                                            );
                                        })}
                                    </p>
                                );
                            }
                        })}
                    </div>


                    {/*{item.lyrics.split("\n").map((words) => {*/}
                    {/*    return <div>*/}
                    {/*        {*/}
                    {/*            words.split(" ").map((word, index) => {*/}
                    {/*                const formattedWord = word.replace(/[.,!?]/g, ''); // Remove signs like commas, periods, etc.*/}

                    {/*                return <span*/}
                    {/*                    key={index}*/}
                    {/*                    onClick={(event) => handleClick(formattedWord, event)}*/}
                    {/*                    onMouseOver={() => handleMouseOver(formattedWord, index)}*/}
                    {/*                    onMouseLeave={handleMouseLeave}*/}
                    {/*                    style={{*/}
                    {/*                        backgroundColor: indexdWord === index && highlightedWord === formattedWord ? 'yellow' : 'transparent',*/}
                    {/*                        cursor: formattedWord ? 'pointer' : 'auto',*/}

                    {/*                    }}*/}
                    {/*                >*/}
                    {/*            {word} {' '}*/}
                    {/*            </span>*/}
                    {/*                })*/}
                    {/*        }*/}

                    {/*    </div>;*/}
                    {/*})}*/}
                </Typography>
                {isVisible && <div
                    ref={cardRef}
                    style={{
                        position: "absolute",
                        ...CalculatePopupPos()
                    }}>
                    <WordCard song={item} word={popUpData.selectedTextstate}/>
                </div>}

                <div id="cal2" style={{
                    position: "absolute",
                    top: 0,
                    left: 0
                }}/>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton
                    aria-label="add to favorites"
                    onClick={handleLike}>
                    {
                        likesAmount > 0 ? (
                            <div className={classes.like}><ThumbUpAltIcon
                                color={isLiked ? 'primary' : ''}/>{likesAmount}</div>
                        ) : (
                            <ThumbUpAltIcon/>)
                    }
                </IconButton>
            </CardActions>
        </Card>
    );
};
