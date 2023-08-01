import React, { useEffect, useState, useLayoutEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {ReactComponent as ChatDotsComposite}  from '../assets/chat_dots_composite.svg';
import {ReactComponent as PersistCircle}  from '../assets/person-circle.svg';
import UserScreen from '../screens/UserScreen';
import FeedScreen from '../screens/FeedScreen';
import tw from '../../tailwind'

const Navigator = createStackNavigator()
const Tab = createBottomTabNavigator();



const Welcome = ({ navigation, user, status }) => {
        return (
            <Tab.Navigator>
            <Tab.Screen
              name="Feed"
              component={FeedScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <ChatDotsComposite  style={tw`text-white`} size={size}/>
                ),
              }}
            />
            <Tab.Screen
              name="Account"
              component={UserScreen}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <PersistCircle  style={tw`text-white`} size={size}/>
                ),
              }}
            />
          </Tab.Navigator>
        )
    }

    const mapStateToProps = state => ({
        status: state.status,
        user: state.user,
    })

    export default WelcomeNavigation = connect(mapStateToProps)(Welcome)