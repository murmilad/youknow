import { configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';
import createSagaMiddleware from 'redux-saga'

import reducer from './reducer'
import rootSaga from './saga'


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: []
  }
  
const persistedReducer  = persistReducer(persistConfig, reducer)

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga)

export const persistor = persistStore(store)