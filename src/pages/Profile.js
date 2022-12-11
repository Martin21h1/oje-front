import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {Link} from "react-router-dom";
import {getProfileFetch, setUsername, updateUserData} from "../store/users/actions";
import {InputTextField} from "../components/fields";
import {makeStyles} from "@material-ui/core/styles";
import Languages from "../components/languages";
import {useHistory} from "react-router";

const useStyles = makeStyles(theme=>({
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

const FIELDS = [
    {
        name: 'name',
        label: 'Name',
    }
];

export default function Profile() {
    const dispatch = useDispatch()
    const {usersState} = useSelector(state => state);
    const classes = useStyles();
    const history = useHistory();

    useEffect(() => {
        if (!usersState.username) {
            dispatch(getProfileFetch())
        }

    }, [usersState.username])

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(updateUserData({name:usersState.username,
            native_language_id:usersState.native_language_id,
            target_language_id:usersState.target_language_id}))
        history.push('/');
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Profile
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    {
                        FIELDS.map(({name, label}) => <InputTextField
                            label={label}
                            name={name}
                            value={usersState.username}
                            onChange={(event) => dispatch(setUsername(event.target.value))}
                        />)
                    }
                    <Languages/>
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
                        <Link to={'/resetPassword'}>
                            Reset Password
                        </Link>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
