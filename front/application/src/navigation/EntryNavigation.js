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

function EntryNavigation({ user, status, route }) {
  const Navigator = createStackNavigator();
  const dispatch = useDispatch();
  useEffect(() => {
    if (route.params?.token) {
      dispatch({
        type: actions.PUT_TOKEN_HEADER,
        payload: {
          token: route.params.token,
        },
      });
    }
    if (status.server) {
      dispatch({
        type: actions.CONNECT_AND_SET_PARAMS,
        payload: {
          server: status.server,
          port: status.port,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);

  return (
    <Navigator.Navigator
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
  route: PropTypes.object,
};

EntryNavigation.defaultProps = {
  route: undefined,
};
const mapStateToProps = (state) => ({
  status: state.status,
  user: state.user,
});

export default connect(mapStateToProps)(EntryNavigation);
