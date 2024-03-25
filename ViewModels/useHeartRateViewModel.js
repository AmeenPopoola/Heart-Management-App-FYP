import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useHeartRateViewModel = () => {
  const [heartRate, setHeartRate] = useState('');
  const [userAge, setUserAge] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Load user age from AsyncStorage
    const loadUserData = async () => {
      try {
        const storedAge = await AsyncStorage.getItem('age');
        if (storedAge) setUserAge(storedAge);
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };
    loadUserData();
  }, []);

  useEffect(() => {
    // Update the current date initially
    updateCurrentDate();

    // Set up an interval to update the current date every minute
    const intervalId = setInterval(updateCurrentDate, 60000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const updateCurrentDate = () => {
    const date = new Date();
    const formattedDate = `${date.toDateString()} ${date.toLocaleTimeString()}`;
    setCurrentDate(formattedDate);
  };
  
  const handleEnterHeartRate = async () => {
    // Check if the entered value is a number
    const enteredBPM = parseInt(heartRate, 10);
    if (isNaN(enteredBPM)) {
      Alert.alert('Error', 'Please enter a valid number for Heart Rate.');
      return;
    }

    if (enteredBPM < 50 || enteredBPM > 220) {
      Alert.alert('Error', 'Please enter a heart rate between 50 and 220 bpm.');
      return;
    }
  
    // Determine the band width based on user's age
    let lowerLimit, upperLimit;
    if (userAge >= 5 && userAge <= 6) {
      lowerLimit = 75;
      upperLimit = 115;
    } else if (userAge >= 7 && userAge <= 9) {
      lowerLimit = 70;
      upperLimit = 110;
    } else if (userAge >= 10) {
      lowerLimit = 60;
      upperLimit = 100;
    } else {
      Alert.alert('Error', 'Please enter a valid age.');
      return;
    }
  
    // Check if entered BPM is within the band width
    const currentDate = new Date();
    const timestamp = currentDate.toISOString();
  
    // Check if entered BPM is within the band width
    if (enteredBPM >= lowerLimit && enteredBPM <= upperLimit) {
      const resultData = {
        heartRate: enteredBPM,
        isWithinRange: true,
        timestamp: timestamp,
      };
  
      // Save the new heart rate data to AsyncStorage
      try {
        const storedResults = await AsyncStorage.getItem('heartRateResults');
        const results = storedResults ? JSON.parse(storedResults) : [];
        results.push(resultData);
        await AsyncStorage.setItem('heartRateResults', JSON.stringify(results));
      } catch (error) {
        console.error('Error saving heart rate result to AsyncStorage:', error);
      }
  
      // Show success message
      Alert.alert('Success', 'Entered Heart Rate is within the band width!');
    } else {
      const resultData = {
        heartRate: enteredBPM,
        isWithinRange: false,
        timestamp: timestamp,
      };
  
      // Save the new heart rate data to AsyncStorage
      try {
        const storedResults = await AsyncStorage.getItem('heartRateResults');
        const results = storedResults ? JSON.parse(storedResults) : [];
        results.push(resultData);
        await AsyncStorage.setItem('heartRateResults', JSON.stringify(results));
      } catch (error) {
        console.error('Error saving heart rate result to AsyncStorage:', error);
      }
  
      // Show error message
      Alert.alert('Error', 'Entered Heart Rate is outside the allowed range for the given age.');
    }
  };


      return {
        heartRate,
        setHeartRate,
        userAge,
        currentDate,
        handleEnterHeartRate,
      };
    };