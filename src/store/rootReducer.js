import {applyMiddleware, createStore, combineReducers, compose} from "redux";
import thunk from "redux-thunk";

import usersReducer from './users/reducer';
import songsReducer from './songs/reducer';
import wordsReducer from './words/reducer';
import artistsReducer from './artists/reducer';
import errorsReducer from "./errors/reducer";
import authReducer from "./auth/reducer";

const middleware = compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
);

const rootReducer = combineReducers({
    usersState: usersReducer,
    songsState: songsReducer,
    wordsState: wordsReducer,
    artistsState: artistsReducer,
    errorsState: errorsReducer,
    authState: authReducer,
});

const store = createStore(rootReducer, middleware);

export default store;
