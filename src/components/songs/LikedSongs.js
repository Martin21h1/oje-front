import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {LikedSongsFetch} from '../../store/songs/actions'
import Container from "@material-ui/core/Container";
import Song from './Song'


const styles = theme => ({
    container: {
        marginTop: theme.spacing(2),
        flexDirection: 'column',
        alignItems: 'center',
    }
});


class LikedSongs extends Component {
    componentDidMount() {
        const {LikedSongsFetch} = this.props;
        LikedSongsFetch();

    }

    render() {
        const {classes, songsState} = this.props;
        return (
            <Container component="main" className={classes.container}>
                {songsState.likedSongs &&
                    songsState.likedSongs.map((item) => {
                        return (
                            <Song
                                key={item.id}
                                item={item}
                                classes={classes}
                            />
                        );
                    })}
            </Container>
        );
    }
}


const mapDispatchToProps = {
    LikedSongsFetch: LikedSongsFetch
};

const mapStateToProps = ({songsState}) => ({songsState});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LikedSongs));