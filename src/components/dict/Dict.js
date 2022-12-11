import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/Container";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {userGetDict} from "../../store/users/actions";
import Row from "./Row";

const useStyles = makeStyles(theme=>({
    container: {
        marginTop: theme.spacing(2),
        flexDirection: 'column',
        alignItems: 'center',
    }
}));

export default function Dict() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const {usersState} = useSelector(state => state);

    useEffect(() => {
        dispatch(userGetDict())
    }, [])

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
                    {usersState.words.map((row) => (
                        <Row row={row}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
