import React, { useEffect } from 'react';

import { connect, useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import tw from '../../tailwind';
import WelcomeNavigation from './WelcomeNavigation';
import AuthNavigation from './AuthNavigation';
import SettingsScreen from '../screens/SettingsScreen';
import * as actions from '../redux/constants/action';
import NotFound from '../screens/NotFound';

// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function EntryNavigation({ user, status }) {
  const Navigator = createStackNavigator();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.token) {
      dispatch({
        type: actions.GET_USER,
      });
    } else if (status.server) {
      dispatch({
        type: actions.CHECK_CONNECTION,
        payload: {
          server: status.server,
          port: status.port,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Navigator.Navigator
      name="EntryNavigation"
      screenOptions={{
        headerTintColor: tw.color('bg-slate-100'),
      }}
    >
      {status.connected &&
        ((user.token && (
          <Navigator.Screen
            options={{
              headerShown: false,
            }}
            name="WelcomeNavigation"
            component={WelcomeNavigation}
          />
        )) || (
          <Navigator.Screen
            options={{
              headerShown: false,
            }}
            name="AuthNavigation"
            component={AuthNavigation}
          />
        ))}
      {!status.connected && (
        <Navigator.Screen
          options={{
            headerShown: false,
          }}
          name="SettingsScreen"
          component={SettingsScreen}
        />
      )}
      <Navigator.Screen
        options={{
          headerShown: false,
        }}
        name="NotFound"
        component={NotFound}
      />
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
