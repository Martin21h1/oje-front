import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from 'react-router-dom'
import {Box} from "@material-ui/core";

const styles = theme => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 3, 2),
    },
    textField: {
        margin: theme.spacing(2, 1, 0),

        // width: '100%', // Fix IE 11 issue.
    }
});

class SearchForm extends Component {
    state = {
        title: '',
        artist: '',
    };
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    componentWillReceiveProps(newProps) {
        if (this.props.title !== newProps.title) {
            this.setState({
                title: newProps.title
            })
        }
        if (this.props.artist !== newProps.artist) {
            this.setState({
                artist: newProps.artist
            })
        }
    }

    render() {
        const {classes, onSubmit, history} = this.props;
        return (
            <form className={classes.form} noValidate onSubmit={e => {
                e.preventDefault()
                // console.log('this.state', this.state)
                onSubmit(this.state)
            }}>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': {m: 1, width: '25ch'},
                    }}
                    noValidate
                >
                    <TextField
                        id="outlined-multiline-static"
                        required
                        label="Artist"
                        name="artist"
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        value={this.state.artist}
                        onChange={this.handleChange}/>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        id="song"
                        label="Song"
                        name="title"
                        autoComplete="song"
                        className={classes.textField}
                        value={this.state.title}
                        onChange={this.handleChange}/>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        margin="normal"
                        size="large"
                        className={classes.submit}
                        onClick={() => history.push(`/song/${this.state.title}/artist/${this.state.artist}`)}
                    >
                        Search
                    </Button>
                </Box>
            </form>
        );
    }
}

export default withRouter(withStyles(styles)(SearchForm));
