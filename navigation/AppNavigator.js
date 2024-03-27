import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import Home from '../screens/Home';
import DefibLocation from '../screens/DefibLocation';
import Reminder from '../screens/Reminder';
import Profile from '../screens/Profile';
import HeartRate from '../screens/HeartRate';
import Dashboard from '../screens/Dashboard';
import DailyTasks from '../screens/DailyTasks';
import HRHistory from '../screens/HRHistory';
import Settings from '../screens/Settings';
import ContactView from '../screens/ContactView';
import BloodPressure from '../screens/BloodPressure';
import BPHistory from '../screens/BPHistory';




const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return(
      <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Tabs" component={BottomTabNavigator}  options={{ headerShown: false }} />
        <Stack.Screen 
          name="Home" 
          component = {Home}  
          />
          <Stack.Screen 
          name="DefibLocation" 
          component =  {DefibLocation}
          />
          <Stack.Screen 
          name="Reminder" 
          component =  {Reminder}
          />
           <Stack.Screen 
          name="Profile" 
          component =  {Profile}
          />
          <Stack.Screen 
          name="HeartRate" 
          component =  {HeartRate}
          />
          <Stack.Screen 
          name="DailyTasks" 
          component =  {DailyTasks}
          />
          <Stack.Screen 
          name="HRHistory" 
          component =  {HRHistory}
          />
          <Stack.Screen 
          name="BPHistory" 
          component =  {BPHistory}
          />
          <Stack.Screen 
          name="Settings" 
          component =  {Settings}
          />
          <Stack.Screen 
          name="ContactView" 
          component =  {ContactView}
          />
          <Stack.Screen 
          name="BloodPressure" 
          component =  {BloodPressure}
          />
      </Stack.Navigator>
  );
};

export default AppNavigator;