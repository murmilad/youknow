import React, { useEffect, useState, useLayoutEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'

import tw from './tailwind'
import LoginScreen from '../screens/auth/LoginScreen'
import SignUpScreen from '../screens/auth/SignUpScreen'
import SignedUpScreen from '../screens/auth/SignedUpScreen'
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen'
import ResettedScreen from '../screens/auth/ResettedScreen'

const Navigator = createStackNavigator()


const Auth = ({ navigation, user, status }) => {
        useEffect(() => {
            if (status.signed_up) {
                navigation.navigate('SignedUpScreen')
            }
        }, [status.signed_up]);
        useEffect(() => {
            if (status.reseted) {
                navigation.navigate('ResettedScreen')
            }
        }, [status.reseted]);

        


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
                <Navigator.Screen options={{
                    headerShown: false
                }}
                    name="ResetPassword"
                    component={ResetPassword}
                />
                <Navigator.Screen options={{
                    headerShown: false
                }}
                    name="ResettedScreen"
                    component={ResettedScreen}
                />
                
            </Navigator.Navigator>
        )
    }

const mapStateToProps = state => ({
        status: state.status,
        user: state.user,
    })

    export default AuthNavigation = connect(mapStateToProps)(Auth)