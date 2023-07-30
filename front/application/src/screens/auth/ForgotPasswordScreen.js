import React, { useState, useLayoutEffect } from 'react'
import { connect, useDispatch } from 'react-redux'

import { useTranslation } from 'react-i18next'
import * as yup from 'yup';

import FormTextInput from '../../components/form/widgets/input/FormTextInput';
import FormSubmitButton from '../../components/form/widgets/FormSubmitButton';
import AuthScreen from '../../components/AuthScreen';

const { t, i18n } = useTranslation();
const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
})

function ForgotPassword({ status, navigation }) {
    const dispatch = useDispatch();


    return (
        <AuthScreen >
            <ApplicationForm
                onSubmit={(values) => {
                    dispatch({
                        type: 'FORGOT_PASSWORD', payload: {login: values}
                    })
                }}
                validationSchema={validationSchema}
            >
                <FormTextInput name="email" header={t('field.email')} />
                <FormSubmitButton header={t('action.retrieve-password')} />
            </ApplicationForm>
        </AuthScreen>
    )
}

const mapStateToProps = state => ({
    status: state.status,
})

export default ForgotPasswordScreen = connect(mapStateToProps)(ForgotPassword)

