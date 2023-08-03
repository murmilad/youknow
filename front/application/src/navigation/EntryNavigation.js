import React, { useEffect, useState, useLayoutEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'

import tw from '../../tailwind'
import WelcomeNavigation from './WelcomeNavigation'
import AuthNavigation from './AuthNavigation'
import SettingsScreen from '../screens/SettingsScreen'


const Entry = ({ user, status }) => {
    const Navigator  = createStackNavigator()

    return (
        <Navigator.Navigator screenOptions={{
            headerTintColor: tw.color('bg-slate-100'),
        }} >
            {(status.connected ? (
                user.token ? (
                    <WelcomeNavigation />
                ) : (
                    <AuthNavigation />
                )
            ) : (
                <Navigator.Screen options={{
                    headerShown: false
                }}
                    name="SettingsScreen"
                    component={SettingsScreen}
                />
            ))}
        </Navigator.Navigator>
    )
}

const mapStateToProps = state => ({
    status: state.status,
    user: state.user,
})

export default NavigationEntry = connect(mapStateToProps)(Entry)