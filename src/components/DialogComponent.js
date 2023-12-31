import React, {useState, useEffect} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import {useMediaQuery} from '@mui/material';

const GadgetDialog = () => {
    const [open, setOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width: 600px)'); // Adjust the breakpoint as needed
    const localStorageKey = 'hasSeenGadgetDialog';

    useEffect(() => {
        const hasSeenDialog = localStorage.getItem(localStorageKey);

        if (isMobile && !hasSeenDialog) {
            setOpen(true);
        }
    }, [isMobile]);

    const handleClose = () => {
        setOpen(false);
        localStorage.setItem(localStorageKey, 'true');
    };
    return (<Dialog open={open} onClose={handleClose}>
        {/*<DialogTitle>Gadget Dialog</DialogTitle>*/}
        <DialogContent>
            <DialogContentText>
                Find songs with the search upon.
                Click on words and select images.
                Select language for translation.
            </DialogContentText>
        </DialogContent>
    </Dialog>);
};

export default GadgetDialog;
