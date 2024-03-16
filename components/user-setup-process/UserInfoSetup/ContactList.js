import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const ContactList = ({ emergencyContacts, onDeleteContact }) => {

  console.log('Received emergencyContacts:', emergencyContacts);


  const renderItem = ({ item, index }) => (
    <View style={styles.contactItem}>
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactNumber}>{item.number}</Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDeleteContact(index)}
      >
        <Text style={styles.deleteButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={emergencyContacts}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      style={styles.contactsList}
      horizontal
    />
  );
};

const styles = StyleSheet.create({
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

export default ContactList;