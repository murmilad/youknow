import React from 'react';

import FormField from '../FormField';
import FormWidgetText from '../widget/FormWidgetText';
// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function FormFieldText({ name, header, secureTextEntry }) {
  return (
    <FormField name={name}>
      <FormWidgetText header={header} secureTextEntry={secureTextEntry} />
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
