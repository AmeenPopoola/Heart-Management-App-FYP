import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Dashboard from '../screens/Dashboard';
import Emergency from '../screens/Emergency';
import Tips from '../screens/Tips';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Emergency" component={Emergency} />
      <Tab.Screen name="Tips" component={Tips} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
