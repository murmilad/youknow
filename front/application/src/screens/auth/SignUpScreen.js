import React, { useState, useLayoutEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { View, TextInput, Pressable, Text } from 'react-native'

import { useTranslation } from 'react-i18next'
import * as yup from 'yup';

import FormTextInput from '../../components/form/widgets/input/FormTextInput';
import FormSubmitButton from '../../components/form/widgets/FormSubmitButton';
import AuthScreen from '../../components/AuthScreen';
import FormTextInputPassword from '../../components/form/widgets/input/FormTextInputPassword';

const { t, i18n } = useTranslation();

const validationSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(8, t('error.password-short'))
    .matches(/[a-zA-Z]/, t('error.password-letters')),
    passwordConfirm: yup.string().required().min(8, t('error.password-short'))
    .matches(/[a-zA-Z]/, t('error.password-letters')).test(
      'passwords-match', 
      t('error.password-match'), 
      function (value) { return this.parent.password === value}
    )
  })


function SignUp({status}) {
    const dispatch = useDispatch();


    return (
        <AuthScreen >
            <ApplicationForm
                onSubmit={(values) => {
                    dispatch({type: 'SIGN_UP', payload: {signup: values}})
                }}
                validationSchema={validationSchema}
            >
                <FormTextInput name="name" header={t('field.name')} />
                <FormTextInput name="email" header={t('field.email')} />
                <FormTextInputPassword name="password" header={t('field.password')} />
                <FormTextInputPassword name="passwordConfirm" header={t('field.retype-password')} />
                <FormSubmitButton header={t('action.sign-up')} />
            </ApplicationForm>
        </AuthScreen>
    )
}

const mapStateToProps = state => ({
    status: state.status,
})

export default SignUpScreen = connect(mapStateToProps)(SignUp)

