import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import ThemeContextProvider from './_context/themeContext';
import AuthContextProvider from './_context/authContext.js';
// import Reducer from './_reducers';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import promiseMiddleware from 'redux-promise';
// import ReduxThunk from 'redux-thunk';
// import {persistStore ,persistReducer } from "redux-persist";
// import localStorage from 'redux-persist/lib/storage';
// import { PersistGate } from 'redux-persist/integration/react';

// const persistConfig = {
//     key: 'root',
//     storage: localStorage,
//     // whitelist: ['auth']
// };
// const persistedReducer = persistReducer(persistConfig, Reducer);
// const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, 
//     ReduxThunk)(createStore);

// const store = createStoreWithMiddleware(
//     persistedReducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ &&
//     window.__REDUX_DEVTOOLS_EXTENSION__()
// );

ReactDOM.render(
    // <Provider store={store}>
    //      <PersistGate loading={null} persistor={persistStore(store)}>
    <BrowserRouter>
        <ThemeContextProvider>
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </ThemeContextProvider>
    </BrowserRouter>
    //     </PersistGate>
    // </Provider>
    , document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();