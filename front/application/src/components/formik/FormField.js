import React, { ReactPropTypes } from 'react';

import { Field } from 'formik';
import FormError from './FormError';

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
  name: ReactPropTypes.string.isRequired,
  children: ReactPropTypes.object.isRequired,
};

export default FormField;
