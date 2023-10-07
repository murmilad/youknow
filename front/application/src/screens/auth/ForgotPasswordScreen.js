import React from 'react';

import { connect, useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import AuthScreen from '../../components/AuthScreen';
import FormFieldText from '../../components/formik/field/FormFieldText';
import FormFieldSubmitButton from '../../components/formik/field/FormFieldSubmitButton';
import FormBody from '../../components/formik/FormBody';
import * as actions from '../../redux/constants/action';
// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function ForgotPasswordScreen({ status, navigation }) {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
  });

  return (
    <AuthScreen isLoading={status.is_loading}>
      <FormBody
        initialValues={{
          email: '',
        }}
        onSubmit={(values) => {
          dispatch({
            type: actions.FORGOT_PASSWORD,
            payload: { forgot: values },
          });
        }}
        validationSchema={validationSchema}
      >
        <FormFieldText name="email" header={t('field.email')} />
        <FormFieldSubmitButton header={t('action.retrieve-password')} />
      </FormBody>
    </AuthScreen>
  );
}

ForgotPasswordScreen.propTypes = {
  status: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  status: state.status,
});

export default connect(mapStateToProps)(ForgotPasswordScreen);
