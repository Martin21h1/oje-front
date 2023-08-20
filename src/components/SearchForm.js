import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";

import {InputTextField} from "./Fields";
import {searchSong} from "../store/songs/actions";

import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import Alert from "@mui/material/Alert";
import {CircularProgress} from "@material-ui/core";
import SnackbarComponent from "./snackBar";
import {setErrorNull} from "../store/errors/actions";

const FIELDS = [
    {
        name: 'title',
        label: 'Song title',
    }, {
        name: 'artist',
        label: 'Artist name',
    }
];

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
        marginLeft: theme.spacing(1),

    },
    submit: {
        margin: theme.spacing(3, 1, 0), // Adjusted the margin to match other elements
        width: '90%', // Make the button span the whole width
        [theme.breakpoints.up('sm')]: {
            width: '50%',
        },
        [theme.breakpoints.up('md')]: {
            width: '10%',
        },
    },
    textField: {
        margin: theme.spacing(2, 1, 0),
        width: '90%',
        [theme.breakpoints.up('sm')]: {
            width: '50%',
        },
        [theme.breakpoints.up('md')]: {
            width: '30%',
        },
    },
    alert: {
        marginTop: theme.spacing(1),
    },
}));

export default function SearchForm() {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { errorsState, songsState } = useSelector(state => state);

    const [state, setState] = useState('');

    const handleChange = event => {
        const {name, value} = event.target;
        setState({...state, [name]: value});
    };

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(setErrorNull())
        dispatch(searchSong(state, navigate));
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            {FIELDS.map(({ name, label }) => (
                < InputTextField
                    className={classes.textField}
                    key={`${name}-${label}`}
                    label={label}
                    name={name}
                    value={state.name}
                    onChange={handleChange}
                    error={!!errorsState.fields[name] || null}
                    helperText={errorsState.fields[name] || null}
                    variant="outlined"
                    fullWidth
                />
            ))}
            <Button
                type="submit"
                variant="contained"
                color="primary"
                margin="normal"
                size="large"
                className={classes.submit}
                disabled={songsState.searchLoading}
            >
                {songsState.searchLoading ? <CircularProgress size={24} /> : 'Search'}
            </Button>
            {errorsState.message && (
                <SnackbarComponent severity="error"
                                   message={errorsState.message}/>
                // <Alert variant="outlined" severity="error" className={classes.alert}>
                //     {errorsState.message}
                // </Alert>
            )}
        </form>
    );
}
