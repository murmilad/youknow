/* eslint-disable import/no-named-default */
import React from 'react';

import { connect, useDispatch } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import { default as ChatDots } from '../assets/chat_dots.svg';
import { default as BarChart } from '../assets/bar-chart-rotated.svg';
import { default as Gear } from '../assets/gear.svg';
import UserScreen from '../screens/UserScreen';
import tw from '../../tailwind';
import LessonScreen from '../screens/LessonScreen';
import LessonPriorityScreen from '../screens/LessonPriorityScreen';

// eslint-disable-next-line import/no-extraneous-dependencies
const PropTypes = require('prop-types');

function WelcomeNavigation({ navigation, user, status }) {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const Navigator = createStackNavigator();
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={t('tab.lessons')}
        component={LessonScreen}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: () => <ChatDots width={20} height={20} style={tw`text-blue-600`} />,
        }}
      />
      <Tab.Screen
        name={t('tab.priority')}
        component={LessonPriorityScreen}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: () => <BarChart width={20} height={20} style={tw`text-blue-600`} />,
        }}
      />
      <Tab.Screen
        name={t('tab.settings')}
        component={UserScreen}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarIcon: () => <Gear width={20} height={20} style={tw`text-blue-600`} />,
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
