import React from 'react';

import { Image, View } from 'react-native';

import tw from '../../tailwind';

import { ReactComponent as LogoBigIcon } from '../assets/logo_big.png';

import Screen from './Screen';
// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function AuthScreen({ children, isLoading }) {
  return (
    <Screen>
      <View style={tw`mt-3 h-15 w-full`}>
        <Image
          style={{ resizeMode: 'contain', flex: 1, width: undefined, height: undefined }}
          source={LogoBigIcon}
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
  isLoading: PropTypes.bool.isRequired,
  children: PropTypes.any.isRequired,
};

export default AuthScreen;
