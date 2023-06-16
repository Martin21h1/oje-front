import React, {useState} from 'react';
import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";

import {InputTextField} from "./Fields";
import {searchSong} from "../store/songs/actions";

import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import Alert from "@mui/material/Alert";

const FIELDS = [
    {
        name: 'title',
        label: 'Title',
    }, {
        name: 'artist',
        label: 'Artist',
    }
];

const useStyles = makeStyles(theme => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 3, 2),
    },
    textField: {
        margin: theme.spacing(2, 1, 0),
    },
    alert: {
        marginTop: theme.spacing(1),
    }
}))

export default function SearchForm() {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {errorsState} = useSelector(state => state);

    const [state, setState] = useState('');

    const handleChange = (event) => {
        const {name, value} = event.target;
        setState({...state, [name]: value});
    };

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(searchSong(state, navigate));
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            {
                FIELDS.map(({name, label}) => <InputTextField
                    className={classes.textField}
                    key={`${name}-${label}`}
                    label={label}
                    name={name}
                    value={state.name}
                    onChange={handleChange}
                    error={!!errorsState.fields[name] || null}
                    helperText={errorsState.fields[name] || null}
                />)
            }
            <Button
                type="submit"
                variant="contained"
                color="primary"
                margin="normal"
                size="large"
                className={classes.submit}
            >
                Search
            </Button>
            {errorsState.message ?
                <Alert variant="outlined" severity="error" className={classes.alert}>
                    {errorsState.message}
                </Alert> : null}
        </form>
    );
};
