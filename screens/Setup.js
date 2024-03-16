import React from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useFonts, PTSerif_400Regular, PTSerif_700Bold } from '@expo-google-fonts/pt-serif';
import useSetupViewModel from '../ViewModels/useSetupViewModel';
import TextInputWithLabel from '../components/user-setup-process/UserInfoSetup/TextInputWithLabel';

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

  return (
    <View style={styles.container}>
      <ScrollView>
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
  inputContainer: {
    marginBottom: 12,
  },
  label: {
    fontFamily: 'PTSerif_400Regular',
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
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
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  contactInfo: {
    flexDirection: 'column',
    flex: 1,
  },
  contactName: {
    fontFamily: 'PTSerif_700Bold',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contactNumber: {
    fontSize: 16,
  },
  contactsList: {
    flex: 1,
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 20,
    padding: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    fontFamily: 'PTSerif_400Regular',
    color: 'white',
    fontSize: 12,
  },
  errorMessage: {
    fontFamily: 'PTSerif_400Regular',
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
});

export default Setup;

