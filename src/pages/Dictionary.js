import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {userGetDict} from "../store/users/actions";
import Row from "../components/Row";

import {makeStyles} from '@material-ui/core/styles';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/Container";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";


const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(2),
        flexDirection: 'column',
        alignItems: 'center',
    }
}));

export default function Dictionary() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {usersState} = useSelector(state => state);

    useEffect(() => {
        dispatch(userGetDict())
    }, [usersState.words.length]);
    return (
        <TableContainer component={Paper} className={classes.container}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">Words</TableCell>
                        <TableCell align="left">Translate</TableCell>
                        <TableCell align="left">Images</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {usersState.words.length > 0 ? (
                        usersState.words.map((row) => <Row row={row} />)
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3} align="center">
                                No words available.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}