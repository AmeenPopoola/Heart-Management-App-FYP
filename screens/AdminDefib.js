import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet,TouchableOpacity } from 'react-native';
import loadDefibLocations from '../functions/db-data-loading/DefibData';
import { addDoc, collection,deleteDoc,doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const AdminDefib = () => {
  const [defibLocations, setDefibLocations] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const defibData = await loadDefibLocations();
      setDefibLocations(defibData);
    };

    fetchData();
  }, []);

  const handleAddLocation = async () => {
    try {
      await addDoc(collection(db, 'defiblocations'), {
        title: title,
        location: {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        },
        description: description,
      });
      // Reset form fields after successful addition
      setTitle('');
      setLatitude('');
      setLongitude('');
      setDescription('');
      // Optionally, you can update the list of locations after adding
      const updatedDefibLocations = await loadDefibLocations();
      setDefibLocations(updatedDefibLocations);
    } catch (error) {
      console.error('Error adding defibrillator location:', error);
      // Handle error (e.g., display error message)
    }
  };

  
  const handleDeleteLocation = async (id) => {
    try {
      await deleteDoc(doc(db, 'defiblocations', id));
      // Update the list of locations after deletion
      const updatedDefibLocations = defibLocations.filter((location) => location.id !== id);
      setDefibLocations(updatedDefibLocations);
    } catch (error) {
      console.error('Error deleting defibrillator location:', error);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Defibrillator Locations</Text>
      <FlatList
        data={defibLocations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.locationContainer}>
            <Text style={styles.locationTitle}>{item.title}</Text>
            <Text style={styles.locationText}>{item.location.latitude}, {item.location.longitude}</Text>
            <Text style={styles.locationText}>{item.description}</Text>
            <TouchableOpacity onPress={() => handleDeleteLocation(item.id)}>
              <Text style={styles.deleteButton}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      

      {/* Add location form */}
      {showAddForm && (
        <View style={styles.addLocationForm}>
          <Text style={styles.formTitle}>Add Defibrillator Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Eircode"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Latitude"
            value={latitude}
            onChangeText={setLatitude}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Longitude"
            value={longitude}
            onChangeText={setLongitude}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
          />
          <Button title="Add Location" onPress={handleAddLocation} />
        </View>
      )}

      {/* Button to toggle add location form */}
      <Button
        title={showAddForm ? 'Hide Add Form' : 'Add New Location'}
        onPress={() => setShowAddForm(!showAddForm)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  locationContainer: {
    marginBottom: 10,
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationText: {
    fontSize: 16,
  },
  deleteButton: {
    fontSize: 18,
    color: 'red',
    marginLeft: 10,
  },
  addLocationForm: {
    marginTop: 20,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  descriptionInput: {
    height: 100,
  },
});

export default AdminDefib;
