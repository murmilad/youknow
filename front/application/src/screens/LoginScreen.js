import React, { useState, useLayoutEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { View, TextInput, Pressable, Text } from 'react-native'

import { useTranslation } from 'react-i18next'
import * as yup from 'yup';

import FormTextInput from '../components/form/widgets/input/FormTextInput';
import FormSubmitButton from '../components/form/widgets/FormSubmitButton';
import AuthScreen from '../components/AuthScreen';
import GoogleButton from '../components/widgets/GoogleButton';
import GithubButton from '../components/widgets/GithubButton';
import FormTextInputPassword from '../components/form/widgets/input/FormTextInputPassword';
import AbstractButton from '../components/widgets/AbstractButton';

const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
})
const { t, i18n } = useTranslation();

function Login({ navigation }) {
    const dispatch = useDispatch();


    return (
        <AuthScreen >
            <ApplicationForm
                onSubmit={(values) => {
                    dispatch({
                        type: 'LOG_IN', payload: {login: values}
                    })
                }}
                validationSchema={validationSchema}
            >
                <FormTextInput name="email" header={t('field.login-email')} />
                <FormTextInputPassword name="password" header={t('field.login-password')} />
                <FormSubmitButton header={t('action.login')} />
                <GoogleButton handleSubmit={()=>{
                    dispatch({type: 'AUTH_GOOGLE'})
                }} />
                <GithubButton handleSubmit={()=>{
                    dispatch({type: 'AUTH_GITHUB'})
                }} />
                <AbstractButton onPress={() =>
                    navigation.navigate('SignUpScreen') 
                }/>
            </ApplicationForm>
        </AuthScreen>
    )
}

const mapStateToProps = state => ({
    status: state.status,
})

export default LoginScreen = connect(mapStateToProps)(Login)

