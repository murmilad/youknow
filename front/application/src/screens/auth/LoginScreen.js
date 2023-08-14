import React from 'react';

import { connect, useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import AuthScreen from '../../components/AuthScreen';
import GoogleButton from '../../components/widget/GoogleButton';
import GithubButton from '../../components/widget/GithubButton';
import AbstractButton from '../../components/widget/AbstractButton';

import FormFieldText from '../../components/formik/field/FormFieldText';
import FormFieldTextPassword from '../../components/formik/field/FormFieldTextPassword';
import FormFieldSubmitButton from '../../components/formik/field/FormFieldSubmitButton';
import FormBody from '../../components/formik/FormBody';
import * as actions from '../../redux/actions';
// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function LoginScreen({ status, navigation }) {
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();
  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  return (
    <AuthScreen isLoading={status.is_loading}>
      <FormBody
        onSubmit={(values) => {
          dispatch({
            type: actions.LOG_IN,
            payload: { login: values },
          });
        }}
        validationSchema={validationSchema}
      >
        <FormFieldText name="email" header={t('field.email')} />
        <FormFieldTextPassword name="password" header={t('field.password')} />
        <FormFieldSubmitButton header={t('action.login')} />
        <GoogleButton
          handleSubmit={() => {
            dispatch({ type: 'AUTH_GOOGLE' });
          }}
        />
        <GithubButton
          handleSubmit={() => {
            dispatch({ type: 'AUTH_GITHUB' });
          }}
        />
        <AbstractButton onPress={() => navigation.navigate('SignUpScreen')} />
      </FormBody>
    </AuthScreen>
  );
}

LoginScreen.propTypes = {
  status: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  status: state.status,
});

export default connect(mapStateToProps)(LoginScreen);
