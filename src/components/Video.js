import React, {useEffect, useMemo, useRef, useState} from 'react';

import {makeStyles} from "@material-ui/core/styles";
import YouTube from 'react-youtube';
import {fetchLyricsRows, likeSong, progressSong, setSong} from "../store/songs/actions";
import {useDispatch, useSelector} from "react-redux";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import {useLocation} from "react-router";
import {translateSentence, translateWord} from "../store/words/actions";
import WordCard from "./Card";

const useStyles = makeStyles({
    videoResponsive: {
        overflow: 'hidden', position: 'relative', width: '100%', paddingTop: '56.25%', // 16:9 aspect ratio (9 / 16 = 0.5625 or 56.25%)
    }, iframe: {
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
    },
});


function Highlighter({word, highlight, wordIndex}) {

    const highlightedWord = highlight && wordIndex ? (<span style={{
        backgroundColor: '#08F5D9FF', cursor: highlight ? 'pointer' : 'auto'
    }}>{word}</span>) : <span>{word}</span>;

    return <span>{highlightedWord}</span>;
}


export default function YoutubeEmbed(props) {
    const classes = useStyles();
    const [currentTime, setCurrentTime] = useState(0);
    const dispatch = useDispatch();
    const {songsState} = useSelector(state => state);

    const youtubeRef = useRef(null);
    const currentLyric = useMemo(() => {
        return songsState.lyricsRows.find(lyric => currentTime >= lyric.start_time && currentTime <= lyric.end_time);
    }, [songsState.lyricsRows, currentTime]);

    useEffect(() => {
        const interval = setInterval(async () => {
            if (youtubeRef.current) {
                const player = youtubeRef.current.internalPlayer;
                const time = await player.getCurrentTime();
                setCurrentTime(time);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);


    const item = props.item;
    const location = useLocation();

    const [isVisible, setisVisible] = useState(false);

    const cardRef = useRef(null);


    const [highlightedWord, setHighlightedWord] = useState('');
    const [Sentence, setSentence] = useState('');
    const [indexdWord, setIndexdWord] = useState(null);
    const [isProgress, setProgress] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElP, setAnchorElP] = React.useState(null);
    const open = Boolean(anchorEl);
    const openP = Boolean(anchorElP);
    const localStorageKey = 'langId';
    const [expanded, setExpanded] = useState(false);
    const [popUpData, setPopUpData] = useState({
        LeftoffSet: null, TopoffSet: null,
    });
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const stopVideo = () => {
        if (youtubeRef.current) {
            const player = youtubeRef.current.internalPlayer;
            player.pauseVideo();
        }
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
        const handleDocumentMouseDown = (event) => {
            if (cardRef.current && !cardRef.current.contains(event.target)) {
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


    const handleClick = (word, event) => {
        stopVideo();

        const cleanedWord = word.trim().replace(',', '');

        const {top, left} = event.target.getBoundingClientRect();
        const cal2 = document.getElementById('cal2');

        setisVisible(true);
        setPopUpData({
            LeftoffSet: left,
            TopoffSet: Math.abs(cal2.getBoundingClientRect().top) + top,
            selectedTextstate: cleanedWord, // translatedWord: translatedWord
        });
    };

    const CalculatePopupPos = () => {
        if (!cardRef.current) return {};

        const cardRect = cardRef.current.getBoundingClientRect();
        const rightEdge = window.innerWidth - cardRect.width;

        let left = popUpData.LeftoffSet;
        if (left + cardRect.width > rightEdge) {
            left = rightEdge - cardRect.width - 20;
        }

        return {
            left: `${left}px`,
            top: `${popUpData.TopoffSet}px`,
        };
    };
    const handleClose = () => {
        setisVisible(false);
    };

    const handleMouseEnter = (word, wordIndex) => {
        if (word && !/^[' ,.?!"']+$/.test(word)) {
            setHighlightedWord(word);
            setIndexdWord(wordIndex);
        } else {
            setHighlightedWord('');
        }
    };


    const func = () => {
        dispatch(fetchLyricsRows(item.id))
    }

    const opts = {
        height: '100%', width: '100%'
    };

    return (<div>
            <div className={classes.videoResponsive}>
                <YouTube
                    ref={youtubeRef}
                    className={classes.iframe}
                    videoId={item.url}
                    onPlay={func}
                    opts={opts}
                />
            </div>
            <div className="lyrics" style={{textAlign: 'center', marginTop: '20px'}}>
                <Typography
                    color="textSecondary"
                >

                    {currentLyric && currentLyric.words_items.map((wordObj, wordIndex) => {
                        const wordKey = Object.keys(wordObj)[0];
                        const word = wordObj[wordKey];
                        const isHighlighted = highlightedWord === word;
                        const isSameWordIndex = indexdWord === wordIndex;
                        return (<React.Fragment key={wordIndex}>
                    <span
                        onMouseEnter={() => handleMouseEnter(word, wordIndex)}
                        onMouseLeave={handleMouseLeave}
                        onClick={(event) => handleClick(word, event)}
                    >
                      <Highlighter word={word}
                                   highlight={isHighlighted}
                                   wordIndex={isSameWordIndex}
                      />
                    </span>
                        </React.Fragment>);
                    })}
                    {/*{1 && (<IconButton aria-label="settings" size='small'*/}
                    {/*                                  style={{fontSize: '0px', padding: '0px'}}>*/}
                    {/*    <MoreVertIcon*/}
                    {/*        aria-controls={'basic-menu'}*/}
                    {/*        aria-haspopup="true"*/}
                    {/*        aria-expanded={true}*/}
                    {/*        onClick={handleClickMenuP}*/}
                    {/*    />*/}
                    {/*    <Menu*/}
                    {/*        id="basic-menu"*/}
                    {/*        anchorEl={anchorElP}*/}
                    {/*        open={openP}*/}
                    {/*        onClose={handleCloseMenuP}*/}
                    {/*        MenuListProps={{*/}
                    {/*            'aria-labelledby': 'basic-button',*/}
                    {/*        }}*/}
                    {/*    >*/}
                    {/*        <div>*/}
                    {/*            {currentLyric ? currentLyric.row : Sentence}*/}
                    {/*        </div>*/}
                    {/*    </Menu>*/}
                    {/*</IconButton>)}*/}

                    {/*{currentLyric && currentLyric.words_items}*/}
                    {isVisible && <div
                        ref={cardRef}
                        style={{
                            position: "absolute", ...CalculatePopupPos(), zIndex: 1, // Set a higher z-index for the WordCard to cover other components

                        }}>
                        <WordCard song={item}
                                  word={popUpData.selectedTextstate}/>
                    </div>}

                </Typography>
                <div id="cal2"
                     style={{
                         position: "absolute", top: 0, left: 0
                     }}/>
            </div>
        </div>

    );
};
