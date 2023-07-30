import React, { useEffect, useState, useLayoutEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'

import tw from './tailwind'
import LoginScreen from '../screens/LoginScreen'

const Navigator  = createStackNavigator()


const Auth = ({ user, status }) => {

    return (
        <Navigator.Navigator screenOptions={{
            headerTintColor: tw.color('bg-slate-100'),
        }} >
                <Navigator.Screen options={{
                    headerShown: false
                }}
                    name="LoginScreen"
                    component={LoginScreen}
                />
                <Navigator.Screen options={{
                    headerShown: false
                }}
                    name="SignUpScreen"
                    component={SignUpScreen}
                />
        </Navigator.Navigator>
    )
}

const mapStateToProps = state => ({
    status: state.status,
    user: state.user,
})

export default AuthNavigation = connect(mapStateToProps)(Auth)