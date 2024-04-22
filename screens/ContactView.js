import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState,useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import { PTSerif_400Regular,PTSerif_700Bold,useFonts } from '@expo-google-fonts/pt-serif';
import { lightThemeStyles,darkThemeStyles } from '../styles/Emergency/contactStyles';

const ContactView = ({ contact }) => {
    const navigation = useNavigation();
    const [emergencyContacts, setEmergencyContacts] = useState([]);
    const [isDarkMode, setIsDarkMode] = useState(false);


    useEffect(() => {
        const loadContacts = async () => {
          try {
            const emergencyContacts = await AsyncStorage.getItem('emergencyContacts');
            const storedTheme = await AsyncStorage.getItem('themeState');

              if (emergencyContacts) setEmergencyContacts(JSON.parse(emergencyContacts)); 
              if (storedTheme !== null) {
                const parsedTheme = JSON.parse(storedTheme);
                setIsDarkMode(parsedTheme);
              };
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
        navigation.navigate('Setup'); 
      };

      let [fontsLoaded] = useFonts({
        PTSerif_400Regular,
        PTSerif_700Bold,
      });
      
      if (!fontsLoaded) {
        return null;
      }

      const styles = isDarkMode ? darkThemeStyles : lightThemeStyles;

    
      return (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="back" size={24} color={styles.backButtonText.color} />
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
    
    export default ContactView;