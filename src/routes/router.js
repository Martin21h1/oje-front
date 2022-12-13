import React from "react";
import {
    BrowserRouter as Router
    , Routes, Route
} from 'react-router-dom';
import Header from '../components/Header'
import history from '../history';
import SetPassword from "../pages/SetPassword";
import ResetPassword from "../pages/ResetPassword";
import SecondStep from "../pages/SecondStep";
import LikedSongsPage from "../pages/LikedSongs";
import ArtistSongsPage from "../pages/ArtistSongs";
import FoundSongPage from "../pages/FoundSong";
import Profile from "../pages/Profile";
import Songs from "../pages/Home";
import Dictionary from "../pages/Dictionary";
import Artists from "../pages/Artist";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const router = (
    <Router history={history}>
        <div>
            <div>
                <Header/>
            </div>
            <Routes>
                <Route exact path="/" element={<Songs/>}/>
                <Route path="/login/" element={<SignIn/>}/>
                <Route path="/artists/" element={<Artists/>}/>
                <Route path="/signup/" element={<SignUp/>}/>
                <Route path="/profile/" element={<Profile/>}/>
                <Route path="/likedSongs/" element={<LikedSongsPage/>}/>
                <Route path='/artist/:name' element={<ArtistSongsPage/>}/>
                <Route path='/song/:songName/artist/:artistName' element={<FoundSongPage/>}/>
                <Route path='/dict/' element={<Dictionary/>}/>
                <Route path='/setPassword/' element={<SetPassword/>}/>
                <Route path='/resetPassword/' element={<ResetPassword/>}/>
                <Route path='/secondStep/' element={<SecondStep/>}/>
            </Routes>
        </div>
    </Router>);

export default router