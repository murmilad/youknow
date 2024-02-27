import React, { useEffect, useRef } from 'react';

import { View, Animated, Dimensions } from 'react-native';

import tw from '../../tailwind';

// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function LoadingScreen({ children, isLoading }) {
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
  }, [translation, animation, isLoading]);

  return (
    <View style={tw`w-full`}>
      {isLoading && (
        <View style={tw`inset-x-0 top-0 z-50`}>
          <Animated.View style={[tw`h-1 bg-blue-500 w-9/12`, animStyle]} />
        </View>
      )}
      {children}
    </View>
  );
}

LoadingScreen.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.any.isRequired,
};

LoadingScreen.defaultProps = {
  isLoading: false,
};

export default LoadingScreen;
