import React, { ReactPropTypes } from 'react';
import { useFormikContext } from 'formik';

import AbstractButton from '../../widget/AbstractButton';

// eslint-disable-next-line react/display-name
function FormFieldSubmitButton({ header }) {
  const { handleSubmit } = useFormikContext();
  return <AbstractButton onPress={handleSubmit} header={header} />;
}

FormFieldSubmitButton.propTypes = {
  header: ReactPropTypes.string.isRequired,
};

export default FormFieldSubmitButton;
