import React from 'react';

import { Image, View } from 'react-native';

import tw from '../../tailwind';

import Screen from './Screen';
// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');
const logoBigIcon = require('../assets/logo_big.png');

function AuthScreen({ children, isLoading }) {
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
          <View style={tw`fixed inset-x-0 top-0 z-50`}>
            <View style={tw`h-1 bg-blue-500 w-9/12 animation-progress`} />
          </View>
        )}
        {children}
      </View>
    </Screen>
  );
}

AuthScreen.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.any.isRequired,
};

AuthScreen.defaultProps = {
  isLoading: false,
};
export default AuthScreen;
