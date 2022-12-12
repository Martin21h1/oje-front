import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Languages from "../components/languages";
import {useHistory} from "react-router";
import {updateUserData} from "../store/users/actions";

const useStyles = makeStyles(theme => ({
    '@global': {
        body: {
            backgroundColor: theme.palette.common.white,
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),


    },
}))

export default function SecondStep() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const {usersState} = useSelector(state => state);
    const history = useHistory();

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(updateUserData({
            native_language_id: usersState.native_language_id,
            target_language_id: usersState.target_language_id,
        }))
        history.push(`/`)
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>

                <Typography component="h1" variant="h5">
                    Choose languages
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Languages/>
                    {usersState.err_message ? <Typography> {usersState.err_message} </Typography> : null}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Save
                    </Button>
                    <Grid container>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
