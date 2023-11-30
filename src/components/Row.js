import React, {useState} from 'react';

import Modal from "./ModalWindow";
import {DeleteWord} from "../store/users/actions";

import {makeStyles} from '@material-ui/core/styles';
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import MenuItem from "@material-ui/core/MenuItem";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(2), flexDirection: 'column', alignItems: 'center',
    }, card: {
        maxWidth: 100, marginTop: theme.spacing(1),
    },
}));

export default function Row(props) {
    const [isOpened, setIsOpened] = useState(false);
    const [isOpenedModal, setOpenModal] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {row} = props;

    const classes = useStyles();


    const handleOpenClick = event => {
        setIsOpened((isOpened) => !isOpened);
        setAnchorEl(event.currentTarget);
    };

    const handleOpenClickModal = () => {
        setOpenModal((isOpenedModal) => !isOpenedModal);
    };

    return (<TableRow key={row.id}>
        <TableCell align="left">{row.word}</TableCell>
        <TableCell align="left">{row.translate}</TableCell>
        <TableCell align="left">
            <img src={row.prime_picture} alt="picture" className={classes.card}/>
        </TableCell>
        <IconButton aria-label="settings">
            <MoreVertIcon
                onClick={handleOpenClick}
            />
            <Menu
                open={isOpened}
                onClose={handleOpenClick}
                anchorEl={anchorEl}
            >
                <MenuItem onClick={handleOpenClickModal}>
                    <DeleteIcon
                        onClose={handleOpenClickModal}
                        open={isOpenedModal}
                    />
                    {isOpenedModal ? <Modal id={row.id}
                                            onClick={DeleteWord}
                                            title={`Delete Word ${row.word}`}
                                            content={'Are you sure?'}
                    /> : null}
                </MenuItem>
            </Menu>
        </IconButton>
    </TableRow>);
};
