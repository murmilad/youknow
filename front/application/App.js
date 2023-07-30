import { StatusBar } from 'expo-status-bar';
import {Provider, connect, useDispatch} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'

import EntryNavigation from './src/navigation/EntryNavigation'
import MessageToast from './src/message/MessageToast'
import './i18n';
import {store, persistor} from './redux/store'

import { NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';

const prefix = Linking.createURL('/');


export default function App() {
  const linking = {
    prefixes: [prefix],
  };

  return (
    <Provider store={store}>
    <StatusBar />
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer linking={linking}>
          <EntryNavigation />
        </NavigationContainer>
      </PersistGate>
      <MessageToast />
    </Provider>
  );
}


