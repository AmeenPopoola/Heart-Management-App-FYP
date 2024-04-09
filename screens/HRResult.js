import React, {useState,useEffect} from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { darkThemeButtonStyles,lightThemeButtonStyles } from '../styles/buttonStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


const HRResult = ({ route }) => {
  const { resultData } = route.params;
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navigation = useNavigation();


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

  // Check if the heart rate result is within the desired range
  const isWithinRange = resultData.isWithinRange;
  const heartRate = resultData.heartRate;

  // Determine the text and color based on whether the result is good or bad
  let textColor = isWithinRange ? 'green' : 'red';
  let message = isWithinRange ? 'Good Result, Keep Taking Good Care Of Your Heart!' : 
              'Bad Result: Tips to lower heart rate: 1. Practice deep breathing exercises. 2. Get regular exercise. 3. Reduce stress levels. If bad results persist, contact your doctor.';

              
  const goToDashboard = () => {
    navigation.navigate('Dashboard'); // Navigate to the Dashboard screen
  };

  const ButtonStyles = isDarkMode ? darkThemeButtonStyles : lightThemeButtonStyles;

  return (
    <View style={styles.container}>
      <Text style={[styles.heartRateText, { color: textColor }]}>{heartRate}</Text>
      <Text style={styles.message}>{message}</Text>
      <TouchableOpacity style={ButtonStyles.button} onPress={goToDashboard}>
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
  heartRateText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default HRResult;
