import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import { PTSerif_400Regular,PTSerif_700Bold,useFonts } from '@expo-google-fonts/pt-serif';

const ContactView = ({ contact }) => {
    const navigation = useNavigation();
    const [emergencyContacts, setEmergencyContacts] = useState([]);


    useEffect(() => {
        const loadContacts = async () => {
          try {
            const emergencyContacts = await AsyncStorage.getItem('emergencyContacts');

              if (emergencyContacts) setEmergencyContacts(JSON.parse(emergencyContacts)); 
          } catch (error) {
            console.error('Error loading user data:', error);
          }
        };
        loadContacts();
      },[]);

      const handleCallContact = (number) => {
        Linking.openURL(`tel:${number}`);
      };

      const handleAddContact = () => {
        navigation.navigate('Setup'); // Navigate to the setup page
      };

      let [fontsLoaded] = useFonts({
        PTSerif_400Regular,
        PTSerif_700Bold,
      });
      
      if (!fontsLoaded) {
        return null;
      }

    
      return (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="back" size={24} color="black" />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.header}>Emergency Contacts</Text>
          </View>
          {emergencyContacts.map((contact, index) => (
            <TouchableOpacity key={index} style={styles.contactContainer} onPress={() => handleCallContact(contact.number)}>
              <View style={styles.contactInfo}>
                <Text style={styles.name}>{contact.name}</Text>
                <Text style={styles.number}>{contact.number}</Text>
              </View>
              <View style={styles.phoneIcon}>
                <Icon name="phone" size={24} color="white" />
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.addContactContainer} onPress={handleAddContact}>
          <View style={styles.plusIcon}>
            <Icon name="pluscircleo" size={22} color="white" />
            </View>
            <Text style={styles.addContactText}>Add Contact</Text>
          </TouchableOpacity>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        marginTop: 20,
      },
      headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
      },
      backButton: {
        padding: 10,
      },
      contactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#f5f5f5', // Grey background color
      },
      contactInfo: {
        flex: 1,
      },
      name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      number: {
        fontSize: 16,
      },
      phoneIcon: {
        backgroundColor: 'red',
        borderRadius: 20,
        padding: 10,
      },
      backButtonText: {
        fontFamily: 'PTSerif_400Regular',
        fontSize: 16,
        marginLeft: 5,
      },
      addContactContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
      },
      addContactText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
      },
      plusIcon: {
        backgroundColor: 'red',
        borderRadius: 20,
        padding: 10,
      },
    });
    
    export default ContactView;