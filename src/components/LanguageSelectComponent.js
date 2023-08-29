import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import {GetLanguages, setNativeLanguageId, updateUserData} from "../store/users/actions";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import LanguageIcon from '@mui/icons-material/Language';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function LanguageSelect() {
    const dispatch = useDispatch();
    const {usersState, authState} = useSelector(state => state);
    const localStorageKey = 'langId';

    // const langId = localStorage.getItem(localStorageKey);

    useEffect(() => {
        if (!usersState.target_languages) {
            dispatch(GetLanguages())
        }

    }, []);

    const handleChange = (event) => {
        dispatch(setNativeLanguageId(event.target.value))

        if (authState.token) {
            dispatch(updateUserData({
                native_language_id: event.target.value,
            }));
        }
    };

    return (
        <FormControl sx={{m: 1, minWidth: 80}} size="small" hiddenLabel>
            <InputLabel id="demo-select-small-label"
                        style={{color: 'white'}}>
                <LanguageIcon/>
            </InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={localStorage.getItem(localStorageKey)}
                label="Language"
                onChange={handleChange}
                style={{color: 'white'}}
            >
                {usersState.native_languages &&
                    usersState.native_languages
                        .map((item) => {
                            return (
                                <MenuItem key={item.name} value={item.id}>{item.name}</MenuItem>
                            );
                        })}
            </Select>
        </FormControl>
    );
}
