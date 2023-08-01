import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import Constants from 'expo-constants';
import tw from '../../tailwind'

import Screen from './Screen';

function AuthScreen({ children, is_loading }) {
  return (
    <Screen >
      <View>
        <Image
          source={require("../assets/logo_big.png")}
        />
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

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1
  },
  view: {
    flex: 1
  }
})

export default AuthScreen;
