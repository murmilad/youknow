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
            headerTintColor: tw.color('bg-slate-100'),
        }} >
                <Navigator.Screen options={{
                    headerShown: false
                }}
                    name="LoginAuthScreen"
                    component={LoginAuthScreen}
                />
        </Navigator.Navigator>
    )
}

const mapStateToProps = state => ({
    status: state.status,
    user: state.user,
})

export default NavigationEntry = connect(mapStateToProps)(Entry)