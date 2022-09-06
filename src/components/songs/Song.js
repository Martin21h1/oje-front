import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {red} from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {LikeSongsFetch} from '../../store/songs/actions'
import Like from './Like'
import UnLike from './UnLike'
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {Link, withRouter} from 'react-router-dom'
import Modal from '../ModalWindow'
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

    handleExpandClick = () => {
        this.setState(({isExpanded}) => ({isExpanded: !isExpanded}));
    };

    handleOpenClick = event => {
        this.setState(({isOpened}) => ({isOpened: !isOpened}));
        this.setState({anchorEl: event.currentTarget});

    };

    handleOpenClickModal = () => {
        this.setState(({isOpenedModal}) => ({isOpenedModal: !isOpenedModal}));

    };

    textSelection = () => {

        const selection = window.getSelection()
        const selectedText = selection.toString()
        const range = selection.getRangeAt(0)
        const cal2 = document.getElementById('cal2')
        const selectedTextPosition = range.getBoundingClientRect()
        const {translateWordFetch} = this.props;

        // console.log('selection data', {
        //     selection,
        //     cal2Pos: cal2.getBoundingClientRect(),
        //     selectedTextPosition,
        //     calculatedPositionResult: Math.abs(cal2.getBoundingClientRect().top)
        //
        // })
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
        const {item, classes, LikeSongsFetch, UnLikePostFetch, DeletePost, history} = this.props;

        const action = <div>{
            <IconButton aria-label="settings">
                <MoreVertIcon
                    onClick={this.handleOpenClick}
                />
                <Menu
                    open={this.state.isOpened}
                    onClose={this.handleOpenClick}
                    anchorEl={this.state.anchorEl}
                >
                    <MenuItem>
                        <Link to={`/editpost/${item.id}`}>
                            <EditIcon/>
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={this.handleOpenClickModal}>
                        <DeleteIcon
                            onClose={this.handleOpenClickModal}
                            open={this.state.isOpenedModal}
                        />
                        {this.state.isOpenedModal ? <Modal id={item.id}
                                                           onClick={DeletePost}
                                                           title={`Delete Post ${item.title}`}
                                                           content={'Are you sure?'}
                        /> : null}
                    </MenuItem>
                </Menu>
            </IconButton>
        }
        </div>;


        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}
                                onClick={() => history.push(`/artist/${item.name}/`)}
                        src={item.image_url}>
                        </Avatar>
                    }
                    // action={localStorage.username === item.author ? action : null}
                    title={item.title}
                    // subheader={item.date_posted}
                />
                {/*<CardMedia*/}
                {/*    className={classes.media}*/}
                {/*    // image="./logo5.png"*/}
                {/*    // title="Paella dish"*/}

                {/*/>*/}
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
                    {/*<IconButton aria-label="add to negative"*/}
                    {/*            onClick={() => UnLikePostFetch(item.id)}>*/}
                    {/*    <UnLike unlike={item.unlike}/>*/}
                    {/*</IconButton>*/}
                    {/*<IconButton*/}
                    {/*    onClick={this.handleExpandClick}*/}
                    {/*    aria-expanded={this.state.isExpanded}*/}
                    {/*    aria-label="show more"*/}
                    {/*>*/}
                    {/*    <ExpandMoreIcon/>*/}
                    {/*</IconButton>*/}
                </CardActions>
                {/*<Collapse in={this.state.isExpanded} timeout="auto" unmountOnExit>*/}
                {/*    <CardContent>*/}
                {/*        <Typography paragraph>Shit:</Typography>*/}
                {/*        <Typography paragraph>*/}
                {/*            its flex, bitch*/}
                {/*        </Typography>*/}
                {/*    </CardContent>*/}
                {/*</Collapse>*/}
            </Card>
        )
    }

}


const mapDispatchToProps = () => ({
    LikeSongsFetch: LikeSongsFetch,
    translateWordFetch: translateWordFetch,
});


export default connect(null, mapDispatchToProps)(withRouter(withStyles(styles)(Song)));