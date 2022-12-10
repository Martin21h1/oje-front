import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {DeleteWord} from "../../store/users/actions";
import MenuItem from "@material-ui/core/MenuItem";
import DeleteIcon from "@material-ui/icons/Delete";
import Modal from "../ModalWindow";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";

const styles = theme => ({
    container: {
        marginTop: theme.spacing(2),
        flexDirection: 'column',
        alignItems: 'center',
    },
    card: {
        maxWidth: 100,
        marginTop: theme.spacing(1),
    },
});

class Row extends Component {
    state = {
        isExpanded: false,
        isOpened: false,
        isOpenedModal: false,

    };

    handleExpandClick = () => {
        this.setState(({isExpanded}) => ({isExpanded: !isExpanded}));
    };

    handleOpenClick = event => {
        this.setState(({isOpened}) => ({isOpened: !isOpened}));
        this.setState({anchorEl: event.currentTarget});
    };

    handleOpenClickModal = () => {
        this.setState(({isOpenedModal}) => ({isOpenedModal: !isOpenedModal}));
    };

    render() {
        const {row, DeleteWord, classes} = this.props;

        return (
            <TableRow key={row.id}>
                <TableCell align="left">{row.word}</TableCell>
                <TableCell align="left">{row.translate}</TableCell>
                <TableCell align="left">
                    <img src={row.prime_picture} alt="picture" className={classes.card}/>
                </TableCell>
                <IconButton aria-label="settings">
                    <MoreVertIcon
                        onClick={this.handleOpenClick}
                    />
                    <Menu
                        open={this.state.isOpened}
                        onClose={this.handleOpenClick}
                        anchorEl={this.state.anchorEl}
                    >
                        <MenuItem onClick={this.handleOpenClickModal}>
                            <DeleteIcon
                                onClose={this.handleOpenClickModal}
                                open={this.state.isOpenedModal}
                            />
                            {this.state.isOpenedModal ? <Modal id={row.id}
                                                               onClick={DeleteWord}
                                                               title={`Delete Word ${row.word}`}
                                                               content={'Are you sure?'}
                            /> : null}
                        </MenuItem>
                    </Menu>
                </IconButton>

            </TableRow>
        )
    }
}

const mapDispatchToProps = {
    DeleteWord
};

const mapStateToProps = ({usersState}) => ({usersState});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Row));
