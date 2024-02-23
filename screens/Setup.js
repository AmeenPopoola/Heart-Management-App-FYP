import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, PTSerif_400Regular, PTSerif_700Bold } from '@expo-google-fonts/pt-serif';
import RNPickerSelect from 'react-native-picker-select';

import ContactList from '../components/user-setup-process/UserInfoSetup/ContactList';
import EmergencyContactForm from '../components/user-setup-process/UserInfoSetup/EmergencyContactForm';
import TextInputWithLabel from '../components/user-setup-process/UserInfoSetup/TextInputWithLabel';

import pickerStyles from './styles/PickerStyles';

import { addEmergencyContact, deleteEmergencyContact } from '../functions/user-setup-process/UserInfoSetup/utils';

const Setup = () => {
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

  // Load stored data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedFirstName = await AsyncStorage.getItem('firstName');
        const storedAge = await AsyncStorage.getItem('age');
        const storedGender = await AsyncStorage.getItem('gender');
        const storedHeight = await AsyncStorage.getItem('height');
        const storedWeight = await AsyncStorage.getItem('weight');
        const storedEmergencyContacts = await AsyncStorage.getItem('emergencyContacts');

        if (storedFirstName) setFirstName(storedFirstName);
        if (storedAge) setAge(storedAge);
        if (storedGender) setGender(storedGender);
        if (storedHeight) setHeight(storedHeight);
        if (storedWeight) setWeight(storedWeight);
        if (storedEmergencyContacts) setEmergencyContacts(JSON.parse(storedEmergencyContacts));
      } catch (error) {
        console.error('Error loading data from AsyncStorage:', error);
      }
    };

    loadData();
  }, []); // Empty dependency array means this effect runs only once on mount

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
  }, [firstName, age, gender, weight, height, emergencyContacts]);

  let [fontsLoaded] = useFonts({
    PTSerif_400Regular,
    PTSerif_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleAddEmergencyContact = () => {
    if (newContactName && newContactNumber) {
      setEmergencyContacts((prevContacts) => addEmergencyContact(prevContacts, { name: newContactName, number: newContactNumber }));
      setNewContactName('');
      setNewContactNumber('');
    }
  };

  const handleDeleteContact = (index) => {
    setEmergencyContacts((prevContacts) => deleteEmergencyContact(prevContacts, index));
  };

  const genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ];

  const handleDonePress = () => {
    if (!firstName || !age || !gender || !height || !weight || emergencyContacts.length === 0) {
      setErrorMessage('Please fill in all the required fields.');
      return;
    }

    setErrorMessage('');
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.headerText}>Welcome to the HeartMate App!</Text>

        <TextInputWithLabel
          label="First Name"
          value={firstName}
          placeholder="Enter your first name"
          onChangeText={setFirstName}
        />

        <TextInputWithLabel
          label="Age"
          value={age}
          placeholder="Enter your age"
          keyboardType="numeric"
          onChangeText={setAge}
        />

      <View >
        <Text style={styles.label}>Gender</Text>
        </View>
        <View style={pickerStyles.container}>
        <RNPickerSelect
          style={pickerStyles}
          placeholder={{label : 'Select Your Gender' , value: null }}
          items={genderOptions}
          value={gender}
          onValueChange={(value) => setGender(value)}
        />
      </View>

        <TextInputWithLabel
          label="Weight"
          value={weight}
          placeholder="Enter your weight (kg)"
          keyboardType="numeric"
          onChangeText={setWeight}
        />

        <TextInputWithLabel
          label="Height"
          value={height}
          placeholder="Enter your height (cm)"
          keyboardType="numeric"
          onChangeText={setHeight}
        />

        <EmergencyContactForm
          onAddEmergencyContact={handleAddEmergencyContact}
        />

        <Text style={styles.sectionHeading}>Emergency Contacts</Text>

        <ContactList
          emergencyContacts={emergencyContacts}
          onDeleteContact={handleDeleteContact}
        />

        <Text style={styles.errorMessage}>{errorMessage}</Text>

        <TouchableOpacity style={styles.button} onPress={handleDonePress}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  headerText: {
    fontFamily: 'PTSerif_700Bold',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontFamily: 'PTSerif_400Regular',
    color: 'white',
    fontSize: 16,
  },
  sectionHeading: {
    fontFamily: 'PTSerif_700Bold',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  errorMessage: {
    fontFamily: 'PTSerif_400Regular',
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  label: {
    fontFamily: 'PTSerif_400Regular',
    fontSize: 14,
    marginBottom: 5,
  },
});

export default Setup;
