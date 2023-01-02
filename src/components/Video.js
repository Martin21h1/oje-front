import React from 'react';

import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    videoResponsive: {
        overflow: "hidden",
    }
});

export default function YoutubeEmbed(props) {
    const classes = useStyles();

    return (
        <div className={classes.videoResponsive}>
            <iframe
                width="853"
                height="480"
                src={`https://www.youtube.com/embed/${props.embedId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
            />
        </div>
    );
};
