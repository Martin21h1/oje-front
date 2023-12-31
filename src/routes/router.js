import React from "react";
import {useSelector} from "react-redux";

import {
    BrowserRouter as Router, Routes, Route
} from 'react-router-dom';
import Header from '../components/Header';
import history from '../history';
import SetPassword from "../pages/SetPassword";
import ResetPassword from "../pages/ResetPassword";
import SecondStep from "../pages/SecondStep";
import LikedSongsPage from "../pages/LikedSongs";
import ArtistSongsPage from "../pages/ArtistSongs";
import Profile from "../pages/Profile";
import Songs from "../pages/Home";
import Dictionary from "../pages/Dictionary";
import Artists from "../pages/Artist";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import FoundSongPage from "../pages/FoundSong";
import SongPage from "../pages/Song";


export default function MainRouter() {
    const {authState} = useSelector(state => state);

    return (<Router history={history}>
        <div>
            <div>
                <Header/>
            </div>
            {authState.token ? <Routes>
                <Route exact path="/" element={<Songs/>}/>
                <Route path="/artists/" element={<Artists/>}/>
                <Route path="/profile/" element={<Profile/>}/>
                <Route path="/likedSongs/" element={<LikedSongsPage/>}/>
                <Route path='/artist/:name' element={<ArtistSongsPage/>}/>
                <Route path='/song/:songName/artist/:artistName' element={<FoundSongPage/>}/>
                <Route path='artist/:artistName/song/:songName/' element={<SongPage/>}/>
                <Route path='/dict/' element={<Dictionary/>}/>
                <Route path='/setPassword/' element={<SetPassword/>}/>
                <Route path='/changePassword/' element={<ResetPassword/>}/>
                <Route path='/secondStep/' element={<SecondStep/>}/>
            </Routes> : <Routes>
                <Route path="/artists/" element={<Artists/>}/>
                <Route path='artist/:artistName/song/:songName/' element={<SongPage/>}/>
                <Route path='/song/:songName/artist/:artistName' element={<FoundSongPage/>}/>
                <Route exact path="/" element={<Songs/>}/>
                <Route path='/artist/:name' element={<ArtistSongsPage/>}/>
                <Route path="/login/" element={<SignIn/>}/>
                <Route path="/signup/" element={<SignUp/>}/>
            </Routes>}
        </div>
    </Router>)
}
