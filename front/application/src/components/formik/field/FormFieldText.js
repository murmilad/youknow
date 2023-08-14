import React from 'react';
import { useFormikContext } from 'formik';
import { TextInput } from 'react-native';

import tw from '../../../../tailwind';

import FormField from '../FormField';
// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function FormFieldText({ name, header, secureTextEntry }) {
  const { values, setFieldTouched, handleChange, errors, touched } = useFormikContext();

  return (
    <FormField name={name} errors={errors[name]} touched={touched[name]}>
      <TextInput
        name={name}
        secureTextEntry={secureTextEntry}
        style={
          touched[name] && errors[name]
            ? tw`ml-5 mr-5 mt-2 mb-2 bg-red-50 border border-red-500 p-2 text-red-900 text-lg rounded-lg p-2.5`
            : tw`ml-5 mr-5 mt-2 mb-2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-lg  `
        }
        placeholder={header}
        placeholderTextColor={tw.color('text-gray-300')}
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        value={values[name]}
      />
    </FormField>
  );
}

FormFieldText.propTypes = {
  name: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
};
FormFieldText.defaultProps = {
  secureTextEntry: false,
};

export default FormFieldText;
