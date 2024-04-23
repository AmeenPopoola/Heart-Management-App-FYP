import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useFonts, PTSerif_400Regular, PTSerif_700Bold } from '@expo-google-fonts/pt-serif';
import { useNavigation } from '@react-navigation/native';
import { lightThemeStyles, darkThemeStyles } from '../styles/DailyTasks/taskStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Checkbox } from 'expo-checkbox';

const DailyTasks = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [heartRateHistory, setHeartRateHistory] = useState([]);
  const [bPHistory, setBPHistory] = useState([]);
  const [isMedicationTaken, setIsMedicationTaken] = useState(false);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const storedHRData = await AsyncStorage.getItem('heartRateResults');
        const storedBPData = await AsyncStorage.getItem('bpRecords');
        const storedTheme = await AsyncStorage.getItem('themeState');

        if (storedBPData !== null) {
          const records = JSON.parse(storedBPData);
          setBPHistory(records);
        }
        if (storedTheme !== null) {
          const parsedTheme = JSON.parse(storedTheme);
          setIsDarkMode(parsedTheme);
        }
        if (storedHRData) {
          const parsedData = JSON.parse(storedHRData);
          setHeartRateHistory(parsedData);
        }
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };
    fetchHistory();
  }, []);

  const currentDateString = new Date().toLocaleString().split(',')[0]; // Get current date in ISO string format

    const lastHeartRateResult = heartRateHistory.length > 0 ? heartRateHistory[heartRateHistory.length - 1] : null;
    const lastHeartRateDateString = lastHeartRateResult ? new Date(lastHeartRateResult.timestamp).toLocaleString().split(',')[0] : null;

    const lastBloodPressureResult = bPHistory.length > 0 ? bPHistory[bPHistory.length - 1] : null;
    const lastBloodPressureDateString = lastBloodPressureResult ? lastBloodPressureResult.time.split(',')[0] : null;


    console.log(lastBloodPressureDateString);
    console.log(lastHeartRateDateString);

    useEffect(() => {
      let heartRateTasksCount = 0;
      let bloodPressureTasksCount = 0;
    
      if (lastHeartRateDateString === currentDateString) {
        heartRateTasksCount = 1;
      }
    
      if (lastBloodPressureDateString === currentDateString) {
        bloodPressureTasksCount = 1;
      }
    
      // Update the completedTasksCount by adding heart rate and blood pressure tasks counts
      setCompletedTasksCount(heartRateTasksCount + bloodPressureTasksCount);
    }, [heartRateHistory, bPHistory, currentDateString, lastHeartRateDateString, lastBloodPressureDateString]);

    console.log(completedTasksCount);

    useEffect(() => {
      // Save the completed tasks count in AsyncStorage
      AsyncStorage.setItem('completedTasksCount', completedTasksCount.toString());
    }, [completedTasksCount]);

    const handleTaskCompletion = (taskName) => {
      // Remove the completed task from the completedTasks array
      const updatedCompletedTasks = completedTasks.filter((task) => task !== taskName);
      setCompletedTasks(updatedCompletedTasks);
    
    
    
      // Save the completed tasks in AsyncStorage or any other storage mechanism
    
      if (taskName === 'HeartRate') {
        navigation.navigate('HeartRate');
      } else if (taskName === 'BloodPressure') {
        navigation.navigate('BloodPressure');
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

  const handleMedicationToggle = () => {
    setIsMedicationTaken(!isMedicationTaken);
    AsyncStorage.setItem('isMedicationTaken', JSON.stringify(!isMedicationTaken));
    // If medication is checked, increment completedTasksCount
    if (!isMedicationTaken) {
      setCompletedTasksCount(completedTasksCount + 1);
    } else {
    // If medication is unchecked, decrement completedTasksCount
    setCompletedTasksCount(completedTasksCount - 1);
  }
  };

  const renderCompleteTaskButton = (taskName, onPress) => {

    
    if (!completedTasks.includes(taskName)) {
      if (taskName === 'HeartRate' && lastHeartRateDateString === currentDateString) {
        // If the last heart rate result has the same date as the current date
        return (
          <View style={styles.completedTaskContainer}>
            <Icon name="checkcircle" size={24} color={styles.completeTaskButton.color} />
            <TouchableOpacity style={styles.completeAgainButton} onPress={onPress}>
              <Text style={styles.completeAgainButtonText}>Complete Again</Text>
            </TouchableOpacity>
          </View>
        );
      } else if (taskName === 'BloodPressure' && lastBloodPressureDateString === currentDateString) {
        // If the last blood pressure result has the same date as the current date
        return (
          <View style={styles.completedTaskContainer}>
            <Icon name="checkcircle" size={24} color={styles.completeTaskButton.color} />
            <TouchableOpacity style={styles.completeAgainButton} onPress={onPress}>
              <Text style={styles.completeAgainButtonText}>Complete Again</Text>
            </TouchableOpacity>
          </View>
        );
      } else if (taskName === 'Medication') {
        return (
          <Checkbox
            value={isMedicationTaken}
            onValueChange={handleMedicationToggle}
          />
        );
      } else {
        // If the task is not completed or not a heart rate task or there's no heart rate result for today
        return (
          <TouchableOpacity style={styles.completeTaskButton} onPress={onPress}>
            <Text style={styles.completeTaskButtonText}>Complete Task</Text>
          </TouchableOpacity>
        );
      }
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
      <Text style={styles.completedTasksCount}>Completed Tasks: {completedTasksCount}</Text>
      <View style={styles.taskContainer}>
        <Text style={styles.taskText}>Measure Heart Rate</Text>
        {renderCompleteTaskButton('HeartRate', () => handleTaskCompletion('HeartRate'))}
      </View>
      <View style={styles.taskContainer}>
        <Text style={styles.taskText}>Measure Blood Pressure</Text>
        {renderCompleteTaskButton('BloodPressure', () => handleTaskCompletion('BloodPressure'))}
      </View>
      <View style={styles.taskContainer}>
        <Text style={styles.taskText}>Take Medication</Text>
        {renderCompleteTaskButton('Medication', () => handleTaskCompletion('Medication'))}
      </View>
    </View>
  );
};

export default DailyTasks;