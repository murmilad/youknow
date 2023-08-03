import React, { useState, useLayoutEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { View, TextInput, Pressable, Text } from 'react-native'

import { useTranslation } from 'react-i18next'
import * as Yup from 'yup';

import FormTextInput from '../components/form/widgets/input/FormTextInput';
import FormSubmitButton from '../components/form/widgets/FormSubmitButton';
import Screen from '../components/Screen';
import tw from '../../tailwind'
import ApplicationForm from '../components/form/ApplicationForm';

import AbstractText from '../components/widgets/AbstractText';

function Settings({user, status}) {
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();

    const validationSchema = Yup.object().shape({
        server: Yup.string().required().label(t('field.server')),
        port: Yup.number().required().label(t('field.port'))
    })
    

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
                <View style={tw`mb-6 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500`}>{user.name}</View>
                <FormTextInput name="server" header={t('field.server')} />
                <FormTextInput name="port" header={t('field.port')} />
                <FormSubmitButton  header={t('action.connect')} />

            </ApplicationForm>
        </Screen>
    )
}

const mapStateToProps = state => ({
    user: state.user,
    status: state.status,
})

export default SettingsScreen = connect(mapStateToProps)(Settings)

