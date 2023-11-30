import React, {useEffect} from 'react';
import {
    Dialog, DialogActions, DialogContent, DialogContentText
} from '@mui/material';
import SignIn from "../pages/SignIn";

export default function LoginDialog({open, onClose}) {
    // No need to manage state locally, as it's being controlled by the parent component

    useEffect(() => {
        // You can keep the useEffect to manage initial opening behavior if needed
    }, []);

    return (<div>
        <Dialog open={open} onClose={onClose}>
            <DialogContent dividers>
                <DialogContentText>
                    <SignIn/>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            </DialogActions>
        </Dialog>
    </div>);
};