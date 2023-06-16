import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {InputTextField} from "../components/Fields";
import {ResetPasswordFetch} from '../store/users/actions';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core/styles';
import Alert from "@mui/material/Alert";

const FIELDS = [
    {
        name: 'old_password',
        label: 'Old Password',
    },
    {
        name: 'password',
        label: 'Password',
    },
    {
        name: 'password',
        label: 'Repeat password',
    }
];

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
    textField: {
        marginTop: theme.spacing(2),
        margin: 'normal',
        width: '100%', // Fix IE 11 issue.
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    alert: {
        marginTop: theme.spacing(1),
    }
}));

export default function ResetPassword() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {errorsState} = useSelector(state => state);

    const [state, setState] = useState('');

    const handleChange = (event) => {
        const {name, value} = event.target;
        setState({...state, [name]: value});
    }

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(ResetPasswordFetch(state, navigate));
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Change password
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    {
                        FIELDS.map(({name, label}) => <InputTextField
                            label={label}
                            name={name}
                            value={state.name}
                            onChange={handleChange}
                            error={!!errorsState.fields[name] || null}
                            helperText={errorsState.fields[name] || null}
                            className={classes.textField}
                        />)
                    }
                    {errorsState.message ?
                        <Alert variant="outlined" severity="error" className={classes.alert}>
                            {errorsState.message}
                        </Alert> : null}
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
};
