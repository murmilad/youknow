import React, { ReactPropTypes } from 'react';
import { Text } from 'react-native';
import tw from '../../../tailwind';

function AbstractText({ children }) {
  return <Text style={tw`text-gray-500 dark:text-gray-400`}>{children}</Text>;
}

AbstractText.propTypes = {
  children: ReactPropTypes.object.isRequired,
};

export default AbstractText;
