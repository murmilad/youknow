import React, { useState, useLayoutEffect } from 'react'
import { connect, useDispatch } from 'react-redux'

import { useTranslation } from 'react-i18next'
import * as yup from 'yup';

import AuthScreen from '../../components/AuthScreen';
import FormFieldText from '../../components/formik/field/FormFieldText'
import FormFieldSubmitButton from '../../components/formik/field/FormFieldSubmitButton';
import FormBody from '../../components/formik/FormBody';

function ForgotPassword({ status, navigation }) {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const validationSchema = yup.object().shape({
        email: yup.string().email().required(),
    })
    
    

    return (
        <AuthScreen >
            <FormBody
                onSubmit={(values) => {
                    dispatch({
                        type: 'FORGOT_PASSWORD', payload: {login: values}
                    })
                }}
                validationSchema={validationSchema}
            >
                <FormFieldText name="email" header={t('field.email')} />
                <FormFieldSubmitButton header={t('action.retrieve-password')} />
            </FormBody>
        </AuthScreen>
    )
}

const mapStateToProps = state => ({
    status: state.status,
})

export default ForgotPasswordScreen = connect(mapStateToProps)(ForgotPassword)

