import React from 'react';

import { TextInput } from 'react-native';
import { useField } from 'formik';
import tw from '../../../../tailwind';
// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function FormWidgetText({ header, secureTextEntry, ...props }) {
  const [field, meta, helpers] = useField(props);

  return (
    <TextInput
      secureTextEntry={secureTextEntry}
      style={
        meta.touched && meta.error
          ? tw`ml-5 mr-5 mt-2 mb-2 bg-red-50 border border-red-500 p-2 text-red-900 placeholder-red-700 text-lg rounded-lg block p-2.5`
          : tw`ml-5 mr-5 mt-2 mb-2 block p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-lg  `
      }
      placeholder={header}
      placeholderTextColor={tw.color('text-gray-300')}
      {...field}
    />
  );
}

FormWidgetText.propTypes = {
  name: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
};
FormWidgetText.defaultProps = {
  secureTextEntry: false,
};
export default FormWidgetText;
