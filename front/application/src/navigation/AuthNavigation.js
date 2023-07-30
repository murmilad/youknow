import React, { useEffect, useState, useLayoutEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'

import tw from './tailwind'
import LoginScreen from '../screens/LoginScreen'
import SignUpScreen from '../screens/SignUpScreen'
import SignedUpScreen from '../screens/SignedUpScreen'

const Navigator = createStackNavigator()


const Auth = ({ navigation, user, status }) => {
        useEffect(() => {
            if (status.signed_up) {
                navigation.navigate('SignedUpScreen')
            }
        }, [status.signed_up]);

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
                <Navigator.Screen options={{
                    headerShown: false
                }}
                    name="SignedUpScreen"
                    component={SignedUpScreen}
                />
            </Navigator.Navigator>
        )
    }

const mapStateToProps = state => ({
        status: state.status,
        user: state.user,
    })

    export default AuthNavigation = connect(mapStateToProps)(Auth)