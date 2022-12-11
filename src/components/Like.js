import React from "react";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    like: {
        display: 'flex',
        alignItems: 'center',
    },
});

export default function Like(props) {
    const classes = useStyles();
    if (!props.like) {
        return <ThumbUpAltIcon/>
    } else {
        return <div className={classes.like}><ThumbUpAltIcon/>{props.like}</div>
    }
}
