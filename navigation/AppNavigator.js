import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
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
import HRResult from '../screens/HRResult';
import BPResult from '../screens/BPResult';
import { LogBox } from 'react-native';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import AdminNav from './AdminNav';




const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return(
      <Stack.Navigator screenOptions={{ headerShown: false }} >
      <Stack.Screen name="Tabs" component={BottomTabNavigator}  options={{ headerShown: false }} />
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
          <Stack.Screen 
          name="HRResult" 
          component =  {HRResult}
          />
          <Stack.Screen 
          name="BPResult" 
          component =  {BPResult}
          />
          <Stack.Screen 
          name="Login" 
          component =  {Login}
          />
          <Stack.Screen 
          name="SignUp" 
          component =  {SignUp}
          />
          <Stack.Screen 
          name="AdminNav" 
          component =  {AdminNav}
          />
      </Stack.Navigator>
  );
};

export default AppNavigator;