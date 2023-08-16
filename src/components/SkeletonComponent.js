import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import {makeStyles} from "@material-ui/core/styles";
import {red} from "@material-ui/core/colors";


const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 745,
        marginTop: theme.spacing(5),
    },
    media: {
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    like: {
        display: 'flex',
        alignItems: 'center',
    },
}));

export default function CardSkeleton() {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={

                    <Skeleton animation="wave" variant="circular" width={40} height={40}/>
                }
                title={
                    <Skeleton
                        animation="wave"
                        height={10}
                        width="80%"
                        style={{marginBottom: 6}}
                    />
                }
                subheader={
                    <Skeleton animation="wave" height={10} width="40%"/>
                }
            />
            <Skeleton sx={{height: 380}} animation="wave" variant="rectangular"/>
            <CardContent>
                <React.Fragment>
                    <Skeleton animation="wave" height={10} style={{marginBottom: 6}}/>
                    <Skeleton animation="wave" height={10} width="80%"/>
                </React.Fragment>
            </CardContent>
        </Card>
    );
}
