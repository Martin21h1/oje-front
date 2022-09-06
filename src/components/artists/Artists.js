import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import Container from "@material-ui/core/Container";
import {ArtistsFetch} from "../../store/artists/actions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";


const styles = theme => ({
    container: {
        marginTop: theme.spacing(2),
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        marginTop: theme.spacing(2),
        flexDirection: 'column',
        alignItems: 'center',
        width: 56,
        height: 56
    }
});


class Artists extends Component {

    componentDidMount() {
        const {artistsState, ArtistsFetch} = this.props;
        if (artistsState.artists.length === 0) {
            ArtistsFetch();
        }
    }

    render() {
        const {classes, artistsState, history} = this.props;
        return (

            <Container component="main" className={classes.container}>

                {artistsState.artists &&
                    artistsState.artists.map((item) => {
                        return (
                            <div>
                                <Avatar aria-label="recipe" className={classes.avatar}
                                        onClick={() => history.push(`/artist/${item.name}/`)}
                                        src={item.image_url}
                                />
                                <Typography paragraph>{item.name}</Typography>
                            </div>
                        );

                    })}
            </Container>
        );
    }
}


const mapDispatchToProps = (dispatch) => ({
    ArtistsFetch: () => dispatch(ArtistsFetch())
});

const mapStateToProps = ({artistsState}) => ({artistsState});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Artists));

