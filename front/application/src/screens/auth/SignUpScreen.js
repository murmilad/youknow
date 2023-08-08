import React, { ReactPropTypes } from 'react';
import { connect, useDispatch } from 'react-redux';

import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

import AuthScreen from '../../components/AuthScreen';

import FormFieldText from '../../components/formik/field/FormFieldText';
import FormFieldTextPassword from '../../components/formik/field/FormFieldTextPassword';
import FormFieldSubmitButton from '../../components/formik/field/FormFieldSubmitButton';
import FormBody from '../../components/formik/FormBody';
import * as actions from '../../redux/actions';

function SignUpScreen({ status }) {
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  const validationSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
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
        (value) => this.parent.password === value
      ),
  });

  return (
    <AuthScreen>
      <FormBody
        onSubmit={(values) => {
          dispatch({ type: actions.SIGN_UP, payload: { signup: values } });
        }}
        validationSchema={validationSchema}
      >
        <FormFieldText name="name" header={t('field.name')} />
        <FormFieldText name="email" header={t('field.email')} />
        <FormFieldTextPassword name="password" header={t('field.password')} />
        <FormFieldTextPassword name="passwordConfirm" header={t('field.retype-password')} />
        <FormFieldSubmitButton header={t('action.sign-up')} />
      </FormBody>
    </AuthScreen>
  );
}

SignUpScreen.propTypes = {
  status: ReactPropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  status: state.status,
});

export default connect(mapStateToProps)(SignUpScreen);
