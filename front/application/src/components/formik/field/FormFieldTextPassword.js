import React, { ReactPropTypes } from 'react';
import FormFieldText from './FormFieldText';

function FormFieldTextPassword({ name, header }) {
  return <FormFieldText name={name} header={header} secureTextEntry />;
}

FormFieldTextPassword.propTypes = {
  name: ReactPropTypes.string.isRequired,
  header: ReactPropTypes.string.isRequired,
};

export default FormFieldTextPassword;
