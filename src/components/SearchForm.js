import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import {InputTextField} from "./fields";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";
import {searchSong} from "../store/songs/actions";

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
    }
}))

export default function SearchForm (props) {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch()
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
        dispatch(searchSong(state, history))
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
                        error={usersState.err_fields[name] ? true: null}
                        helperText={usersState.err_fields[name] ? usersState.err_fields[name]: null}
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
        </form>
    );
}
