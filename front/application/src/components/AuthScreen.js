import React, { useEffect, useRef } from 'react';

import { Image, View, Animated, Dimensions } from 'react-native';

import tw from '../../tailwind';

import Screen from './Screen';
// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');
const logoBigIcon = require('../assets/logo_big.png');

function AuthScreen({ children, isLoading }) {
  const translation = useRef(new Animated.Value(0)).current;

  const animStyle = {
    transform: [
      {
        translateX: translation,
      },
    ],
    left: -Dimensions.get('window').width,
  };

  const animation = Animated.loop(
    Animated.timing(translation, {
      toValue: Dimensions.get('window').width * 2,
      duration: Dimensions.get('window').width * 3,
      useNativeDriver: true,
    })
  );

  useEffect(() => {
    if (isLoading) {
      translation.setValue(0);
      animation.start();
    } else {
      animation.stop();
      translation.setValue(0);
    }
  }, [animation, isLoading]);

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
