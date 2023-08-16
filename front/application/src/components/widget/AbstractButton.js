import React from 'react';

import { Text, Pressable } from 'react-native';
import tw from '../../../tailwind';
// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function AbstractButton({ children, header, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [
        tw`ml-5 mr-5 mt-2 mb-2 border border-blue-600 rounded-lg justify-center items-center w-auto px-5 py-2.5`,
        pressed ? tw`bg-blue-600` : null,
      ]}
      onPress={onPress}
    >
      {({ pressed }) => (
        <>
          {header && (
            <Text
              style={[
                tw`text-blue-600 text-lg font-medium text-center`,
                pressed ? tw`text-white text-lg font-medium text-center` : null,
              ]}
            >
              {header}
            </Text>
          )}
          {children}
        </>
      )}
    </Pressable>
  );
}

AbstractButton.propTypes = {
  header: PropTypes.string,
  children: PropTypes.any,
  onPress: PropTypes.func.isRequired,
};

AbstractButton.defaultProps = {
  header: undefined,
  children: undefined,
};

export default AbstractButton;
