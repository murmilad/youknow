import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { useTranslation } from 'react-i18next';
import { NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { Text } from 'react-native';

import EntryNavigation from './src/navigation/EntryNavigation';
import MessageToast from './src/message/MessageToast';
import './i18n';
import { store, persistor } from './src/redux/store';

const prefix = Linking.createURL('/');

export default function App() {
  const { t, i18n } = useTranslation();
  const linking = {
    prefixes: [Linking.createURL('/'), 'https://youknow.app'],
    config: {
      screens: {
        ResetPasswordScreen: {
          path: 'resetpassword/:verifyHash',
        },
        VerifyScreen: {
          path: 'verifyemail/:verifyHash',
        },
      },
    },
  };

  return (
    <Provider store={store}>
      <StatusBar />
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer linking={linking} fallback={<Text>{t('message.loading')}</Text>}>
          <EntryNavigation />
        </NavigationContainer>
      </PersistGate>
      <MessageToast />
    </Provider>
  );
}
