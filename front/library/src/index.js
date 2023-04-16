import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from './reducers/reducer';
import "bootstrap/dist/css/bootstrap.min.css"
import {injectStoreToServer} from "./actions/server";


import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducer,
  
      applyMiddleware(sagaMiddleware)
    );
    
sagaMiddleware.run(rootSaga)

    
    
injectStoreToServer(store)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);