import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../screens/Dashboard';
import Emergency from '../screens/Emergency';
import Tips from '../screens/Tips';
import Icon from 'react-native-vector-icons/Entypo';
import { useFonts, PTSerif_700Bold, PTSerif_400Regular } from '@expo-google-fonts/pt-serif';
import { lightThemeStyles,darkThemeStyles } from '../styles/BottomTabNav/tabStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('themeState');
        if (storedTheme !== null) {
          const parsedTheme = JSON.parse(storedTheme);
          setIsDarkMode(parsedTheme);
        }
      } catch (error) {
        console.error('Error loading theme:', error);
      }
    };

    loadTheme();
  }, []);

  const themeStyles = isDarkMode ? darkThemeStyles : lightThemeStyles;

  let [fontsLoaded] = useFonts({ PTSerif_400Regular, PTSerif_700Bold });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = 'home';
          } else if (route.name === 'Emergency') {
            iconName = 'lifebuoy';
          } else if (route.name === 'Tips') {
            iconName = 'info-with-circle';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarStyle: themeStyles.tabBarStyle, // Apply theme styles here
        tabBarActiveTintColor: themeStyles.activeTintColor,
        tabBarInactiveTintColor: themeStyles.inactiveTintColor,
        tabBarLabelStyle: themeStyles.tabBarLabelStyle,
      })}
    >
       <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
          tabBarLabel: 'Dashboard',
        }}
      />
      <Tab.Screen
        name="Emergency"
        component={Emergency}
        options={{
          headerShown: false,
          tabBarLabel: 'Emergency',
        }}
      />
      <Tab.Screen
        name="Tips"
        component={Tips}
        options={{
          headerShown: false,
          tabBarLabel: 'Tips',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;