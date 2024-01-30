import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import DefibLocation from '../screens/DefibLocation';
import Reminder from '../screens/Reminder';
import Start from '../screens/Start';
import Setup from '../screens/Setup';



const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return(
      <Stack.Navigator>
      <Stack.Screen 
          name="Start" 
          component = {Start}  
          />
          <Stack.Screen 
          name="Setup" 
          component = {Setup}  
          />
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
      </Stack.Navigator>
  );
};

export default AppNavigator;