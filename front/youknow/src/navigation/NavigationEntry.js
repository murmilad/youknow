import React, { useEffect, useState, useLayoutEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'

import tw from './tailwind'
import NavigationWelcome from './NavigationWelcome'
import NavigationLogin from './NavigationLogin'

const Navigator  = createStackNavigator()


const Entry = ({ user, status }) => {

    return (
        <Navigator.Navigator screenOptions={{
            headerTintColor: tw.color('stone-100'),
        }} >
            {(status.connected ? (
                user.token ? (
                    <NavigationWelcome />
                ) : (
                    <NavigationLogin />
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