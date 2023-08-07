import React, { ReactPropTypes } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import tw from '../../tailwind';
import WelcomeNavigation from './WelcomeNavigation';
import AuthNavigation from './AuthNavigation';
import SettingsScreen from '../screens/SettingsScreen';

function EntryNavigation({ user, status }) {
  const Navigator = createStackNavigator();

  return (
    <Navigator.Navigator
      screenOptions={{
        headerTintColor: tw.color('bg-slate-100'),
      }}
    >
      {status.connected ? (
        user.token ? (
          <WelcomeNavigation />
        ) : (
          <AuthNavigation />
        )
      ) : (
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
  user: ReactPropTypes.object.isRequired,
  status: ReactPropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  status: state.status,
  user: state.user,
});

export default connect(mapStateToProps)(EntryNavigation);
