import React from 'react';

import { connect, useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import * as yup from 'yup';

import tw from '../../../tailwind';
import AuthScreen from '../../components/AuthScreen';
import GoogleButton from '../../components/widget/GoogleButton';
import GithubButton from '../../components/widget/GithubButton';
import AbstractButton from '../../components/widget/AbstractButton';

import FormFieldText from '../../components/formik/field/FormFieldText';
import FormFieldTextPassword from '../../components/formik/field/FormFieldTextPassword';
import FormFieldSubmitButton from '../../components/formik/field/FormFieldSubmitButton';
import FormBody from '../../components/formik/FormBody';
import * as actions from '../../redux/constants/action';
// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function LoginScreen({ status, user, navigation }) {
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();
  const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  return (
    <AuthScreen isLoading={status.is_loading}>
      <FormBody
        initialValues={{
          email: '',
          password: '',
        }}
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
        {user.may_forget && (
          <AbstractButton
            header={t('action.reset-password')}
            onPress={() => navigation.navigate('ForgotPasswordScreen')}
          />
        )}
        <FormFieldSubmitButton header={t('action.login')} />
        <AbstractButton
          header={t('action.sign-up')}
          onPress={() => navigation.navigate('SignUpScreen')}
        />
        <View style={tw`flex-row mx-5 mr-10 w-auto`}>
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
        </View>
      </FormBody>
    </AuthScreen>
  );
}

LoginScreen.propTypes = {
  status: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  status: state.status,
  user: state.user,
});

export default connect(mapStateToProps)(LoginScreen);
