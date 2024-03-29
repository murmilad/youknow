import React from 'react';
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

import OAuthScreen from '../screens/auth/OAuthScreen';

// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function AuthNavigation({ navigation, user, status }) {
  const Navigator = createStackNavigator();

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
      <Navigator.Screen
        options={{
          headerShown: false,
        }}
        name="OAuthScreen"
        component={OAuthScreen}
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
