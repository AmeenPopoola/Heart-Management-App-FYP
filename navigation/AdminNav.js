import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminDefib from '../screens/AdminDefib';


const Stack = createNativeStackNavigator();

const AdminNav = () => {
    return(
        <Stack.Navigator screenOptions= {{ headerShown: false }} >
        <Stack.Screen 
          name="AdminDefib" 
          component =  {AdminDefib}
          />
        </Stack.Navigator>
    )
}

export default AdminNav;