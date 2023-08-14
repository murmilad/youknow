import React from 'react';

import FormError from './FormError';
// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function FormField({ children, name, errors, touched }) {
  return (
    <>
      {children}
      <FormError error={errors} visible={touched} />
    </>
  );
}
FormField.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  errors: PropTypes.string,
  touched: PropTypes.bool,
};

FormField.defaultProps = {
  errors: null,
  touched: false,
};
export default FormField;
