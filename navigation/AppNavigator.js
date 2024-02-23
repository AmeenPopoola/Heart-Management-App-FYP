import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import Home from '../screens/Home';
import DefibLocation from '../screens/DefibLocation';
import Reminder from '../screens/Reminder';
import Profile from '../screens/Profile';




const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return(
      <Stack.Navigator >
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
      </Stack.Navigator>
  );
};

export default AppNavigator;