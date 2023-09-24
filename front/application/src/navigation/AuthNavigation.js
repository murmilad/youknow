import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import tw from '../../tailwind';
import LoginScreen from '../screens/auth/LoginScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import SignedUpScreen from '../screens/auth/SignedUpScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';
import ResettedScreen from '../screens/auth/ResettedScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import ForgottenScreen from '../screens/auth/ForgottenScreen';
import VerifyScreen from '../screens/auth/VerifyScreen';
import VerifiedScreen from '../screens/auth/VerifiedScreen';

import * as loginStatus from '../redux/constants/loginStatus';

// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function AuthNavigation({ navigation, user, status }) {
  const Navigator = createStackNavigator();

  useEffect(() => {
    if (user.login_status === loginStatus.LOGIN_STATUS_SIGNED_UP) {
      navigation.navigate('SignedUpScreen');
    } else if (user.login_status === loginStatus.LOGIN_STATUS_PASSWORD_RESET) {
      navigation.navigate('ResettedScreen');
    } else if (user.login_status === loginStatus.LOGIN_STATUS_PASSWORD_FORGOT) {
      navigation.navigate('ForgottenScreen');
    } else if (user.login_status === loginStatus.LOGIN_STATUS_VERIFIED) {
      navigation.navigate('VerifiedScreen');
    } else {
      navigation.navigate('LoginScreen');
    }
  }, [navigation, user.login_status]);

  return (
    <Navigator.Navigator
      screenOptions={{
        headerTintColor: tw.color('bg-slate-100'),
      }}
    >
      <Navigator.Screen
        options={{
          headerShown: false,
        }}
        name="LoginScreen"
        component={LoginScreen}
      />
      <Navigator.Screen
        options={{
          headerShown: false,
        }}
        name="SignUpScreen"
        component={SignUpScreen}
      />
      <Navigator.Screen
        options={{
          headerShown: false,
        }}
        name="SignedUpScreen"
        component={SignedUpScreen}
      />
      <Navigator.Screen
        options={{
          headerShown: false,
        }}
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
      />
      <Navigator.Screen
        options={{
          headerShown: false,
        }}
        name="ResettedScreen"
        component={ResettedScreen}
      />
      <Navigator.Screen
        options={{
          headerShown: false,
        }}
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
      <Navigator.Screen
        options={{
          headerShown: false,
        }}
        name="ForgottenScreen"
        component={ForgottenScreen}
      />
      <Navigator.Screen
        options={{
          headerShown: false,
        }}
        name="VerifyScreen"
        component={VerifyScreen}
      />
      <Navigator.Screen
        options={{
          headerShown: false,
        }}
        name="VerifiedScreen"
        component={VerifiedScreen}
      />
    </Navigator.Navigator>
  );
}

AuthNavigation.propTypes = {
  user: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  status: state.status,
  user: state.user,
});

export default connect(mapStateToProps)(AuthNavigation);
