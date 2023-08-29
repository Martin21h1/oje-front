import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {useDispatch} from "react-redux";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackbarComponent(props) {
    const [open, setOpen] = React.useState(true);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    return (
        <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={props.severity} sx={{width: '100%'}}>
                {props.message}
            </Alert>
        </Snackbar>

    );
}