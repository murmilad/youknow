import React from 'react';

import { useFormikContext } from 'formik';

import AbstractButton from '../../widget/AbstractButton';
// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

// eslint-disable-next-line react/display-name
function FormFieldSubmitButton({ header }) {
  const { handleSubmit } = useFormikContext();
  return <AbstractButton onPress={handleSubmit} header={header} />;
}

FormFieldSubmitButton.propTypes = {
  header: PropTypes.string.isRequired,
};

export default FormFieldSubmitButton;
