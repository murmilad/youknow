import React, { useState, useLayoutEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { View, TextInput, Pressable, Text } from 'react-native'

import { useTranslation } from 'react-i18next'
import * as Yup from 'yup';

import FormTextInput from '../components/form/widgets/input/FormTextInput';
import FormButton from '../components/form/widgets/FormButton';
import AuthScreen from '../components/AuthScreen';
import GoogleButton from '../components/button/GoogleButton';
import GithubButton from '../components/button/GithubButton';

const validationSchema = Yup.object().shape({
    server: Yup.string().required().server().label(t('field.server')),
    port: Yup.number().required().label(t('field.port'))
})
const { t, i18n } = useTranslation();

function Settings(props) {
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
                <FormTextInput name="password" header={t('field.login-password')} />
                <FormButton header={t('action.login')} />
                <GoogleButton handleSubmit={()=>{
                    dispatch({type: 'AUTH_GOOGLE'})
                }} />
                <GithubButton handleSubmit={()=>{
                    dispatch({type: 'AUTH_GITHUB'})
                }} />
            </ApplicationForm>
        </AuthScreen>
    )
}

const mapStateToProps = state => ({
    status: state.status,
})

export default SettingsScreen = connect(mapStateToProps)(Settings)

