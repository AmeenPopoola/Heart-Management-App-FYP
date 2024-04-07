import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Checkbox } from 'expo-checkbox';
import Icon from 'react-native-vector-icons/AntDesign';
import { useFonts, PTSerif_400Regular, PTSerif_700Bold } from '@expo-google-fonts/pt-serif';
import { useNavigation } from '@react-navigation/native';
import { lightThemeStyles,darkThemeStyles } from '../styles/DailyTasks/taskStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DailyTasks = () => {
  const [heartRateChecked, setHeartRateChecked] = useState(false);
  const [bloodPressureChecked, setBloodPressureChecked] = useState(false);
  const [medicationChecked, setMedicationChecked] = useState(false);
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

  const handleHeartRateToggle = () => {
    setHeartRateChecked(!heartRateChecked);
    if (!heartRateChecked) {
      navigation.navigate('HeartRate'); // Navigate to HeartRatePage if task is completed
    }
  };

  const handleBloodPressureToggle = () => {
    setBloodPressureChecked(!bloodPressureChecked);
    if (!bloodPressureChecked) {
      navigation.navigate('BloodPressure'); // Navigate to BloodPressurePage if task is completed
    }
  };

  const handleMedicationToggle = () => {
    setMedicationChecked(!medicationChecked);
    if (!medicationChecked) {
      navigation.navigate('Medication'); // Navigate to MedicationPage if task is completed
    }
  };

  let [fontsLoaded] = useFonts({
    PTSerif_400Regular,
    PTSerif_700Bold,
  });
  
  if (!fontsLoaded) {
    return null;
  }

  const styles = isDarkMode ? darkThemeStyles : lightThemeStyles;

  const renderCompleteTaskButton = (checked, onPress) => {
    if (!checked) {
      return (
        <TouchableOpacity style={styles.completeTaskButton} onPress={onPress}>
          <Text style={styles.completeTaskButtonText}>Complete Task</Text>
        </TouchableOpacity>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="back" size={24} color={styles.backButtonText.color} />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Complete Your Daily Tasks!</Text>
      <View style={styles.taskContainer}>
        <Text style={styles.taskText}>Measure Heart Rate</Text>
        <Checkbox
          value={heartRateChecked}
          onValueChange={handleHeartRateToggle}
        />
        {renderCompleteTaskButton(heartRateChecked, handleHeartRateToggle)}
      </View>
      <View style={styles.taskContainer}>
        <Text style={styles.taskText}>Measure Blood Pressure</Text>
        <Checkbox
          value={bloodPressureChecked}
          onValueChange={handleBloodPressureToggle}
        />
        {renderCompleteTaskButton(bloodPressureChecked, handleBloodPressureToggle)}
      </View>
      <View style={styles.taskContainer}>
        <Text style={styles.taskText}>Take Medication</Text>
        <Checkbox
          value={medicationChecked}
          onValueChange={handleMedicationToggle}
        />
        {renderCompleteTaskButton(medicationChecked, handleMedicationToggle)}
    </View>
  </View>
  );
};


export default DailyTasks;