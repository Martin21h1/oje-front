import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {FetchSongsByArtist} from '../../store/songs/actions'
import Container from "@material-ui/core/Container";
import Post from './Song'

const styles = theme => ({
    container: {
        marginTop: theme.spacing(2),
        flexDirection: 'column',
        alignItems: 'center',
    }
});


class UserPosts extends Component {

    componentDidMount() {
        const {FetchSongsByArtist} = this.props;
        const {name} = this.props.match.params;
            FetchSongsByArtist(name);
    }

    render() {
        const {classes, songsState} = this.props;
        return (
            <Container component="main" className={classes.container}>

                {songsState.userSongs &&
                    songsState.userSongs.map((item) => {
                        return (
                            <Post
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
    FetchSongsByArtist,
};

const mapStateToProps = ({songsState}) => ({songsState});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserPosts));

