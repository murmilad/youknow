import React from 'react';

import { Field } from 'formik';
import FormError from './FormError';
// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function FormField({ name, children }) {
  return (
    <Field name={name}>
      {({ field, meta }) => (
        <>
          {children}
          <FormError error={meta.error} visible={meta.touched} />
        </>
      )}
    </Field>
  );
}
FormField.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
};

export default FormField;
