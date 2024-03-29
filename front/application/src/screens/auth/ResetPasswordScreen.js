import React from 'react';

import { connect, useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import AuthScreen from '../../components/AuthScreen';

import FormFieldTextPassword from '../../components/formik/field/FormFieldTextPassword';
import FormFieldSubmitButton from '../../components/formik/field/FormFieldSubmitButton';
import FormBody from '../../components/formik/FormBody';
import * as actions from '../../redux/constants/action';
// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function ResetPasswordScreen({ status, route }) {
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .required()
      .min(8, t('error.password-short'))
      .matches(/[a-zA-Z]/, t('error.password-letters')),
    passwordConfirm: yup
      .string()
      .required()
      .min(8, t('error.password-short'))
      .matches(/[a-zA-Z]/, t('error.password-letters'))
      .oneOf([yup.ref('password')], t('error.password-match')),
  });

  return (
    <AuthScreen isLoading={status.is_loading}>
      <FormBody
        initialValues={{
          password: '',
          empasswordConfirmail: '',
        }}
        onSubmit={(values) => {
          dispatch({
            type: actions.RESET_PASSWORD,
            payload: {
              reset: {
                verifyHash: route.params.verifyHash,
                password: values.password,
                passwordConfirm: values.passwordConfirm,
              },
            },
          });
        }}
        validationSchema={validationSchema}
      >
        <FormFieldTextPassword name="password" header={t('field.password')} />
        <FormFieldTextPassword name="passwordConfirm" header={t('field.retype-password')} />
        <FormFieldSubmitButton header={t('action.reset-password')} />
      </FormBody>
    </AuthScreen>
  );
}

ResetPasswordScreen.propTypes = {
  status: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  status: state.status,
});

export default connect(mapStateToProps)(ResetPasswordScreen);
