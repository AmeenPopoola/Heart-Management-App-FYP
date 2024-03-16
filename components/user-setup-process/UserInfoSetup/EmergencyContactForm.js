import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const EmergencyContactForm = ({ onAddEmergencyContact }) => {
  const [newContactName, setNewContactName] = useState('');
  const [newContactNumber, setNewContactNumber] = useState('');

  const handleAddContact = () => {
    if (newContactName && newContactNumber) {
      console.log('Adding new contact:', { name: newContactName, number: newContactNumber });
      onAddEmergencyContact({ name: newContactName, number: newContactNumber });
      setNewContactName('');
      setNewContactNumber('');
      console.log('Updated emergencyContacts:', emergencyContacts);
    }
  };

  return (
    <View style={styles.container}>
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

      <TouchableOpacity style={styles.button} onPress={handleAddContact}>
        <Text style={styles.buttonText}>Add Contact</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  headerText: {
    fontFamily: 'PTSerif_700Bold',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
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
    marginTop: 10,
  },
  buttonText: {
    fontFamily: 'PTSerif_400Regular',
    color: 'white',
    fontSize: 16,
  },
});

export default EmergencyContactForm;