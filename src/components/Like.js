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
    const {like = 0} = props;

    return (
        <>
            {like > 0 ? (
                <div className={classes.like}><ThumbUpAltIcon/>{like}</div>
            ) : (
                <ThumbUpAltIcon/>
            )}
        </>
    );
}
