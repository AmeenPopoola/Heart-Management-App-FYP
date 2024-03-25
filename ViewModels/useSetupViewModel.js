import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import UserProfile from '../Models/UserProfile';

const useSetupViewModel = () => {
  const [firstName, setFirstName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [newContactName, setNewContactName] = useState('');
  const [newContactNumber, setNewContactNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    // Load stored data on component mount
    const loadData = async () => {
      try {
        const storedFirstName = await AsyncStorage.getItem('firstName');
        const storedAge = await AsyncStorage.getItem('age');
        const storedGender = await AsyncStorage.getItem('gender');
        const storedHeight = await AsyncStorage.getItem('height');
        const storedWeight = await AsyncStorage.getItem('weight');
        const storedEmergencyContacts = await AsyncStorage.getItem('emergencyContacts');

        setFirstName(storedFirstName || '');
        setAge(storedAge || '');
        setGender(storedGender || '');
        setHeight(storedHeight || '');
        setWeight(storedWeight || '');
        setEmergencyContacts(JSON.parse(storedEmergencyContacts) || []);
      } catch (error) {
        console.error('Error loading data from AsyncStorage:', error);
      }
    };

    loadData();
  }, []);

  // Save data to AsyncStorage when it changes
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('firstName', firstName);
        await AsyncStorage.setItem('age', age);
        await AsyncStorage.setItem('gender', gender);
        await AsyncStorage.setItem('height', height);
        await AsyncStorage.setItem('weight', weight);
        await AsyncStorage.setItem('emergencyContacts', JSON.stringify(emergencyContacts));
      } catch (error) {
        console.error('Error saving data to AsyncStorage:', error);
      }
    };

    saveData();
  }, [firstName, age, gender, height, weight, emergencyContacts]);

  const addEmergencyContact = () => {
    if (newContactName && newContactNumber) {
      const updatedContacts = [...emergencyContacts, { name: newContactName, number: newContactNumber }];
      setEmergencyContacts(updatedContacts);
      setNewContactName('');
      setNewContactNumber('');
    }
  };

  const handleDeleteContact = (index) => {
    const updatedContacts = [...emergencyContacts];
    updatedContacts.splice(index, 1);
    setEmergencyContacts(updatedContacts);
  };

  const handleDonePress = () => {
    if (!firstName || !age || !gender || !height || !weight || emergencyContacts.length === 0) {
      setErrorMessage('Please fill in all the required fields!');
      return;
    }

    // If all required fields are filled, clear the error message and navigate to the next screen.
    setErrorMessage('');
    navigation.navigate('AppNavigator');
  };

  return {
    firstName,
    age,
    gender,
    height,
    weight,
    emergencyContacts,
    newContactName,
    newContactNumber,
    errorMessage,
    setFirstName,
    setAge,
    setGender,
    setHeight,
    setWeight,
    addEmergencyContact,
    handleDeleteContact,
    handleDonePress,
    setNewContactName,
    setNewContactNumber,
  };
};

export default useSetupViewModel;

