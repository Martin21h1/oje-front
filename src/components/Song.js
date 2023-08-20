import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from "react-router";

import {likeSong, progressSong} from '../store/songs/actions';
import WordCard from './Card';
import YoutubeEmbed from "./Video";
import {translateSentence, translateWord} from "../store/words/actions";

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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 745,
        marginTop: theme.spacing(5),
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

    const {songsState, usersState, wordsState} = useSelector(state => state);

    const [highlightedWord, setHighlightedWord] = useState('');
    const [Sentence, setSentence] = useState('');
    const [indexdWord, setIndexdWord] = useState(null);
    const [pIndex, setpIndex] = useState(null);
    const [isProgress, setProgress] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElP, setAnchorElP] = React.useState(null);
    const open = Boolean(anchorEl);
    const openP = Boolean(anchorElP);
    const localStorageKey = 'langId';
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };



    const handleClickMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };
    const handleClickMenuP = (event) => {
        dispatch(translateSentence(Sentence, localStorage.getItem(localStorageKey), item.id))

        setAnchorElP(event.currentTarget);
    };
    const handleCloseMenuP = () => {
        setAnchorElP(null);
    };


    useEffect(() => {
    }, [wordsState.sentence])


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
            // translatedWord: translatedWord
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

    const handleMouseEnterP = (sentence, index) => {
        const result = sentence.map(obj => Object.values(obj)[0]).join('');

        setSentence(result);
        setpIndex(index);
    }

    const translateSent = () => {
        dispatch(translateSentence(Sentence))

    }


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
                title={`${item.name} - ${item.title}`}
            />
            <YoutubeEmbed embedId={item.url}/>
            <CardContent>
                {isProgress ? <LinearProgress
                    variant="determinate"
                    value={songsState.progress ? songsState.progress.percentages : null}/> : null}
                <Typography
                    // onClick={() => handleClose()}
                    onDoubleClick={textSelection}
                    paragraph={true}
                    constiant="body2"
                    color="textSecondary"
                    component="p">

                    <div>
                        {item.words_items && item.words_items.slice(0, expanded ? item.words_items.length : 10).map((item, index) => {
                            for (const key in item) {
                                const sentence = item[key];

                                return (
                                    <p key={index}
                                       onMouseEnter={() => handleMouseEnterP(sentence, index)}
                                        // onMouseLeave={handleMouseLeave}
                                    >
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

                      <Highlighter word={word}
                                   highlight={isHighlighted}
                                   wordIndex={isSameWordIndex}
                                   pIndex={isSamedIndex}
                                   isProgress={isProgress}
                                   wordList={songsState.progress ? songsState.progress.remaining_words : null}/>
                    </span>
                                                </React.Fragment>
                                            );
                                        })}

                                        {index === pIndex && (
                                            <IconButton aria-label="settings" size='small' style={{ fontSize: '0px', padding: '0px' }}>
                                                <MoreVertIcon
                                                    aria-controls={'basic-menu'}
                                                    aria-haspopup="true"
                                                    aria-expanded={true}
                                                    onClick={handleClickMenuP}
                                                />
                                                <Menu
                                                    id="basic-menu"
                                                    anchorEl={anchorElP}
                                                    open={openP}
                                                    onClose={handleCloseMenuP}
                                                    MenuListProps={{
                                                        'aria-labelledby': 'basic-button',
                                                    }}
                                                >
                                                    <div>
                                                        {wordsState.sentence ? wordsState.sentence : Sentence}
                                                    </div>
                                                </Menu>
                                            </IconButton>
                                        )}
                                    </p>
                                );
                            }
                        })}
                    </div>
                    {!expanded && (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <IconButton
                                aria-label="expand more"
                                size="small"
                                onClick={handleExpandClick}
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                        </div>
                    )}
                </Typography>
                {isVisible &&
                    <div
                        ref={cardRef}
                        style={{
                            position: "absolute",
                            ...CalculatePopupPos(),
                            zIndex: 1, // Set a higher z-index for the WordCard to cover other components

                        }}>
                        <WordCard song={item}
                                  word={popUpData.selectedTextstate}/>
                    </div>
                }

                <div id="cal2"
                     style={{
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
