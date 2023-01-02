import React from 'react';
import { Provider } from 'react-redux';
import store from "./store/rootReducer";
import router from "./routes/router";

function App() {
    return (
        <Provider store={store}>
            {router}
        </Provider>
    )

}

export default App;
