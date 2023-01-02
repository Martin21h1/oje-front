import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate} from "react-router-dom";

import {getProfileFetch, updateUserData} from "../store/users/actions";
import {InputTextField} from "../components/fields";
import Languages from "../components/languages";

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Alert from '@mui/material/Alert';

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
}));

const FIELDS = [
    {
        name: 'name',
        label: 'Name',
    }
];

export default function Profile() {
    const dispatch = useDispatch();
    const {usersState} = useSelector(state => state);
    const {errorsState} = useSelector(state => state);

    const classes = useStyles();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    useEffect(() => {
        if (!usersState.username) {
            dispatch(getProfileFetch());
        }
        setUsername(usersState.username)
    }, [usersState.username]);

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(updateUserData({
            name: username,
            native_language_id: usersState.native_language_id,
            target_language_id: usersState.target_language_id
        }, navigate));
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Profile
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    {
                        FIELDS.map(({name, label}) => <InputTextField
                            label={label}
                            name={name}
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                            error={errorsState.fields[name] ? true : null}
                            helperText={errorsState.fields[name] || null}
                            className={classes.textField}
                        />)
                    }
                    <Languages/>
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
                        <Link to={'/resetPassword'}>
                            Reset Password
                        </Link>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};
