import React from 'react';
import { View } from 'react-native';

import tw from '../../../tailwind';
import AbstractText from './AbstractText';
// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function FormText({ style, children }) {
  return (
    <View
      style={[
        tw`ml-5 mr-5 mt-2 mb-2 bg-gray-100 border border-gray-300 text-gray-900 rounded-lg block p-2 `,
        style,
      ]}
    >
      <AbstractText style={tw`text-center text-lg`}>{children}</AbstractText>
    </View>
  );
}

FormText.propTypes = {
  children: PropTypes.any.isRequired,
  style: PropTypes.object,
};
FormText.defaultProps = {
  style: undefined,
};
export default FormText;
