import React,{useEffect,useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { darkThemeButtonStyles,lightThemeButtonStyles } from '../styles/buttonStyles';

const BPResult = ({ route, navigation }) => {
  const { resultData } = route.params;
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Extract blood pressure data
  const { systolic, diastolic, category } = resultData;

  
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

    const ButtonStyles = isDarkMode ? darkThemeButtonStyles : lightThemeButtonStyles;

  // Determine text and color based on blood pressure category
  let textColor, message;
  switch (category) {
    case 'High Blood Pressure':
      textColor = 'red';
      message = 'High Blood Pressure: Tips to reduce high blood pressure: 1. Eat a healthy diet. 2. Exercise regularly. 3. Reduce salt intake. 4. Manage stress levels.';
      break;
    case 'Ideal Blood Pressure':
      textColor = 'darkgreen';
      message = 'Brilliant! This is an ideal reading. Stay consistent with your lifestyle.';
      break;
    case 'Normal Blood Pressure':
      textColor = 'green';
      message = 'Good work! Keep managing your heart health to improve.';
      break;
    default:
      textColor = 'black';
      message = '';
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.bloodPressureText, { color: textColor }]}>{systolic}/{diastolic}</Text>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity
        style={ButtonStyles.button}
        onPress={() => navigation.navigate('Dashboard')}
      >
        <Text style={ButtonStyles.buttonText}>Go To Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bloodPressureText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default BPResult;