import React, {Component} from 'react';
import {connect} from 'react-redux';
import {GetLanguages, getProfileFetch, userUpdateDataFetch} from '../../store/users/actions';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {withStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";


const styles = theme => ({

    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});




const InputTextField = ({value, label, name, onChange}) =>
    <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id={name}
        label={label}
        name={name}
        autoComplete={name}
        value={value}
        onChange={onChange}
    />;

class SecondStep extends Component {
    state = {
        native_language_id: '',
        target_language_id: '',

    };

    handleChange = event => {
        console.log('event', event.target.value)
        console.log('event.target.name', event.target)

        this.setState({
            [event.target.name]: event.target.value

        });
        console.log(this.state)
    };

    handleSubmit = event => {
        const {userUpdateDataFetch} = this.props;

        event.preventDefault();
        userUpdateDataFetch(this.state)
    };

    componentDidMount() {
        const {getProfileFetch, GetLanguages, usersState} = this.props;
        // if (usersState.currentUser===0) {
        //     console.log(usersState.currentUser, 'usersState.currentUser')
        //     getProfileFetch();
        //
        // }
        console.log('usersState', usersState)
        GetLanguages();
        getProfileFetch();
    }

    componentWillReceiveProps(newProps) {
        if (this.state.name !== newProps.usersState.username) {
            this.setState({
                name: newProps.usersState.username
            })
        }

        if (this.state.native_language_id !== newProps.usersState.native_language_id) {
            console.log('newProps.usersState.native_language_id', newProps.usersState.native_language_id)
            this.setState({
                native_language_id: newProps.usersState.native_language_id
            })
            console.log('this.state', this.state)

        }

        if (this.state.target_language_id !== newProps.usersState.target_language_id) {
            this.setState({
                target_language_id: newProps.usersState.target_language_id
            })
        }

        // if (this.state.email !== newProps.usersState.currentUser.email) {
        //     this.setState({
        //         email: newProps.usersState.currentUser.email
        //     })
        // }

    }

    render() {
        const {handleChange} = this;
        const {classes, usersState, history} = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>

                    <Typography component="h1" variant="h5">
                        Choose languages
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={this.handleSubmit}>

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Native Language</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="native_language_id"
                                value={this.state.native_language_id}
                                label="Native Language"
                                onChange={handleChange}
                            >
                                {usersState.native_languages &&
                                    usersState.native_languages.map((item) => {
                                        return (
                                            <MenuItem value={item.id}>{item.name}</MenuItem>
                                        );
                                    })}
                            </Select>
                        </FormControl>

                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Target Language</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                name="target_language_id"
                                value={this.state.target_language_id}
                                label="Target Language"
                                onChange={handleChange}
                            >
                                {usersState.target_languages &&
                                    usersState.target_languages.map((item) => {
                                        return (
                                            <MenuItem value={item.id}>{item.name}</MenuItem>
                                        );
                                    })}
                            </Select>
                        </FormControl>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Save
                        </Button>
                        <Grid container>

                        </Grid>
                    </form>


                </div>
            </Container>
        );
    }
}


const mapDispatchToProps = (dispatch, {history}) => ({
    getProfileFetch: () => dispatch(getProfileFetch(history)),
    GetLanguages: () => dispatch(GetLanguages()),
    userUpdateDataFetch: (data) => dispatch(userUpdateDataFetch(data))
});
const mapStateToProps = ({usersState}) => ({usersState});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SecondStep));

