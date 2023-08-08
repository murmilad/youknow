import React from 'react';

import FormFieldText from './FormFieldText';
// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function FormFieldTextPassword({ name, header }) {
  return <FormFieldText name={name} header={header} secureTextEntry />;
}

FormFieldTextPassword.propTypes = {
  name: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
};

export default FormFieldTextPassword;
