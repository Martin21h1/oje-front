import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {LikeSongsFetch} from '../../store/songs/actions'
import Like from './Like'
import {withRouter} from 'react-router-dom'
import WordCard from './Card'
import YoutubeEmbed from "./Video";
import {translateWordFetch} from "../../store/words/actions";

const styles = theme => ({
    card: {
        maxWidth: 745,
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
    }
});

class Song extends Component {
    state = {
        isExpanded: false,
        isOpened: false,
        isOpenedModal: false,
        popUpData: {
            isVisible: false,
            LeftoffSet: null,
            TopoffSet: null,
        },
        anchorEl: null
    };

    textSelection = () => {
        const selection = window.getSelection()
        const selectedText = selection.toString()
        const range = selection.getRangeAt(0)
        const cal2 = document.getElementById('cal2')
        const selectedTextPosition = range.getBoundingClientRect()
        const {translateWordFetch} = this.props;
        this.setState(({popUpData}) => ({
            popUpData: {
                isVisible: true,
                LeftoffSet: selectedTextPosition.left,
                TopoffSet: Math.abs(cal2.getBoundingClientRect().top) + selectedTextPosition.top + 20,
                selectedTextstate: selectedText,
                translatedWord: translateWordFetch(selectedText)
            }
        }))
    }

    CalculatePopupPos = () => {
        return {
            left: `${this.state.popUpData.LeftoffSet}px`,
            top: `${this.state.popUpData.TopoffSet}px`
        }
    }

    render = () => {
        const {item, classes, LikeSongsFetch, history} = this.props;

        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}
                                onClick={() => history.push(`/artist/${item.name}/`)}
                        src={item.image_url}>
                        </Avatar>
                    }
                    title={item.title}
                />

                <YoutubeEmbed embedId={item.url}/>
                <CardContent>

                    <Typography onDoubleClick={this.textSelection} paragraph={true}
                                constiant="body2" color="textSecondary" component="p">
                        {item.lyrics.split("\n").map((i, key) => {
                            return <div key={key}>{i}</div>;
                        })}
                    </Typography>
                    {this.state.popUpData.isVisible && <div style={{
                        position: "absolute",
                        height: "fit-content",
                        ...this.CalculatePopupPos()
                    }}>
                        <WordCard song={item} word={this.state.popUpData.selectedTextstate}/>
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
                        onClick={LikeSongsFetch(item.id)}>
                        <Like like={item.likes}/>
                    </IconButton>
                </CardActions>
            </Card>
        )
    }
}

const mapDispatchToProps = () => ({
    LikeSongsFetch,
    translateWordFetch,
});

export default connect(null, mapDispatchToProps)(withRouter(withStyles(styles)(Song)));
