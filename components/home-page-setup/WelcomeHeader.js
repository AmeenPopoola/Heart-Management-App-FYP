import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFonts, PTSerif_700Bold, PTSerif_400Regular } from '@expo-google-fonts/pt-serif';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation,useIsFocused} from '@react-navigation/native';
import { lightThemeStyles,darkThemeStyles } from '../../styles/Dashboard/welcomeStyles';

export default function WelcomeHeader() {
  const [userFirstName, setUserFirstName] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const isFocused = useIsFocused();

  const navigation = useNavigation();

  const handleSettingsPress = () => {
    navigation.navigate('Settings'); 
  };

  const [fontsLoaded] = useFonts({
    PTSerif_400Regular,
    PTSerif_700Bold,
  });

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedFirstName = await AsyncStorage.getItem('firstName');
        const storedTheme = await AsyncStorage.getItem('themeState');
        if (storedFirstName) {
          setUserFirstName(storedFirstName);
        }
        if (storedTheme !== null) {
          const parsedTheme = JSON.parse(storedTheme);
          setIsDarkMode(parsedTheme);
        };
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };
    loadUserData();
  }, [isFocused,isDarkMode]);

  if (!fontsLoaded) {
    return null;
  }

  const styles = isDarkMode ? darkThemeStyles : lightThemeStyles;


  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Hello,</Text>
        <Text style={styles.text}>{userFirstName}</Text>
      </View>
      <TouchableOpacity style={styles.settingsButton} onPress={handleSettingsPress}>
        <Icon name="setting" size={24} color={styles.settingsText.color} />
        <Text style={styles.settingsText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

