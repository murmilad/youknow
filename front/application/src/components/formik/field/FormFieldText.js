import React, { ReactPropTypes } from 'react';

import FormField from '../FormField';
import FormWidgetText from '../widget/FormWidgetText';

function FormFieldText({ name, header, secureTextEntry }) {
  return (
    <FormField name={name}>
      <FormWidgetText header={header} secureTextEntry={secureTextEntry} />
    </FormField>
  );
}

FormFieldText.propTypes = {
  name: ReactPropTypes.string.isRequired,
  header: ReactPropTypes.string.isRequired,
  secureTextEntry: ReactPropTypes.bool,
};
FormFieldText.defaultProps = {
  secureTextEntry: false,
};

export default FormFieldText;
