import React, { useState, useLayoutEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { View, TextInput, Pressable, Text } from 'react-native'

import { useTranslation } from 'react-i18next'
import * as Yup from 'yup';

import AuthScreen from '../components/AuthScreen';

import FormFieldText from '../components/formik/field/FormFieldText'
import FormFieldTextPassword from '../components/formik/field/FormFieldTextPassword';
import FormFieldSubmitButton from '../components/formik/field/FormFieldSubmitButton';
import FormBody from '../components/formik/FormBody';

function Settings({status}) {
    const { t, i18n } = useTranslation();

    const validationSchema = Yup.object().shape({
        server: Yup.string().required().label(t('field.server')),
        port: Yup.number().required().label(t('field.port'))
    })

    const dispatch = useDispatch();


    return (
        <AuthScreen >
            <FormBody
                initialValues={{ server: status.server ? status.server : "https://youknow.app", port: status.port ? status.port : "443" }}
                onSubmit={(values) => {
                    dispatch({type: 'CONNECT_AND_SET_PARAMS', payload: {
                        server: values.server,
                        port: values.port
                    }})
                }}
                validationSchema={validationSchema}
            >
                <FormFieldText name="server" header={t('field.server')}/>
                <FormFieldText name="port" header={t('field.port')}/>
                <FormFieldSubmitButton  header={t('action.connect')} />

            </FormBody>
        </AuthScreen>
    )
}

const mapStateToProps = state => ({
    status: state.status,
})

export default SettingsScreen = connect(mapStateToProps)(Settings)

