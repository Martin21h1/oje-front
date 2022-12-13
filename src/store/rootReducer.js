import {applyMiddleware, createStore, combineReducers, compose} from "redux";
import thunk from "redux-thunk";
import usersReducer from './users/reducer'
import songsReducer from './songs/reducer'
import wordsReducer from './words/reducer'
import artistsReducer from "./artists/reducer";

const middleware = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
);

const rootReducer = combineReducers({
    usersState: usersReducer,
    songsState: songsReducer,
    wordsState: wordsReducer,
    artistsState: artistsReducer,
});

const store = createStore(rootReducer, middleware);

export default store;
