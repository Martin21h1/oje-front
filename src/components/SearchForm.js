import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import {InputTextField} from "./fields";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {searchSong} from "../store/songs/actions";
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
    const dispatch = useDispatch()
    const {songsState} = useSelector(state => state);

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
        dispatch(searchSong(state, navigate))
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            {
                FIELDS.map(({name, label}) => <InputTextField
                    className={classes.textField}
                    label={label}
                    name={name}
                    value={state.name}
                    onChange={handleChange}
                    error={songsState.err_fields[name] ? true : null}
                    helperText={songsState.err_fields[name] ? songsState.err_fields[name] : null}
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
            {songsState.err_message ?
                <Alert variant="outlined" severity="error" className={classes.alert}>
                    {songsState.err_message}
                </Alert> : null}
        </form>
    );
}
