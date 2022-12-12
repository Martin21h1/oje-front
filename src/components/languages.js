import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import {FormControl, InputLabel, MenuItem, Select} from "@material-ui/core";
import {GetLanguages, getProfileFetch, setNativeLanguageId, setTargetLanguageId} from "../store/users/actions";

const useStyles = makeStyles(theme=>({
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
    }
}));

export default function Languages() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const {usersState} = useSelector(state => state);
    const [native_language_id, setNativeLanguage] = useState('');
    const [target_language_id, setTargetLanguage] = useState('');

    useEffect(() => {
        if (!usersState.native_languages) {
            dispatch(GetLanguages())
            dispatch(getProfileFetch())
        }

        if (usersState.native_language_id) {
            setNativeLanguage(usersState.native_language_id)
            setTargetLanguage(usersState.target_language_id)
        }
    }, [usersState])

    return (
            <div className={classes.paper}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Native Language</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="native_language_id"
                            value={native_language_id}
                            label="Native Language"
                            onChange={event =>  dispatch(setNativeLanguageId(event.target.value))}
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
                            value={target_language_id}
                            label="Target Language"
                            onChange={event =>  dispatch(setTargetLanguageId(event.target.value))}
                        >
                            {usersState.target_languages &&
                                usersState.target_languages.map((item) => {
                                    return (
                                        <MenuItem value={item.id}>{item.name}</MenuItem>
                                    );
                                })}
                        </Select>
                    </FormControl>
            </div>
    )
}
