import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import React, {Component} from "react";
import {Box} from "@material-ui/core";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {translateWordFetch} from "../../store/words/actions";
import {userAddToDict} from "../../store/users/actions";
import {red} from "@material-ui/core/colors";
import {withStyles} from "@material-ui/core/styles";
import SwipeableViews from 'react-swipeable-views';

const bull = (
    <Box
        component="span"
        sx={{display: 'inline-block', mx: '2px', transform: 'scale(0.8)'}}
    >
        •
    </Box>
);

const styles = theme => ({
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
    pop: {
        axis: theme.direction === 'rtl' ? 'x-reverse' : 'x',
        maxWidth: 500,
        marginTop: theme.spacing(5),
    }
});

class WordCard extends Component {
    state = {
        activeStep: 1,
        image: null
    }

    componentDidMount() {
        const {word, translateWordFetch} = this.props;
        translateWordFetch(word)
    }

    componentDidUpdate(prevProps) {

        const {word, translateWordFetch} = this.props;
        const {word: prevWord} = prevProps;

        if (word !== prevWord) {
            translateWordFetch(word)
        }
    }

    handleAddToDict = () => {
        const {translatedWord, song} = this.props;
        this.props.userAddToDict(translatedWord.id, this.state.image, song.id)
    };

    handleCurrentImage = image => {
        this.setState({image: image});
    };

    render = () => {
        const {translatedWord, classes} = this.props;
        return (
            <Card sx={{minWidth: 275}}>
                <SwipeableViews className={classes.card}
                                enableMouseEvents>
                    {translatedWord.pictures ? translatedWord.pictures.map((step) => (
                        <div key={step} onMouseOver={() => this.handleCurrentImage(step)}>
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
                    )) : <div></div>}
                </SwipeableViews>

                <CardContent>

                    <Typography variant="h5" component="div">
                        {bull}{translatedWord.translate}{bull}
                    </Typography>

                </CardContent>
                <CardActions>
                    <Button
                        onClick={this.handleAddToDict}
                        size="small">Add to dict</Button>
                </CardActions>
            </Card>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    translateWordFetch: (word) => dispatch(translateWordFetch(word)),
    userAddToDict: (wordId, image, songId) => dispatch(userAddToDict(wordId, image, songId))
});

const mapStateToProps = (state) => ({translatedWord: state.wordsState.word});
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(WordCard)))
