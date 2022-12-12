import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import Container from "@material-ui/core/Container";
import SearchForm from "../components/SearchForm";
import {fetchSongs, searchSong} from "../store/songs/actions";
import SongsComponent from "../components/songs";

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
        const {songsState, fetchSongs} = this.props;
        this.setState({loading: true});
        if (songsState.songs.length) {
            fetchSongs(page, this.state.limit);
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
        const {fetchSongs} = this.props;

        fetchSongs(this.state.page, this.state.limit);
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

        const {classes, searchSong} = this.props;
        return (
            <Container component="main" className={classes.container}>
                {localStorage.token ? <SearchForm onSubmit={searchSong}/> : null}
                <SongsComponent songs={this.state.songs}/>
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
    fetchSongs: (page, limit) => dispatch(fetchSongs(page, limit)),
    searchSong: (song) => dispatch(searchSong(song))
});

const mapStateToProps = ({songsState}) => ({songsState});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Songs));
