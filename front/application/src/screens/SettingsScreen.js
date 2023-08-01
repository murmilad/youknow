import React, { useState, useLayoutEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { View, TextInput, Pressable, Text } from 'react-native'

import { useTranslation } from 'react-i18next'
import * as Yup from 'yup';

import FormTextInput from '../components/form/widgets/input/FormTextInput';
import FormSubmitButton from '../components/form/widgets/FormSubmitButton';
import Screen from '../components/Screen';
const { t, i18n } = useTranslation();

const validationSchema = Yup.object().shape({
    server: Yup.string().required().label(t('field.server')),
    port: Yup.number().required().label(t('field.port'))
})

function Settings({status}) {
    const dispatch = useDispatch();


    return (
        <Screen >
            <ApplicationForm
                initialValues={{ server: status.server ? status.server : "https://youknow.app", port: status.port ? status.port : "443" }}
                onSubmit={(values) => {
                    dispatch({type: 'CONNECT_AND_SET_PARAMS', payload: {
                        server: values.server,
                        port: values.port
                    }})
                }}
                validationSchema={validationSchema}
            >
                <FormTextInput name="server" header={t('field.server')}/>
                <FormTextInput name="port" header={t('field.port')}/>
                <FormSubmitButton  header={t('action.connect')} />

            </ApplicationForm>
        </Screen>
    )
}

const mapStateToProps = state => ({
    status: state.status,
})

export default SettingsScreen = connect(mapStateToProps)(Settings)

