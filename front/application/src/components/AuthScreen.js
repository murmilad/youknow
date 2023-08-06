import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import Constants from 'expo-constants';
import tw from '../../tailwind'

import Screen from './Screen';

function AuthScreen({ children, is_loading }) {
  return (
    <Screen >
      <View style={tw`mt-3 h-15 w-full`}>
        <Image style={{ resizeMode: 'contain', flex: 1, width: undefined, height: undefined }}
          source={require("../assets/logo_big.png")}
        />
      </View>
      <View>
        {is_loading &&
          <View style={tw`fixed inset-x-0 top-0 z-50`}>
            <View style={tw`h-1 bg-blue-500 w-9/12 animation-progress`}></View>
          </View>
        }
        {children}
      </View>
    </Screen >
  );
}

export default AuthScreen;
