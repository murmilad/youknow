import React, { useState, useLayoutEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { View, TextInput, Pressable, Text } from 'react-native'

import { useTranslation } from 'react-i18next'
import * as yup from 'yup';

import AuthScreen from '../../components/AuthScreen';

import FormFieldTextPassword from '../../components/formik/field/FormFieldTextPassword';
import FormFieldSubmitButton from '../../components/formik/field/FormFieldSubmitButton';
import FormBody from '../../components/formik/FormBody';

function ResetPassword({ status, navigation }) {
    const dispatch = useDispatch();

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
    
    
    return (
        <AuthScreen >
            <FormBody
                onSubmit={(values) => {
                    dispatch({
                        type: 'RESET_PASSWORD', payload: { reset: {
                            verifyHash: navigation.getParam("verifyHash"),
                            password: values.password,
                            passwordConfirm: values.passwordConfirm
                        }
                     }
                    })
                }}
                validationSchema={validationSchema}
            >
                <FormFieldTextPassword name="password" header={t('field.password')} />
                <FormFieldTextPassword name="passwordConfirm" header={t('field.retype-password')} />
                <FormFieldSubmitButton header={t('action.reset-password')} />
            </FormBody>
        </AuthScreen>
    )
}

const mapStateToProps = state => ({
    status: state.status,
})

export default ResetPasswordScreen = connect(mapStateToProps)(ResetPassword)

