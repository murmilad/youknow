import React from 'react';

import { connect, useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import AuthScreen from '../../components/AuthScreen';

import FormFieldTextPassword from '../../components/formik/field/FormFieldTextPassword';
import FormFieldSubmitButton from '../../components/formik/field/FormFieldSubmitButton';
import FormBody from '../../components/formik/FormBody';
import * as actions from '../../redux/actions';
// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function ResetPasswordScreen({ status, navigation }) {
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
      .test(
        'passwords-match',
        t('error.password-match'),
        // eslint-disable-next-line react/no-this-in-sfc
        (value) => this.parent.resetPassword === value
      ),
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
                verifyHash: navigation.getParam('verifyHash'),
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
};

const mapStateToProps = (state) => ({
  status: state.status,
});

export default connect(mapStateToProps)(ResetPasswordScreen);
