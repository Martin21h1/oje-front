import React from 'react';
import Container from "@material-ui/core/Container";
import Song from './Song'
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles({
    container: {
        // marginTop: theme.spacing(2),
        flexDirection: 'column',
        alignItems: 'center',
    }
})

export default function SongsComponent(props) {
    const classes = useStyles();

    return (
        <Container component="main" className={classes.container}>
            {props.songs &&
                props.songs.map((item) => {
                    return (
                        <Song
                            key={item.id}
                            item={item}
                            classes={classes}
                        />
                    );
                })}
        </Container>
    );
}
