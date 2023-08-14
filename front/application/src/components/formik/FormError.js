import React from 'react';

import { Text } from 'react-native';

import tw from '../../../tailwind';
// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function FormError({ error, visible }) {
  if (!visible || !error) return null;

  return <Text style={tw`ml-7 mr-5 mt-1 mb-2 text-sm text-red-600 font-medium`}>{error}</Text>;
}

FormError.propTypes = {
  error: PropTypes.string,
  visible: PropTypes.bool,
};
FormError.defaultProps = {
  error: undefined,
  visible: undefined,
};

export default FormError;
