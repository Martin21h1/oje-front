import React from 'react';
import { Provider } from 'react-redux';
import store from "./store/rootReducer";
import MainRouter from "./routes/router";

function App() {
    return (
        <Provider store={store}>
            <MainRouter/>
        </Provider>
    )

}

export default App;
