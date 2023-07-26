import React, { useState, useLayoutEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { View, TextInput, Pressable, Text } from 'react-native'

import { useTranslation } from 'react-i18next'
import * as Yup from 'yup';

import FormTextInput from '../components/form/widgets/input/FormTextInput';
import FormButton from '../components/form/widgets/FormButton';

const validationSchema = Yup.object().shape({
    server: Yup.string().required().server().label(t('field.server')),
    port: Yup.number().required().label(t('field.port'))
})
const { t, i18n } = useTranslation();

function SettingsScreen(props) {
    const dispatch = useDispatch();


    return (
        <Screen >
            <ApplicationForm
                initialValues={{ server: "https://youknow.app", port: "443" }}
                onSubmit={(values) => console.log(values)}
                validationSchema={validationSchema}
            >
                <FormTextInput name="server" header={t('field.server')}/>
                <FormTextInput name="port" header={t('field.port')}/>
                <FormButton  header={t('action.connect')} />

            </ApplicationForm>
        </Screen>
    )
}

function mapStateToProps(state, props) {
    return ({
        config: state.config
    })
}


export default connect(
    mapStateToProps
)(SettingsScreen)
