import React , {useEffect,useState} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from '../screens/Start';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Setup from '../screens/Setup';
import AppNavigator from './AppNavigator';
import Login from '../screens/Login';


const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  const [userDataExists, setUserDataExists] = useState(false);

  useEffect(() => {
    const checkUserData = async () => {
      try{
        const storedFirstName = await AsyncStorage.getItem('firstName');
        const storedAge = await AsyncStorage.getItem('age');
        const storedGender = await AsyncStorage.getItem('gender');
        const storedHeight = await AsyncStorage.getItem('height');
        const storedWeight = await AsyncStorage.getItem('weight');
        const emergencyContacts = await AsyncStorage.getItem('emergencyContacts');

        if(storedFirstName){
          setUserDataExists(true);
        } else {
          setUserDataExists(false);
        }
      } catch (error){
        console.error('Error checking user data: ',error);
      }
    };
    checkUserData();
  },[]);

  return (
    <Stack.Navigator>
    {userDataExists ? (
      <Stack.Screen name="AppNav" component={AppNavigator}  options={{ headerShown: false }} />
    ) : (
      <Stack.Screen name="Start" component={Start} />
    )}
    <Stack.Screen name="Setup" component={Setup} />
    <Stack.Screen name="MainApp" component={AppNavigator} options={{ headerShown: false }} />
    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;