import React from "react";
import {Route, Switch} from "react-router-dom";
import { Router } from "react-router-dom";
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
            <Switch>
                <Route exact path="/" component={Songs}/>
                <Route path="/login/" component={SignIn}/>
                <Route path="/artists/" component={Artists}/>
                <Route path="/signup/" component={SignUp}/>
                <Route path="/profile/" component={Profile}/>
                <Route path="/likedSongs/" component={LikedSongsPage}/>
                <Route path='/artist/:name' component={ArtistSongsPage}/>
                <Route path='/song/:songName/artist/:artistName' component={FoundSongPage}/>
                <Route path='/dict/' component={Dictionary}/>
                <Route path='/setPassword/' component={SetPassword}/>
                <Route path='/resetPassword/' component={ResetPassword}/>
                <Route path='/secondStep/' component={SecondStep}/>
            </Switch>
        </div>
    </Router>);

export default router