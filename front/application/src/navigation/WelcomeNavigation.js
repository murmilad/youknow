/* eslint-disable import/no-named-default */
import React from 'react';

import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { default as ChatDotsComposite } from '../assets/chat_dots_composite.svg';
import { default as PersistCircle } from '../assets/person-circle.svg';
import UserScreen from '../screens/UserScreen';
import FeedScreen from '../screens/FeedScreen';
import tw from '../../tailwind';
// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function WelcomeNavigation({ navigation, user, status }) {
  const Navigator = createStackNavigator();
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: () => <ChatDotsComposite width={20} height={20} style={tw`text-blue-600`} />,
        }}
      />
      <Tab.Screen
        name="Account"
        component={UserScreen}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: () => <PersistCircle width={20} height={20} style={tw`text-blue-600`} />,
        }}
      />
    </Tab.Navigator>
  );
}

WelcomeNavigation.propTypes = {
  user: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  status: state.status,
  user: state.user,
});

export default connect(mapStateToProps)(WelcomeNavigation);
