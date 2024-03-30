import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../screens/Profile';
import Dashboard from '../screens/Dashboard';
import Emergency from '../screens/Emergency';
import Tips from '../screens/Tips';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }}/>
      <Tab.Screen name="Emergency" component={Emergency} options={{ headerShown: false }}/>
      <Tab.Screen name="Tips" component={Tips} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
