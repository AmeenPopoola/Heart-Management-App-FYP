import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, PTSerif_400Regular, PTSerif_700Bold } from '@expo-google-fonts/pt-serif';

const Setup = () => {
  const [firstName, setFirstName] = useState('');
  const [age, setAge] = useState('');
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [newContactName, setNewContactName] = useState('');
  const [newContactNumber, setNewContactNumber] = useState('');

  const navigation = useNavigation();

  // Load stored data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedFirstName = await AsyncStorage.getItem('firstName');
        const storedAge = await AsyncStorage.getItem('age');
        const storedEmergencyContacts = await AsyncStorage.getItem('emergencyContacts');

        if (storedFirstName) setFirstName(storedFirstName);
        if (storedAge) setAge(storedAge);
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
        await AsyncStorage.setItem('emergencyContacts', JSON.stringify(emergencyContacts));
      } catch (error) {
        console.error('Error saving data to AsyncStorage:', error);
      }
    };

    saveData();
  }, [firstName, age, emergencyContacts]);

  let [fontsLoaded] = useFonts({
    PTSerif_400Regular,PTSerif_700Bold
  });
  
  if (!fontsLoaded) {
    return null;
  }

  const addEmergencyContact = () => {
    if (newContactName && newContactNumber) {
      setEmergencyContacts([...emergencyContacts, { name: newContactName, number: newContactNumber }]);
      setNewContactName('');
      setNewContactNumber('');
    }
  };

  const renderItem = ({ item,index }) => (
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

  const handleDonePress = () => {
    navigation.navigate('Home');
  };

  const handleDeleteContact = (index) => {
    const updatedContacts = [...emergencyContacts];
    updatedContacts.splice(index, 1);
    setEmergencyContacts(updatedContacts);
  };

  return (
    <View style={styles.container}>
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

      <Text style={styles.headerText}>Emergency Contact</Text>

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
      />

      <TouchableOpacity style={styles.button} onPress={handleDonePress}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
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
});

export default Setup;
