import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {useNavigate} from 'react-router-dom';
import {InputTextField} from "../components/fields";
import {makeStyles} from "@material-ui/core/styles";
import {signUpUser} from "../store/users/actions";
import Alert from "@mui/material/Alert";

const useStyles = makeStyles(theme => ({
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
    textField: {
        marginTop: theme.spacing(2),
        margin: 'normal',
        width: '100%', // Fix IE 11 issue.
    },
    alert: {
        marginTop: theme.spacing(1),
    }
}))

const FIELDS = [
    {
        name: 'username',
        label: 'Username',
    },
    {
        name: 'email',
        label: 'Email',
    },
    {
        name: 'password',
        label: 'Password',
    }
];

export default function SignUp() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {usersState} = useSelector(state => state);

    const [state, setState] = useState('');

    const handleChange = (event) => {
        const key = event.target.name;
        const value = event.target.value;
        setState(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(signUpUser(state, navigate))
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    {
                        FIELDS.map(({name, label}) => <InputTextField
                            label={label}
                            name={name}
                            value={state.name}
                            onChange={handleChange}
                            error={usersState.err_fields[name] ? true : null}
                            helperText={usersState.err_fields[name] ? usersState.err_fields[name] : null}
                            className={classes.textField}
                        />)
                    }
                    {usersState.err_message ?
                        <Alert variant="outlined" severity="error" className={classes.alert}>
                            {usersState.err_message}
                        </Alert> : null}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
