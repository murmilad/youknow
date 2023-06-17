import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { applyMiddleware } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { reducer } from './reducers/reducer';
import {injectStoreToServer} from "./actions/server";


import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

import './i18n';

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
    reducer ,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});
    
sagaMiddleware.run(rootSaga)

    
    
injectStoreToServer(store)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
, document.getElementById('root'));