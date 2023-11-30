import {Box} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {LikeImage} from "../store/songs/actions";


export default function New(props) {

    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const {wordsState, songsState} = useSelector(state => state);

    const handleCurrentImage = image => {
        setImage(image.url);
        dispatch(LikeImage(image.id, props.song.id, wordsState.word.id))
    };


    return (songsState.images ? songsState.images.map((step) => (<div key={step.url}>
        <Box
            component="img"
            sx={{
                height: 255, display: 'block', maxWidth: 400, overflow: 'hidden', width: '100%',
            }}
            src={step.url}
            alt={step.url}
        />
        <IconButton onClick={() => handleCurrentImage(step)}>
            {step.url === image ? <StarIcon/> : < StarBorderIcon/>}
        </IconButton>
    </div>)) : null)
}