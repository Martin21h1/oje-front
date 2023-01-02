import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalWindow (props) {
    const [isOpened, setIsOpened] = useState(false);
    const dispatch = useDispatch();

    const handleOpenClick = () => {
        setIsOpened((isOpened) => !isOpened);
    };

    useEffect(() => {
        setIsOpened((isOpened) => !isOpened);
    }, []);

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(props.onClick(props.id));
    };

    return (
        <Dialog
            open={isOpened}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleOpenClick}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {props.content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleOpenClick} color="primary">
                    Disagree
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
};
