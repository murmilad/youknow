import React from 'react';
import { View } from 'react-native';
import { Formik } from 'formik';
// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function FormBody({ children, initialValues, onSubmit, validationSchema }) {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      <View>{children}</View>
    </Formik>
  );
}

FormBody.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  validationSchema: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
};

export default FormBody;
