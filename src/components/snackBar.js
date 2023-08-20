import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {useEffect} from "react";
import {setErrorNull} from "../store/errors/actions";
import {useDispatch} from "react-redux";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackbarComponent(props) {
    const [open, setOpen] = React.useState(true);
    const dispatch = useDispatch();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };



    return (

            <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={props.severity} sx={{ width: '100%' }}>
                    {props.message}
                </Alert>
            </Snackbar>

    );
}