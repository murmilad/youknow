import React from 'react';
import { Pressable } from 'react-native';
// eslint-disable-next-line import/no-named-default
import { default as GoogleIcon } from '../../assets/google.svg';
import tw from '../../../tailwind';
// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function GoogleButton({ handleSubmit }) {
  return (
    <Pressable
      style={({ pressed }) => [
        tw`ml-0 mr-2.5 mt-2 mb-2 border-2 border-blue-600 rounded-lg justify-center items-center w-1/2 px-5 py-3`,
        pressed ? tw`bg-blue-600` : null,
      ]}
      onPress={handleSubmit}
    >
      {({ pressed }) => (
        <GoogleIcon
          width={20}
          height={20}
          style={[tw`text-blue-600`, pressed ? tw`text-white` : null]}
        />
      )}
    </Pressable>
  );
}

GoogleButton.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default GoogleButton;
