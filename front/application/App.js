import React from 'react';
//            https://youknow.app/api/sessions/oauth/github?code=05acb1065f4c22e46fe0&state=_TCJImjQ2EqqevZb9yPOJg

import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { useTranslation } from 'react-i18next';
import { NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { Text } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import EntryNavigation from './src/navigation/EntryNavigation';
import MessageToast from './src/message/MessageToast';
import './i18n';
import { store, persistor } from './src/redux/store';

const prefix = Linking.createURL('/');

export default function App() {
  const { t, i18n } = useTranslation();

  Linking.addEventListener('url', ({ url }) => {
    console.log(`link to url + ${url}`);
  });

  const linking = {
    prefixes: [Linking.createURL('/'), 'https://youknow.app'],
    config: {
      screens: {
        AuthNavigation: {
          screens: {
            OAuthScreen: {
              path: '/api/sessions/oauth/:oauthType',
            },
            ResetPasswordScreen: {
              path: 'resetpassword/:verifyHash',
            },
            VerifyScreen: {
              path: 'verifyemail/:verifyHash',
            },
          },
        },
        NotFound: '*',
      },
    },
  };

  const Navigator = createStackNavigator();

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
