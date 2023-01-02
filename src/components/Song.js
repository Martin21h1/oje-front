import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from "react-router";

import {likeSong} from '../store/songs/actions';
import Like from './Like';
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
    }
}));

export default function Song(props) {
    const navigate = useNavigate();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [popUpData, setPopUpData] = useState({
        LeftoffSet: null,
        TopoffSet: null,
    });
    const [isVisible, setisVisible] = useState(false);

    const item = props.item;

    const textSelection = () => {
        const selection = window.getSelection();
        const selectedText = selection.toString();
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

    const CalculatePopupPos = () => {
        return {
            left: `${popUpData.LeftoffSet}px`,
            top: `${popUpData.TopoffSet}px`
        };
    };

    const handleClose = () => {
        setisVisible(false);
    };

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
                title={item.title}
            />
            <YoutubeEmbed embedId={item.url}/>
            <CardContent>
                <Typography
                    onClick={() => handleClose()}
                    onDoubleClick={textSelection}
                    paragraph={true}
                    constiant="body2"
                    color="textSecondary"
                    component="p">

                    {item.lyrics.split("\n").map((i) => {
                        return <div>{i}</div>;
                    })}
                </Typography>
                {isVisible && <div style={{
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
                    onClick={() => dispatch(likeSong(item.id))}>
                    <Like like={item.likes}/>
                </IconButton>
            </CardActions>
        </Card>
    );
};
