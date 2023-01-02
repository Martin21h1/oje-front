import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom';

import {InputTextField} from "../components/fields";
import {signInUser, userLoginWithGoogle} from "../store/users/actions";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {makeStyles} from '@material-ui/core/styles';
import Alert from "@mui/material/Alert";

const FIELDS = [
    {
        name: 'email',
        label: 'Email',
    }, {
        name: 'password',
        label: 'Password',
    }
];

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
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    textField: {
        marginTop: theme.spacing(2),
        margin: 'normal',
        width: '100%', // Fix IE 11 issue.
    },
    alert: {
        marginTop: theme.spacing(1),
    }
}));
//
// import { useState } from 'react';
//
// function MyForm() {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: '',
//     });
//     const [errors, setErrors] = useState({});
//     const [backendError, setBackendError] = useState(null);
//
//     function handleChange(event) {
//         const {name, value} = event.target;
//         setFormData({...formData, [name]: value});
//     }
//
//     function validateForm() {
//         const newErrors = {};
//
//         if (!formData.name) {
//             newErrors.name = 'Name is required';
//         }
//
//         if (!formData.email) {
//             newErrors.email = 'Email is required';
//         }
//
//         if (!formData.password) {
//             newErrors.password = 'Password is required';
//         }
//
//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     }
//
//     async function handleSubmit(event) {
//         event.preventDefault();
//         if (validateForm()) {
//             try {
//                 const response = await fetch('/api/users', {
//                     method: 'POST',
//                     body: JSON.stringify(formData),
//                     headers: {
//                         'Content-Type': 'application/json'
//                     }
//                 });
//                 const data = await response.json();
//                 if (data.error) {
//                     setBackendError(data.error);
//                 } else {
//                     // form was successfully submitted
//                 }
//             } catch (error) {
//                 console.error(error);
//                 setBackendError('There was an error submitting the form. Please check your internet connection and try again.');
//             }
//         }
//     }
//
//     return (
//         <form onSubmit={handleSubmit}>
//             <label htmlFor="name">Name:</label>
//             <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//             />
//             {errors.name && <p>{errors.name}</p>}
//
//             <label htmlFor="email">Email:</label>
//             <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//             />
//             {errors.email && <p>{errors.email}</p>}
//
//             <label htmlFor="password">Password:</label>
//             <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//             />
//             {errors.password && <p>{errors.password}</p>}
//
//             {backendError && <p>{backendError}</p>}
//
//             <button type="submit">Sign Up</button>
//         </form>)
// }
//


export default function SignIn() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {errorsState} = useSelector(state => state);
    const [state, setState] = useState('');

    const handleChange = (event) => {
        const {name, value} = event.target;
        setState({...state, [name]: value});
    }

    const handleSubmit = event => {
        event.preventDefault();
        dispatch(signInUser(state, navigate));
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign In
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    {
                        FIELDS.map(({name, label}) => <InputTextField
                            label={label}
                            name={name}
                            value={state.name}
                            onChange={handleChange}
                            error={!!errorsState.fields[name] || null}
                            helperText={errorsState.fields[name] || null}
                            className={classes.textField}
                        />)
                    }
                    {errorsState.message ?
                        <Alert variant="outlined" severity="error" className={classes.alert}>
                            {errorsState.message}
                        </Alert> : null}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                    </Grid>
                </form>
            </div>
            <Button onClick={() => dispatch(userLoginWithGoogle())}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
            >
                Sign In with Google
            </Button>
        </Container>
    );
};
