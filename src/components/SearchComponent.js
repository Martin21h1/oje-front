import React, {useState} from 'react';
import {styled, alpha} from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useDispatch, useSelector} from "react-redux";
import {searchHeaderSong, setSong} from "../store/songs/actions";
import {useNavigate} from "react-router";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        // marginLeft: theme.spacing(3), width: 'auto',
        marginRight: theme.spacing(3), width: 'auto',
    },
    [theme.breakpoints.up('xs')]: {
        // marginLeft: theme.spacing(1), width: 'auto',
        marginRight: theme.spacing(1), width: 'auto',

    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',

        [theme.breakpoints.up('xs')]: {
            width: '0ch',
            '&:focus': {
                width: '14ch',
            },
        },
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

function ActiveSearch() {
    const [searchValue, setSearchValue] = useState('');
    const [menuAnchor, setMenuAnchor] = useState(null);
    const dispatch = useDispatch();
    const {songsState} = useSelector(state => state);
    const navigate = useNavigate();

    const handleSearchInputChange = (event) => {
        const newValue = event.target.value;
        if (newValue.trim() !== '') {
            dispatch(searchHeaderSong(newValue, false));

        }
        setSearchValue(newValue);
        setMenuAnchor(event.target);
    };

    const handleCloseMenu = () => {
        setMenuAnchor(null);
    };
    const handleOpenClick = (song) => {
        dispatch(setSong(song))
        navigate(`artist/${song['name']}/song/${song['title']}`)
        setMenuAnchor(null);
        setSearchValue('');
    };
    const handleSearchClick = (song) => {
        if (song.trim() !== '') {
            dispatch(searchHeaderSong(song, true));

        }
    };


    return (<div>
        <Search>
            <SearchIconWrapper>
                <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Eminem - Wihtout me"
                inputProps={{'aria-label': 'search'}}
                value={searchValue}
                onChange={handleSearchInputChange}
            />
        </Search>
        <Menu
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={handleCloseMenu}
            disableAutoFocus={true}
            autoFocus={null}
        >
            {songsState.foundHeaderSong.map((result, index) => (<MenuItem
                onClick={() => handleOpenClick(result)}
                key={index}>{`${result['name']} - ${result['title']}`}</MenuItem>))}
            {songsState.foundHeaderSong.length === 0 && searchValue.trim() !== '' ? <MenuItem
                onClick={() => handleSearchClick(searchValue)}
            >
                Global search
            </MenuItem> : null}
        </Menu>
    </div>);
}

export default ActiveSearch;
