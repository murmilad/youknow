import React, { ReactPropTypes } from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ReactComponent as ChatDotsComposite } from '../assets/chat_dots_composite.svg';
import { ReactComponent as PersistCircle } from '../assets/person-circle.svg';
import UserScreen from '../screens/UserScreen';
import FeedScreen from '../screens/FeedScreen';
import tw from '../../tailwind';

function WelcomeNavigation({ navigation, user, status }) {
  const Navigator = createStackNavigator();
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarIcon: <ChatDotsComposite style={tw`text-white`} />,
        }}
      />
      <Tab.Screen
        name="Account"
        component={UserScreen}
        options={{
          tabBarIcon: <PersistCircle style={tw`text-white`} />,
        }}
      />
    </Tab.Navigator>
  );
}

WelcomeNavigation.propTypes = {
  user: ReactPropTypes.object.isRequired,
  status: ReactPropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  status: state.status,
  user: state.user,
});

export default connect(mapStateToProps)(WelcomeNavigation);
