import React from "react";
import {Route, Switch} from "react-router-dom";
import { Router } from "react-router-dom";
import Songs from '../components/songs/Songs'
import UserPosts from '../components/songs/UserPosts'
import SignIn from '../components/users/SignIn'
import SignUp from '../components/users/SignUp'
import Profile from '../components/users/Profile'
import Header from '../components/Header'
import history from '../history';
import LikedPosts from '../components/songs/LikedSongs'
import Dict from "../components/dict/Dict";
import FoundSong from "../components/songs/FoundSong";
import Artists from "../components/artists/Artists";
import SetPassword from "../components/users/SetPassword";
import ResetPassword from "../components/users/ResetPassword";
import SecondStep from "../components/users/SecondStep";


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
                <Route path="/likedSongs/" component={LikedPosts}/>
                <Route path='/artist/:name' component={UserPosts}/>
                <Route path='/song/:songName/artist/:artistName' component={FoundSong}/>
                <Route path='/dict/' component={Dict}/>
                <Route path='/setPassword/' component={SetPassword}/>
                <Route path='/resetPassword/' component={ResetPassword}/>
                <Route path='/secondStep/' component={SecondStep}/>
            </Switch>
        </div>
    </Router>);

export default router