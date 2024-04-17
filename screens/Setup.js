import React,{useState,useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useFonts, PTSerif_400Regular, PTSerif_700Bold } from '@expo-google-fonts/pt-serif';
import useSetupViewModel from '../ViewModels/useSetupViewModel';
import TextInputWithLabel from '../components/user-setup-process/UserInfoSetup/TextInputWithLabel';
import { lightThemeStyles,darkThemeStyles } from '../styles/Setup/setupStyles';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const Setup = () => {
  const {
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
  } = useSetupViewModel();


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

  let [fontsLoaded] = useFonts({ PTSerif_400Regular, PTSerif_700Bold });

  if (!fontsLoaded) {
    return null;
  }

  const genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ];

  const renderItem = ({ item, index }) => (
    <View style={styles.contactItem}>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactNumber}>{item.number}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteContact(index)}
      >
        <Text style={styles.deleteButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );

  const styles = isDarkMode ? darkThemeStyles : lightThemeStyles;

  return (
    <View style={styles.container}>
      <ScrollView>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="back" size={24} color="black" />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
        <Text style={styles.headerText}>Welcome to the HeartMate App!</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your first name"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your age"
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Gender</Text>
          <RNPickerSelect
            style={styles.input}
            placeholder={{ label: 'Select Your Gender', value: null }}
            items={genderOptions}
            value={gender}
            onValueChange={(value) => setGender(value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Weight</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your weight(kg)"
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Height</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your height(cm)"
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
          />
        </View>

        <Text style={styles.headerText}>Emergency Contact Information</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter contact name"
            value={newContactName}
            onChangeText={setNewContactName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter contact number"
            keyboardType="numeric"
            value={newContactNumber}
            onChangeText={setNewContactNumber}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={addEmergencyContact}>
          <Text style={styles.buttonText}>Add Contact</Text>
        </TouchableOpacity>

        <Text style={styles.sectionHeading}>Emergency Contacts</Text>

        <FlatList
          data={emergencyContacts}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.contactsList}
          horizontal
        />

        <Text style={styles.errorMessage}>{errorMessage}</Text>

        <TouchableOpacity style={styles.button} onPress={handleDonePress}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};



export default Setup;

