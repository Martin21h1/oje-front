import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {searchSong, fetchSongs} from '../../store/songs/actions'
import Container from "@material-ui/core/Container";
import Song from './Song'
import SearchForm from "../SearchForm";

const styles = theme => ({
    container: {
        marginTop: theme.spacing(2),
        flexDirection: 'column',
        alignItems: 'center',
    }
});

class Songs extends Component {
    state = {
        songs: [],
        loading: false,
        page: 1,
        prevY: 0,
        limit: 2
    };

    getSongs(page) {
        const {songsState, SongsFetch} = this.props;
        this.setState({loading: true});
        if (songsState.songs.length) {
            SongsFetch(page, this.state.limit);
        }
        this.setState({loading: false});
    }

    handleObserver(entities) {
        const y = entities[0].boundingClientRect.y;
        if (this.state.prevY > y) {
            const curPage = this.state.page + 1
            this.getSongs(curPage);
            this.setState({page: curPage});
        }
        this.setState({prevY: y});
    }

    componentDidMount() {
        const {SongsFetch} = this.props;

            SongsFetch(this.state.page, this.state.limit);
            const options = {
                root: null,
                rootMargin: "0px",
                threshold: 1.0
            };

            this.observer = new IntersectionObserver(
                this.handleObserver.bind(this),
                options
            );
            this.observer.observe(this.loadingRef);
    }

    componentDidUpdate(prevProps) {
        const {songsState} = this.props;
        if (songsState !== prevProps.songsState) {
            this.setState({songs: [...this.state.songs, ...songsState.songs]});
        }
    }

    render() {
        const loadingTextCSS = {display: this.state.loading ? "block" : "none"};
        const loadingCSS = {
            height: "100px",
            margin: "30px"
        };

        const {classes, FindSongFetch} = this.props;
        return (
            <Container component="main" className={classes.container}>
                <SearchForm onSubmit={FindSongFetch}/>

                {/*{songsState.songs &&*/}
                {/*    songsState.songs.map((item) => {*/}
                {/*        return (*/}
                {/*            <Song*/}
                {/*                key={item.id}*/}
                {/*                item={item}*/}
                {/*                classes={classes}*/}
                {/*            />*/}
                {/*        );*/}
                {/*    })}*/}
                {this.state.songs.map((item) => {
                    return (
                        <Song
                            key={item.id}
                            item={item}
                            classes={classes}
                        />
                    );
                })}
                <div
                    ref={loadingRef => (this.loadingRef = loadingRef)}
                    style={loadingCSS}
                >
                    <span style={loadingTextCSS}>Loading...</span>
                </div>
            </Container>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    SongsFetch: (page, limit) => dispatch(fetchSongs(page, limit)),
    FindSongFetch: (song) => dispatch(searchSong(song))
});

const mapStateToProps = ({songsState}) => ({songsState});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Songs));
