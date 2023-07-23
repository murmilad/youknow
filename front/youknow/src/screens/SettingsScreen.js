import React, { useState, useLayoutEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { View, TextInput, Pressable, Text } from 'react-native'
import { checkConnection, SAVE_CONFIG } from '../redux/actions'

import { useTranslation } from 'react-i18next'
import * as Yup from 'yup';

import tw from '../tailwind';

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
                <TextInputField name="server" />
                <TextInput style={tw`ml-5 mr-5 mt-3 mb-3 p-3 bg-stone-300 text-stone-200 text-base rounded-2 overflow-hidden`}
                    placeholder={t('field.port')}
                    placeholderTextColor={tw.color('stone-500')}
                    value={port}
                    onChangeText={text => setPort(text)}
                />
                <Pressable style={tw`ml-5 mr-5 mt-3 mb-3 p-3 bg-indigo-400 rounded-2 overflow-hidden items-center`}
                    onPress={() => saveCheckConnection()}>
                    <Text style={tw`text-stone-200 text-base `}>Change connection</Text>
                </Pressable>

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
