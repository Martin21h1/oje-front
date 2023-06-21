import React from 'react';

import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    videoResponsive: {
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
        paddingTop: '56.25%', // 16:9 aspect ratio (9 / 16 = 0.5625 or 56.25%)
    },
    iframe: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
});

export default function YoutubeEmbed(props) {
    const classes = useStyles();

    return (
        <div className={classes.videoResponsive}>
            <iframe
                className={classes.iframe}
                width="853"
                height="480"
                src={`https://www.youtube.com/embed/${props.embedId}`}
                allow="accelerometer; autoplay; clipboard-write; gyroscope; picture-in-picture"
                allowFullScreen
                title="Youtube"
            />
        </div>
    );
};
