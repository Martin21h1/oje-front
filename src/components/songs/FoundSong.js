import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {FindSongFetch} from '../../store/songs/actions'
import Container from "@material-ui/core/Container";
import Song from './Song'

const styles = theme => ({
    container: {
        marginTop: theme.spacing(2),
        flexDirection: 'column',
        alignItems: 'center',
    }
});


class FoundSong extends Component {

    componentDidMount() {
        const {FindSongFetch} = this.props;
        const {artistName, songName} = this.props.match.params;
        FindSongFetch({title: songName, artist: artistName});

    }



    render() {
        const {classes, songsState} = this.props;
        return (
            <Container component="main" className={classes.container}>

                {songsState.foundSong &&
                    songsState.foundSong.map((item) => {
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
    FindSongFetch,
};

const mapStateToProps = ({songsState}) => ({songsState});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FoundSong));

