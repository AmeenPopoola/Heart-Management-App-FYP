import React, {useState,useEffect} from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useFonts, PTSerif_400Regular,PTSerif_700Bold } from '@expo-google-fonts/pt-serif';
import { lightThemeStyles,darkThemeStyles } from '../../../styles/textLabel';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TextInputWithLabel = ({ label, value, placeholder, keyboardType, onChangeText }) => {
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

    let [fontsLoaded] = useFonts({
        PTSerif_400Regular,
        PTSerif_700Bold
      });
    
      if (!fontsLoaded) {
        return null;
      }

      const styles = isDarkMode ? darkThemeStyles : lightThemeStyles;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
      />
    </View>
  );
};


export default TextInputWithLabel;