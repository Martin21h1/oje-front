import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import IconButton from "@material-ui/core/IconButton";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import {addToDict} from "../store/users/actions";
import LoginDialog from "./DialogLoginComponent";
import {useNavigate} from "react-router";


export default function AddToDict(props) {
    const [addDict, setAddedDict] = useState(null);
    const {wordsState, songsState} = useSelector(state => state);
    const dispatch = useDispatch();
    const {authState} = useSelector(state => state);
    const [loginDialogVisible, setLoginDialogVisible] = useState(false); // State for LoginDialog visibility
    const navigate = useNavigate();

    const handleAddToDict = () => {
        if (!authState.token) {
            navigate('/login')

            // Show the LoginDialog when authState.tone is missing
            // setLoginDialogVisible(true);
        } else {
            const image_to_dict = props.image ? props.image : songsState.images[0].url;
            dispatch(
                addToDict({
                    word_id: wordsState.word.id,
                    prime_picture: image_to_dict,
                    song_id: props.song.id
                })
            );
            setAddedDict(true);
        }
    };
    const closeLoginDialog = () => {
        setLoginDialogVisible(false); // Close LoginDialog
    };

    return (
        <IconButton sx={{marginRight: 'auto'}}>
            {addDict ? (
                <PlaylistAddCheckIcon/>
            ) : (
                <div>
                    <PlaylistAddIcon onClick={handleAddToDict}/>
                    <LoginDialog open={loginDialogVisible} onClose={closeLoginDialog}/>
                </div>
            )}
        </IconButton>
    );
};
