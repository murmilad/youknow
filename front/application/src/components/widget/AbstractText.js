import React from 'react';

import { Text } from 'react-native';
import tw from '../../../tailwind';
// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function AbstractText({ children }) {
  return <Text style={tw`text-gray-500 dark:text-gray-400`}>{children}</Text>;
}

AbstractText.propTypes = {
  children: PropTypes.any.isRequired,
};

export default AbstractText;
