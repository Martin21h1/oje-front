import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ResetPasswordFetch} from '../../store/users/actions';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {withStyles} from '@material-ui/core/styles';

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

class ResetPassword extends Component {
    state = {
        OldPassword: '',
        password: '',
        password2: '',
    };
    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.props.ResetPasswordFetch({
            old_password: this.state.OldPassword,
            password: this.state.password2
        })

    };

    render() {

        const {classes} = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>

                    <Typography component="h1" variant="h5">
                        Change password
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="OldPassword"
                            label="OldPassword"
                            type="Password"
                            id="OldPassword"
                            onChange={this.handleChange}
                            autoComplete="password"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={this.handleChange}
                            autoComplete="current-password"
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password2"
                            label="Password2"
                            type="password"
                            id="password2"
                            onChange={this.handleChange}
                            autoComplete="password2"
                        />
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
    ResetPasswordFetch: userInfo => dispatch(ResetPasswordFetch(userInfo, history)),
});

export default connect(null, mapDispatchToProps)(withStyles(styles)(ResetPassword));
