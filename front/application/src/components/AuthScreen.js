import React from 'react';

import { Image, View, Animated } from 'react-native';

import tw from '../../tailwind';

import Screen from './Screen';
// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');
const logoBigIcon = require('../assets/logo_big.png');

function AuthScreen({ children, isLoading }) {
  const ball = new Animated.Value(0);
  const xVal = ball.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 250],
  });

  const animStyle = {
    transform: [
      {
        translateX: xVal,
      },
    ],
  };
  Animated.timing(ball, {
    toValue: 1,
    duration: 1000,
    useNativeDriver: true,
  }).start();

  return (
    <Screen>
      <View style={tw`mt-3 h-15 w-full`}>
        <Image
          style={{ resizeMode: 'contain', flex: 1, width: undefined, height: undefined }}
          source={logoBigIcon}
        />
      </View>
      <View>
        {isLoading && (
          <View style={tw`inset-x-0 top-0 z-50`}>
            <Animated.View style={[tw`h-1 bg-blue-500 w-9/12`, animStyle]} />
          </View>
        )}
        {children}
      </View>
    </Screen>
  );
}

AuthScreen.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.any.isRequired,
};

export default AuthScreen;
