import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, useRef } from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import BloodPressureModel from '../Models/BloodPressureModel';
import { useNavigation } from '@react-navigation/native';

const useBloodPressureViewModel = () => {
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [age, setAge] = useState('');
  const [bpRecords, setBpRecords] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [uid, setUid] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const navigation = useNavigation();

  const videoRef = useRef(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedAge = await AsyncStorage.getItem('age');
        const storedTheme = await AsyncStorage.getItem('themeState');
        const storedUID = await AsyncStorage.getItem('uid');
        const userLoggedIn = await AsyncStorage.getItem('isLoggedIn');

        setIsLoggedIn(!!userLoggedIn);
        if (storedUID) setUid(storedUID);
        if (storedAge) setAge(storedAge);
        if (storedTheme !== null) {
          const parsedTheme = JSON.parse(storedTheme);
          setIsDarkMode(parsedTheme);
        };
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    };
    loadUserData();
  }, [isLoggedIn]);

  useEffect(() => {
    const updateCurrentDate = () => {
      const date = new Date();
      const formattedDate = `${date.toDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
      setCurrentDateTime(formattedDate);
    };
    
    const interval = setInterval(updateCurrentDate, 10000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const checkBloodPressureCategory = () => {
    return BloodPressureModel.checkBloodPressureCategory(age, systolic, diastolic);
  };

  const handleCalculateBP = async () => {
    if (systolic && diastolic) {
      // Disable the button to prevent multiple presses
      setIsButtonDisabled(true);

      const category = checkBloodPressureCategory();
      const time = new Date().toLocaleString();
      const newRecord = { systolic, diastolic, category, time };

      const storedRecords = await AsyncStorage.getItem('bpRecords');
      let updatedRecords = [];

      if (storedRecords) {
        // Parse existing records
        updatedRecords = JSON.parse(storedRecords);
      }
      updatedRecords.push(newRecord);

      // Store the updated records back to AsyncStorage
      await AsyncStorage.setItem('bpRecords', JSON.stringify(updatedRecords));

      // Update the state with the new records
      setBpRecords(updatedRecords);

      if (isLoggedIn) {
        try {
          // Retrieve existing records from Firestore
          const userBPReadingsRef = doc(db, 'userBPReadings', uid);
          const userBPReadingsSnapshot = await getDoc(userBPReadingsRef);
          const existingBloodPressureData = userBPReadingsSnapshot.data().bloodPressureData || [];

          // Add the new record to the existing data
          const updatedBloodPressureData = [...existingBloodPressureData, newRecord];

          // Update the document with the updated data
          await updateDoc(userBPReadingsRef, {
            bloodPressureData: updatedBloodPressureData,
          });
        } catch (error) {
          console.error('Error saving blood pressure records:', error);
        }
      }

      // Enable the button after handling the blood pressure
      setIsButtonDisabled(false);

      navigation.navigate('BPResult', { resultData: newRecord });
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pauseAsync();
      } else {
        videoRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return {
    systolic,
    setSystolic,
    diastolic,
    setDiastolic,
    age,
    setAge,
    bpRecords,
    setBpRecords,
    currentDateTime,
    setCurrentDateTime,
    isDarkMode,
    setIsDarkMode,
    uid,
    setUid,
    isLoggedIn,
    setIsLoggedIn,
    isPlaying,
    setIsPlaying,
    videoRef,
    handleCalculateBP,
    togglePlayPause
  };
};

export default useBloodPressureViewModel;