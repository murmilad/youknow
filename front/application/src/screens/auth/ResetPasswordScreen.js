import React, { useState, useLayoutEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { View, TextInput, Pressable, Text } from 'react-native'

import { useTranslation } from 'react-i18next'
import * as yup from 'yup';

import FormTextInput from '../../components/form/widgets/input/FormTextInput';
import FormSubmitButton from '../../components/form/widgets/FormSubmitButton';
import AuthScreen from '../../components/AuthScreen';
import FormTextInputPassword from '../../components/form/widgets/input/FormTextInputPassword';
import AbstractButton from '../../components/widgets/AbstractButton';

const { t, i18n } = useTranslation();

const validationSchema = yup.object().shape({
    password: yup.string().required().min(8, t('error.password-short'))
        .matches(/[a-zA-Z]/, t('error.password-letters')),
    passwordConfirm: yup.string().required().min(8, t('error.password-short'))
        .matches(/[a-zA-Z]/, t('error.password-letters')).test(
            'passwords-match',
            t('error.password-match'),
            function (value) { return this.parent.resetPassword === value }
        )
})

function ResetPassword({ navigation }) {
    const dispatch = useDispatch();


    return (
        <AuthScreen >
            <ApplicationForm
                onSubmit={(values) => {
                    dispatch({
                        type: 'RESET_PASSWORD', payload: { reset: values }
                    })
                }}
                validationSchema={validationSchema}
            >
                <FormTextInputPassword name="password" header={t('field.password')} />
                <FormTextInputPassword name="passwordConfirm" header={t('field.retype-password')} />
                <FormSubmitButton header={t('action.reset-password')} />
            </ApplicationForm>
        </AuthScreen>
    )
}

const mapStateToProps = state => ({
    status: state.status,
})

export default ResetPasswordScreen = connect(mapStateToProps)(ResetPassword)

