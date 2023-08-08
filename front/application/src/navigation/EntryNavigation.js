import React from 'react';

import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import tw from '../../tailwind';
import WelcomeNavigation from './WelcomeNavigation';
import AuthNavigation from './AuthNavigation';
import SettingsScreen from '../screens/SettingsScreen';
// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function EntryNavigation({ user, status }) {
  const Navigator = createStackNavigator();

  return (
    <Navigator.Navigator
      screenOptions={{
        headerTintColor: tw.color('bg-slate-100'),
      }}
    >
      {status.connected && ((user.token && <WelcomeNavigation />) || <AuthNavigation />)}
      {!status.connected && (
        <Navigator.Screen
          options={{
            headerShown: false,
          }}
          name="SettingsScreen"
          component={SettingsScreen}
        />
      )}
    </Navigator.Navigator>
  );
}

EntryNavigation.propTypes = {
  user: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  status: state.status,
  user: state.user,
});

export default connect(mapStateToProps)(EntryNavigation);
