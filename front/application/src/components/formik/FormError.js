import React, { ReactPropTypes } from 'react';
import { Text } from 'react-native';

import tw from '../../../tailwind';

function FormError({ error, visible }) {
  if (!visible || !error) return null;

  return <Text style={tw`mt-2 text-sm text-red-600 dark:text-red-500 font-medium`}>{error}</Text>;
}

FormError.propTypes = {
  error: ReactPropTypes.string,
  visible: ReactPropTypes.bool,
};
FormError.defaultProps = {
  error: undefined,
  visible: undefined,
};

export default FormError;
