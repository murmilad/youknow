import React, { ReactPropTypes } from 'react';
import { Formik } from 'formik';

function FormBody({ initialValues, onSubmit, validationSchema, children }) {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {children}
    </Formik>
  );
}

FormBody.propTypes = {
  initialValues: ReactPropTypes.object,
  onSubmit: ReactPropTypes.func.isRequired,
  validationSchema: ReactPropTypes.object.isRequired,
  children: ReactPropTypes.object.isRequired,
};
FormBody.defaultProps = {
  initialValues: undefined,
};

export default FormBody;
