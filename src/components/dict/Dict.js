import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/Container";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {DeleteWord, userGetDict} from "../../store/users/actions";
import Row from "./Row";


const styles = theme => ({
    container: {
        marginTop: theme.spacing(2),
        flexDirection: 'column',
        alignItems: 'center',
    }
});


class Dict extends Component {

    componentDidMount() {
        this.props.userGetDict();
    }


    render() {
        const {usersState} = this.props;
        return (
            <TableContainer component={Paper}>
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
}

const mapDispatchToProps = {
    userGetDict,
    DeleteWord
};

const mapStateToProps = ({usersState}) => ({usersState});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dict));