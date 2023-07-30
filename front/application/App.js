import { StatusBar } from 'expo-status-bar';
import {Provider, connect, useDispatch} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'

import EntryNavigation from './src/navigation/EntryNavigation'
import MessageToast from './src/message/MessageToast'
import './i18n';
import {store, persistor} from './redux/store'

import { NavigationContainer } from '@react-navigation/native';



export default function App() {
  return (
    <Provider store={store}>
    <StatusBar />
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <EntryNavigation />
        </NavigationContainer>
      </PersistGate>
      <MessageToast />
    </Provider>
  );
}


