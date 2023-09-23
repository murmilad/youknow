import React from 'react';

import { Text } from 'react-native';
import tw from '../../../tailwind';
// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function AbstractText({ style, children }) {
  return <Text style={[tw`text-gray-500`, style]}>{children}</Text>;
}

AbstractText.propTypes = {
  children: PropTypes.any.isRequired,
  style: PropTypes.object,
};
AbstractText.defaultProps = {
  style: undefined,
};
export default AbstractText;
