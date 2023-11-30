import React, {useEffect, useRef, useState} from 'react';

import {makeStyles} from "@material-ui/core/styles";
import YouTube from 'react-youtube';

const useStyles = makeStyles({
    videoResponsive: {
        overflow: 'hidden', position: 'relative', width: '100%', paddingTop: '56.25%', // 16:9 aspect ratio (9 / 16 = 0.5625 or 56.25%)
    }, iframe: {
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
    },
});

const lyrics = [{
    "start": 15.492, "end": 21.431, "text": " I spend my nights on overdrive"
}, {
    "start": 21.492, "end": 30.431, "text": "I live my life so overtired"
}, {
    "start": 30.492,
    "end": 30.831,
    "text": " I spend my nights on overdrive I live my life so overtired And there's nowhere I can hide Now I live my life on overdrive"
},


]


export default function YoutubeEmbed(props) {
    const classes = useStyles();
    const [currentTime, setCurrentTime] = useState(0);

    const youtubeRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(async () => {
            if (youtubeRef.current) {
                const player = youtubeRef.current.internalPlayer;
                const time = await player.getCurrentTime();
                setCurrentTime(time);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, []);


    const func = () => {
        console.log(currentTime)
    }
    const currentLyric = lyrics.find(lyric => currentTime >= lyric.start && currentTime <= lyric.end);

    const opts = {
        height: '100%', width: '100%'
    };

    return (<div>
            <div className={classes.videoResponsive}>
                <YouTube
                    ref={youtubeRef}
                    className={classes.iframe}
                    videoId={props.embedId}
                    onPlay={func}
                    opts={opts}
                />
            </div>
            {/*<div className="lyrics">*/}
            {/*    {currentLyric && currentLyric.text}*/}
            {/*</div>*/}
        </div>

    );
};
