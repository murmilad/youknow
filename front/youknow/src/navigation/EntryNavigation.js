import React, { useEffect, useState, useLayoutEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'

import tw from './tailwind'
import WelcomeNavigation from './WelcomeNavigation'
import LoginNavigation from './LoginNavigation'

const Navigator  = createStackNavigator()


const Entry = ({ user, status }) => {

    return (
        <Navigator.Navigator screenOptions={{
            headerTintColor: tw.color('stone-100'),
        }} >
            {(status.connected ? (
                user.token ? (
                    <WelcomeNavigation />
                ) : (
                    <LoginNavigation />
                )
            ) : (
                <Navigator.Screen options={{
                    headerShown: false
                }}
                    name="ScreenSettings"
                    component={ScreenSettings}
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